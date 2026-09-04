import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { FINAL_QUIZ_ID, PASSING_SCORE, RETAKE_SCORE_CAP } from "../data/modules";
import { getFirebaseAuth, isFirebaseConfigured } from "../lib/firebase";
import { COURSE_PREVIEW_MODE } from "../lib/preview";
import {
  emptyCourseProgress,
  getActiveTimerMs,
  loadCourseProgress,
  normalizeCourseProgress,
  saveCourseProgress,
  type CourseProgressDoc,
  type ModuleScoreRecord,
} from "../lib/progress";
import { buildVolunteerSheetsPayload, queueSheetsSync, type SheetsSyncEvent } from "../lib/sheets-sync";
import { writeLocalVolunteerProgress } from "../lib/volunteer-cache";
import { registerNewVolunteer as registerNewVolunteerRecord, resumeVolunteerById } from "../lib/volunteer-records";
import {
  clearVolunteerIdentity,
  readAccessGranted,
  readAccessCodeUsed,
  readVolunteerIdentity,
  verifyVolunteerAccessCode,
  writeAccessGranted,
  writeAccessCodeUsed,
  writeVolunteerIdentity,
  type VolunteerIdentity,
} from "../lib/volunteer-session";
import { markVolunteerIdCompleted } from "../lib/volunteer-ids";
import { applyProgressDerivedFields } from "../lib/volunteer-stats";

type QuizAttemptResult = {
  passed: boolean;
  recordedScore: number;
  rawScore: number;
  capped: boolean;
};

type IdentifyResult = { ok: true } | { ok: false; error: string };

type RegisterVolunteerResult =
  | { ok: true; volunteerId: string; firstName: string; lastName: string }
  | { ok: false; error: string };

type CourseContextValue = {
  configured: boolean;
  loading: boolean;
  user: User | null;
  volunteer: VolunteerIdentity | null;
  accessGranted: boolean;
  progress: CourseProgressDoc | null;
  activeTimerMs: number;
  quizSessionActive: boolean;
  sheetsWarning: string | null;
  setQuizSessionActive: (active: boolean) => void;
  grantAccess: (code: string) => Promise<boolean>;
  registerNewVolunteer: (firstName: string, lastName: string) => Promise<RegisterVolunteerResult>;
  resumeVolunteer: (volunteerId: string) => Promise<IdentifyResult>;
  switchVolunteer: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetTimer: () => Promise<void>;
  resetCourseProgress: () => Promise<void>;
  submitCourse: () => Promise<void>;
  recordQuizAttempt: (moduleId: string, score: number) => Promise<QuizAttemptResult>;
  recordLessonComplete: (moduleId: string) => Promise<void>;
};

const CourseContext = createContext<CourseContextValue | null>(null);

