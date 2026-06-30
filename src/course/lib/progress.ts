import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";

export type ModuleScoreRecord = {
  score: number;
  passed: boolean;
  attempts: number;
  completedAt: string | null;
};

export type CourseProgressDoc = {
  email: string;
  completedModuleIds: string[];
  moduleScores: Record<string, ModuleScoreRecord>;
  timerAccumulatedMs: number;
  timerSessionStartedAt: number | null;
  updatedAt: string;
};

export const PROGRESS_COLLECTION = "course_progress";

function defaultProgress(email: string): CourseProgressDoc {
  return {
    email,
    completedModuleIds: [],
    moduleScores: {},
    timerAccumulatedMs: 0,
    timerSessionStartedAt: null,
    updatedAt: new Date().toISOString(),
  };
}

function progressDocRef(uid: string) {
  const db = getFirebaseDb();
  if (!db) return null;
  return doc(db, PROGRESS_COLLECTION, uid);
}

export async function loadCourseProgress(uid: string, email: string) {
  const ref = progressDocRef(uid);
  if (!ref) return defaultProgress(email);

  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    const initial = defaultProgress(email);
    await setDoc(ref, { ...initial, updatedAt: serverTimestamp() });
    return initial;
  }

  const data = snapshot.data() as Partial<CourseProgressDoc>;
  return {
    ...defaultProgress(email),
    ...data,
    email: data.email ?? email,
    completedModuleIds: data.completedModuleIds ?? [],
    moduleScores: data.moduleScores ?? {},
    timerAccumulatedMs: data.timerAccumulatedMs ?? 0,
    timerSessionStartedAt: data.timerSessionStartedAt ?? null,
    updatedAt:
      typeof data.updatedAt === "string"
        ? data.updatedAt
        : (data.updatedAt as Timestamp | undefined)?.toDate?.().toISOString() ??
          new Date().toISOString(),
  };
}

export async function saveCourseProgress(uid: string, progress: CourseProgressDoc) {
  const ref = progressDocRef(uid);
  if (!ref) return;
  await setDoc(
    ref,
    {
      ...progress,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export function getActiveTimerMs(progress: CourseProgressDoc, now = Date.now()) {
  const sessionMs = progress.timerSessionStartedAt
    ? now - progress.timerSessionStartedAt
    : 0;
  return progress.timerAccumulatedMs + sessionMs;
}

export function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
}
