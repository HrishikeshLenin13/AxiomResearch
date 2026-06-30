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
import { COURSE_MODULES, PASSING_SCORE } from "../data/modules";
import { getFirebaseAuth, isFirebaseConfigured } from "../lib/firebase";
import {
  getActiveTimerMs,
  loadCourseProgress,
  saveCourseProgress,
  type CourseProgressDoc,
  type ModuleScoreRecord,
} from "../lib/progress";
import { buildSheetsPayload, queueSheetsSync } from "../lib/sheets-sync";

type CourseContextValue = {
  configured: boolean;
  loading: boolean;
  user: User | null;
  progress: CourseProgressDoc | null;
  activeTimerMs: number;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetTimer: () => Promise<void>;
  resetCourseProgress: () => Promise<void>;
  recordQuizAttempt: (moduleId: string, score: number) => Promise<{ passed: boolean }>;
};

const CourseContext = createContext<CourseContextValue | null>(null);

export function CourseProvider({ children }: { children: ReactNode }) {
  const configured = isFirebaseConfigured();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<CourseProgressDoc | null>(null);
  const [tick, setTick] = useState(Date.now());
  const progressRef = useRef<CourseProgressDoc | null>(null);
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
      if (!user) return;
      setProgress(next);
      progressRef.current = next;
      await saveCourseProgress(user.uid, next);
      syncProgress(event, next, getActiveTimerMs(next));
    },
    [syncProgress, user],
  );

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
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
    if (!progress || !user) return;
    const next: CourseProgressDoc = {
      email: progress.email,
      completedModuleIds: [],
      moduleScores: {},
      timerAccumulatedMs: 0,
      timerSessionStartedAt: Date.now(),
      updatedAt: new Date().toISOString(),
    };
    await persistProgress(next, "progress");
  }, [persistProgress, progress, user]);

  const recordQuizAttempt = useCallback(
    async (moduleId: string, score: number) => {
      if (!progress) return { passed: false };

      const passed = score >= PASSING_SCORE;
      const previous: ModuleScoreRecord = progress.moduleScores[moduleId] ?? {
        score: 0,
        passed: false,
        attempts: 0,
        completedAt: null,
      };

      const moduleScores = {
        ...progress.moduleScores,
        [moduleId]: {
          score: Math.max(previous.score, score),
          passed: previous.passed || passed,
          attempts: previous.attempts + 1,
          completedAt: passed ? new Date().toISOString() : previous.completedAt,
        },
      };

      const completedModuleIds =
        passed && !progress.completedModuleIds.includes(moduleId)
          ? [...progress.completedModuleIds, moduleId]
          : progress.completedModuleIds;

      const next: CourseProgressDoc = {
        ...progress,
        moduleScores,
        completedModuleIds,
        updatedAt: new Date().toISOString(),
      };
      await persistProgress(next, "quiz");
      return { passed };
    },
    [persistProgress, progress],
  );

  const value = useMemo(
    () => ({
      configured,
      loading,
      user,
      progress,
      activeTimerMs,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      resetTimer,
      resetCourseProgress,
      recordQuizAttempt,
    }),
    [
      configured,
      loading,
      user,
      progress,
      activeTimerMs,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      signOut,
      resetTimer,
      resetCourseProgress,
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
