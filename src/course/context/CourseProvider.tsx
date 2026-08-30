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
import { COURSE_MODULES, FINAL_QUIZ_ID, PASSING_SCORE, RETAKE_SCORE_CAP } from "../data/modules";
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
import { buildSheetsPayload, queueSheetsSync } from "../lib/sheets-sync";

const PREVIEW_STORAGE_KEY = "axiom-course-preview-progress";

function freshPreviewProgress(email = "preview@local"): CourseProgressDoc {
  return {
    ...emptyCourseProgress(email),
    timerSessionStartedAt: Date.now(),
  };
}

function loadPreviewProgress(): CourseProgressDoc {
  const empty = freshPreviewProgress();
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(PREVIEW_STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<CourseProgressDoc>;
    return {
      ...normalizeCourseProgress(parsed.email || empty.email, parsed),
      timerSessionStartedAt: Date.now(),
    };
  } catch {
    return empty;
  }
}

function writePreviewProgress(next: CourseProgressDoc) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PREVIEW_STORAGE_KEY);
  window.localStorage.setItem(PREVIEW_STORAGE_KEY, JSON.stringify(next));
}

type QuizAttemptResult = {
  passed: boolean;
  recordedScore: number;
  rawScore: number;
  capped: boolean;
};

type CourseContextValue = {
  configured: boolean;
  loading: boolean;
  user: User | null;
  progress: CourseProgressDoc | null;
  activeTimerMs: number;
  quizSessionActive: boolean;
  setQuizSessionActive: (active: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetTimer: () => Promise<void>;
  resetCourseProgress: () => Promise<void>;
  submitCourse: () => Promise<void>;
  recordQuizAttempt: (moduleId: string, score: number) => Promise<QuizAttemptResult>;
};

const CourseContext = createContext<CourseContextValue | null>(null);

export function CourseProvider({ children }: { children: ReactNode }) {
  const configured = isFirebaseConfigured();
  const [loading, setLoading] = useState(!COURSE_PREVIEW_MODE);
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<CourseProgressDoc | null>(
    COURSE_PREVIEW_MODE ? loadPreviewProgress() : null,
  );
  const [quizSessionActive, setQuizSessionActive] = useState(false);
  const [tick, setTick] = useState(Date.now());
  const progressRef = useRef<CourseProgressDoc | null>(progress);
  const userRef = useRef<User | null>(null);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const syncProgress = useCallback(
    (event: "login" | "progress" | "quiz" | "timer" | "signout", next: CourseProgressDoc, timeMs: number) => {
      const currentUser = userRef.current;
      if (!currentUser) return;
      queueSheetsSync(
        buildSheetsPayload(event, currentUser, next, COURSE_MODULES.length, timeMs),
      );
    },
    [],
  );

  const persistProgress = useCallback(
    async (next: CourseProgressDoc, event: "progress" | "quiz" | "timer" = "progress") => {
      const written = normalizeCourseProgress(next.email, next);
      setProgress(written);
      progressRef.current = written;
      if (COURSE_PREVIEW_MODE) {
        writePreviewProgress(written);
      }
      const currentUser = userRef.current;
      if (!currentUser) return;
      await saveCourseProgress(currentUser.uid, written);
      syncProgress(event, written, getActiveTimerMs(written));
    },
    [syncProgress],
  );

  useEffect(() => {
    if (COURSE_PREVIEW_MODE) {
      setLoading(false);
      return;
    }

    const auth = getFirebaseAuth();
    if (!auth) {
      setProgress({
        ...emptyCourseProgress(""),
        timerSessionStartedAt: Date.now(),
      });
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
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
    if (!user || !progress?.timerSessionStartedAt) return;
    const interval = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [user, progress?.timerSessionStartedAt]);

  useEffect(() => {
    if (!user || !progress) return;
    const interval = window.setInterval(() => {
      const current = progressRef.current;
      if (!current) return;
      syncProgress("timer", current, getActiveTimerMs(current, Date.now()));
    }, 60000);
    return () => window.clearInterval(interval);
  }, [user, progress, syncProgress]);

  useEffect(() => {
    if (!user) return;

    function handleUnload() {
      const current = progressRef.current;
      if (!current?.timerSessionStartedAt) return;
      const next: CourseProgressDoc = {
        ...current,
        timerAccumulatedMs: getActiveTimerMs(current),
        timerSessionStartedAt: null,
        updatedAt: new Date().toISOString(),
      };
      void saveCourseProgress(user.uid, next);
      syncProgress("signout", next, getActiveTimerMs(next));
    }

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [user, syncProgress]);

  const activeTimerMs = useMemo(() => {
    if (!progress) return 0;
    return getActiveTimerMs(progress, tick);
  }, [progress, tick]);

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

  const pauseTimerSession = useCallback(async () => {
    if (!progress || !progress.timerSessionStartedAt) return;
    const next: CourseProgressDoc = {
      ...progress,
      timerAccumulatedMs: getActiveTimerMs(progress),
      timerSessionStartedAt: null,
      updatedAt: new Date().toISOString(),
    };
    await persistProgress(next, "timer");
  }, [persistProgress, progress]);

  const signOut = useCallback(async () => {
    const current = progressRef.current;
    if (current && user) {
      const next: CourseProgressDoc = {
        ...current,
        timerAccumulatedMs: getActiveTimerMs(current),
        timerSessionStartedAt: null,
        updatedAt: new Date().toISOString(),
      };
      await saveCourseProgress(user.uid, next);
      syncProgress("signout", next, getActiveTimerMs(next));
    }
    const auth = getFirebaseAuth();
    if (!auth) return;
    await firebaseSignOut(auth);
  }, [syncProgress, user]);

  const resetTimer = useCallback(async () => {
    if (!progress) return;
    const next: CourseProgressDoc = {
      ...progress,
      timerAccumulatedMs: 0,
      timerSessionStartedAt: Date.now(),
      updatedAt: new Date().toISOString(),
    };
    await persistProgress(next, "timer");
  }, [persistProgress, progress]);

  const resetCourseProgress = useCallback(async () => {
    const email =
      progressRef.current?.email ||
      userRef.current?.email ||
      (COURSE_PREVIEW_MODE ? "preview@local" : "");
    await persistProgress(
      {
        ...emptyCourseProgress(email),
        timerSessionStartedAt: Date.now(),
      },
      "progress",
    );
  }, [persistProgress]);

  const submitCourse = useCallback(async () => {
    const current = progressRef.current;
    if (!current) return;
    const finalRecord = current.moduleScores[FINAL_QUIZ_ID];
    if (!finalRecord?.passed || current.courseSubmitted) return;
    await persistProgress(
      {
        ...current,
        courseSubmitted: true,
        updatedAt: new Date().toISOString(),
      },
      "progress",
    );
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
        updatedAt: new Date().toISOString(),
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

  const value = useMemo(
    () => ({
      configured,
      loading,
      user,
      progress,
      activeTimerMs,
      quizSessionActive,
      setQuizSessionActive,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      resetTimer,
      resetCourseProgress,
      submitCourse,
      recordQuizAttempt,
    }),
    [
      configured,
      loading,
      user,
      progress,
      activeTimerMs,
      quizSessionActive,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      resetTimer,
      resetCourseProgress,
      submitCourse,
      recordQuizAttempt,
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