export function CourseProvider({ children }: { children: ReactNode }) {
  const configured = isFirebaseConfigured();
  const [loading, setLoading] = useState(Boolean(readVolunteerIdentity()));
  const [user, setUser] = useState<User | null>(null);
  const [accessGranted, setAccessGranted] = useState(readAccessGranted);
  const [volunteer, setVolunteer] = useState<VolunteerIdentity | null>(readVolunteerIdentity);
  const [progress, setProgress] = useState<CourseProgressDoc | null>(null);
  const [quizSessionActive, setQuizSessionActive] = useState(false);
  const [sheetsWarning, setSheetsWarning] = useState<string | null>(null);
  const [tick, setTick] = useState(Date.now());
  const progressRef = useRef<CourseProgressDoc | null>(progress);
  const userRef = useRef<User | null>(null);
  const volunteerRef = useRef<VolunteerIdentity | null>(volunteer);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    volunteerRef.current = volunteer;
  }, [volunteer]);

  const syncProgress = useCallback((event: SheetsSyncEvent, next: CourseProgressDoc, timeMs: number) => {
    if (!next.volunteerId) return;
    queueSheetsSync(buildVolunteerSheetsPayload(event, next, timeMs, {
      uid: userRef.current?.uid ?? next.volunteerId,
      email: userRef.current?.email ?? next.email,
      name: userRef.current?.displayName ?? `${next.firstName} ${next.lastName}`.trim(),
    }), (message) => setSheetsWarning(message));
  }, []);

  const persistProgress = useCallback(
    async (next: CourseProgressDoc, event: SheetsSyncEvent = "progress") => {
      const identity = volunteerRef.current;
      const withIdentity = normalizeCourseProgress(next.email, {
        ...next,
        volunteerId: next.volunteerId || identity?.volunteerId || "",
        firstName: next.firstName || identity?.firstName || "",
        lastName: next.lastName || identity?.lastName || "",
      });
      const written = applyProgressDerivedFields(withIdentity);
      setProgress(written);
      progressRef.current = written;
      if (written.volunteerId) {
        writeLocalVolunteerProgress(written);
        try {
          await saveCourseProgress(written.volunteerId, written);
        } catch (error) {
          console.warn("Firebase progress save failed", error);
        }
        syncProgress(event, written, getActiveTimerMs(written));
        return;
      }

      const currentUser = userRef.current;
      if (!currentUser) return;
      await saveCourseProgress(currentUser.uid, written);
      syncProgress(event, written, getActiveTimerMs(written));
    },
    [syncProgress],
  );

  useEffect(() => {
    const identity = volunteer;
    if (!identity) {
      if (!COURSE_PREVIEW_MODE && !user) {
        setProgress(null);
      }
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    async function hydrateVolunteer() {
      try {
        const result = await resumeVolunteerById(identity.volunteerId);
        if (cancelled) return;
        if (!result.ok) {
          clearVolunteerIdentity();
          setVolunteer(null);
          setProgress(null);
          return;
        }
        const hydrated: CourseProgressDoc = {
          ...result.progress,
          timerSessionStartedAt: Date.now(),
        };
        setVolunteer(result.identity);
        writeVolunteerIdentity(result.identity);
        await persistProgress(hydrated, "login");
      } catch (error) {
        console.warn("Unable to restore volunteer progress", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void hydrateVolunteer();
    return () => {
      cancelled = true;
    };
  }, [persistProgress, volunteer?.volunteerId]);

  useEffect(() => {
    if (COURSE_PREVIEW_MODE) return;

    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading((current) => (volunteerRef.current ? current : false));
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (volunteerRef.current) return;
      if (!nextUser) {
        setProgress(null);
        setLoading(false);
        return;
      }

      const loaded = await loadCourseProgress(nextUser.uid, nextUser.email ?? "");
      const withSession: CourseProgressDoc = {
        ...loaded,
        email: nextUser.email ?? loaded.email,
        timerSessionStartedAt: Date.now(),
      };
      setProgress(withSession);
      await saveCourseProgress(nextUser.uid, withSession);
      syncProgress("login", withSession, getActiveTimerMs(withSession));
      setLoading(false);
    });

    return unsubscribe;
  }, [syncProgress]);

  useEffect(() => {
    if (!volunteer || !progress?.timerSessionStartedAt) return;
    const interval = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [volunteer, progress?.timerSessionStartedAt]);

  useEffect(() => {
    if (!volunteer || !progress) return;
    const interval = window.setInterval(() => {
      const current = progressRef.current;
      if (!current) return;
      syncProgress("timer", current, getActiveTimerMs(current, Date.now()));
    }, 60000);
    return () => window.clearInterval(interval);
  }, [volunteer, progress, syncProgress]);

  useEffect(() => {
    if (!volunteer) return;

    function handleUnload() {
      const current = progressRef.current;
      if (!current?.timerSessionStartedAt) return;
      const next: CourseProgressDoc = applyProgressDerivedFields({
        ...current,
        timerAccumulatedMs: getActiveTimerMs(current),
        timerSessionStartedAt: null,
      });
      writeLocalVolunteerProgress(next);
      void saveCourseProgress(next.volunteerId || volunteer.volunteerId, next);
      syncProgress("signout", next, getActiveTimerMs(next));
    }

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [volunteer, syncProgress]);

  const activeTimerMs = useMemo(() => {
    if (!progress) return 0;
    return getActiveTimerMs(progress, tick);
  }, [progress, tick]);

  const grantAccess = useCallback(async (code: string) => {
    const ok = await verifyVolunteerAccessCode(code);
    if (!ok) return false;
    writeAccessGranted();
    writeAccessCodeUsed(code);
    setAccessGranted(true);
    return true;
  }, []);

  const registerNewVolunteer = useCallback(async (
    firstName: string,
    lastName: string,
  ): Promise<RegisterVolunteerResult> => {
    const result = await registerNewVolunteerRecord(firstName, lastName);
    if (!result.ok) return result;
    await persistProgress(result.progress, "login");
    return {
      ok: true,
      volunteerId: result.identity.volunteerId,
      firstName: result.identity.firstName,
      lastName: result.identity.lastName,
    };
  }, [persistProgress]);

  const resumeVolunteer = useCallback(async (volunteerId: string): Promise<IdentifyResult> => {
    const result = await resumeVolunteerById(volunteerId);
    if (!result.ok) return result;
    writeVolunteerIdentity(result.identity);
    setVolunteer(result.identity);
    await persistProgress(result.progress, "login");
    return { ok: true };
  }, [persistProgress]);

  const switchVolunteer = useCallback(() => {
    clearVolunteerIdentity();
    setVolunteer(null);
    setProgress(null);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error("Firebase is not configured.");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(auth, provider);
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error("Firebase is not configured.");
    await signInWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error("Firebase is not configured.");
    await createUserWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const signOut = useCallback(async () => {
    const current = progressRef.current;
    if (current && (volunteer || user)) {
      const next: CourseProgressDoc = applyProgressDerivedFields({
        ...current,
        timerAccumulatedMs: getActiveTimerMs(current),
        timerSessionStartedAt: null,
      });
      if (next.volunteerId) {
        writeLocalVolunteerProgress(next);
        await saveCourseProgress(next.volunteerId, next);
      } else if (user) {
        await saveCourseProgress(user.uid, next);
      }
      syncProgress("signout", next, getActiveTimerMs(next));
    }
    switchVolunteer();
    const auth = getFirebaseAuth();
    if (!auth) return;
    await firebaseSignOut(auth);
  }, [switchVolunteer, syncProgress, user, volunteer]);

  const resetTimer = useCallback(async () => {
    if (!progress) return;
    await persistProgress(
      {
        ...progress,
        timerAccumulatedMs: 0,
        timerSessionStartedAt: Date.now(),
      },
      "timer",
    );
  }, [persistProgress, progress]);

  const resetCourseProgress = useCallback(async () => {
    const identity = volunteerRef.current;
    const email =
      progressRef.current?.email ||
      userRef.current?.email ||
      "";
    await persistProgress(
      {
        ...emptyCourseProgress(email, identity ?? undefined),
        accessCodeUsed: progressRef.current?.accessCodeUsed || readAccessCodeUsed(),
        startedAt: new Date().toISOString(),
        timerSessionStartedAt: Date.now(),
      },
      "restart",
    );
  }, [persistProgress]);

  const submitCourse = useCallback(async () => {
    const current = progressRef.current;
    if (!current) return;
    const finalRecord = current.moduleScores[FINAL_QUIZ_ID];
    if (!finalRecord?.passed || current.courseSubmitted) return;
    const now = new Date().toISOString();
    await persistProgress(
      {
        ...current,
        courseSubmitted: true,
        completedAt: now,
        finalGrade: finalRecord.score,
        overallProgressPct: 100,
      },
      "complete",
    );
    if (current.volunteerId) {
      await markVolunteerIdCompleted(current.volunteerId);
    }
  }, [persistProgress]);

  const recordQuizAttempt = useCallback(
    async (moduleId: string, score: number) => {
      const current = progressRef.current;
      if (!current) {
        return { passed: false, recordedScore: 0, rawScore: score, capped: false };
      }

      const previous: ModuleScoreRecord = current.moduleScores[moduleId] ?? {
        score: 0,
        passed: false,
        attempts: 0,
        completedAt: null,
      };

      const isRetake = previous.attempts > 0;
      const recordedScore = isRetake ? Math.min(score, RETAKE_SCORE_CAP) : score;
      const passed = recordedScore >= PASSING_SCORE;

      const moduleScores = {
        ...current.moduleScores,
        [moduleId]: {
          score: Math.max(previous.score, recordedScore),
          passed: previous.passed || passed,
          attempts: previous.attempts + 1,
          completedAt: passed || previous.passed ? new Date().toISOString() : previous.completedAt,
        },
      };

      const completedModuleIds =
        passed && !current.completedModuleIds.includes(moduleId)
          ? [...current.completedModuleIds, moduleId]
          : [...current.completedModuleIds];

      const next: CourseProgressDoc = {
        ...current,
        moduleScores,
        completedModuleIds,
      };
      await persistProgress(next, "quiz");
      return {
        passed: moduleScores[moduleId].passed,
        recordedScore,
        rawScore: score,
        capped: isRetake && score > RETAKE_SCORE_CAP,
      };
    },
    [persistProgress],
  );

  const recordLessonComplete = useCallback(
    async (moduleId: string) => {
      const current = progressRef.current;
      if (!current || current.completedLessonIds.includes(moduleId)) return;
      await persistProgress(
        {
          ...current,
          completedLessonIds: [...current.completedLessonIds, moduleId],
        },
        "lesson",
      );
    },
    [persistProgress],
  );

  const value = useMemo(
    () => ({
      configured,
      loading,
      user,
      volunteer,
      accessGranted,
      progress,
      activeTimerMs,
      quizSessionActive,
      sheetsWarning,
      setQuizSessionActive,
      grantAccess,
      registerNewVolunteer,
      resumeVolunteer,
      switchVolunteer,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      resetTimer,
      resetCourseProgress,
      submitCourse,
      recordQuizAttempt,
      recordLessonComplete,
    }),
    [
      configured,
      loading,
      user,
      volunteer,
      accessGranted,
      progress,
      activeTimerMs,
      quizSessionActive,
      sheetsWarning,
      grantAccess,
      registerNewVolunteer,
      resumeVolunteer,
      switchVolunteer,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      resetTimer,
      resetCourseProgress,
      submitCourse,
      recordQuizAttempt,
      recordLessonComplete,
    ],
  );

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within CourseProvider");
  }
  return context;
}
