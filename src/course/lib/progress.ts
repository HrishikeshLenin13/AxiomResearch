import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";
import { volunteerDocId } from "./volunteer-session";

export type ModuleScoreRecord = {
  score: number;
  passed: boolean;
  attempts: number;
  completedAt: string | null;
};

export type VolunteerIdentityFields = {
  volunteerId: string;
  firstName: string;
  lastName: string;
};

export type CourseProgressDoc = {
  email: string;
  volunteerId: string;
  firstName: string;
  lastName: string;
  accessCodeUsed: string;
  startedAt: string;
  lastActiveAt: string;
  completedModuleIds: string[];
  completedLessonIds: string[];
  moduleScores: Record<string, ModuleScoreRecord>;
  timerAccumulatedMs: number;
  timerSessionStartedAt: number | null;
  updatedAt: string;
  courseSubmitted: boolean;
  completedAt: string | null;
  finalGrade: number | null;
  overallProgressPct: number;
};

export function emptyCourseProgress(
  email = "",
  identity?: VolunteerIdentityFields,
): CourseProgressDoc {
  const now = new Date().toISOString();
  return {
    email,
    volunteerId: identity?.volunteerId ?? "",
    firstName: identity?.firstName ?? "",
    lastName: identity?.lastName ?? "",
    accessCodeUsed: "",
    startedAt: now,
    lastActiveAt: now,
    completedModuleIds: [],
    completedLessonIds: [],
    moduleScores: {},
    timerAccumulatedMs: 0,
    timerSessionStartedAt: null,
    updatedAt: now,
    courseSubmitted: false,
    completedAt: null,
    finalGrade: null,
    overallProgressPct: 0,
  };
}

function asIso(value: unknown, fallback: string) {
  if (typeof value === "string" && value) return value;
  if (value && typeof value === "object" && "toDate" in value) {
    try {
      return (value as Timestamp).toDate().toISOString();
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export function normalizeCourseProgress(
  email: string,
  data: Partial<CourseProgressDoc> | null | undefined,
): CourseProgressDoc {
  const base = emptyCourseProgress(email);
  if (!data) return base;
  const updatedAt = asIso(data.updatedAt, base.updatedAt);
  return {
    email: data.email || email,
    volunteerId: typeof data.volunteerId === "string" ? data.volunteerId : "",
    firstName: typeof data.firstName === "string" ? data.firstName : "",
    lastName: typeof data.lastName === "string" ? data.lastName : "",
    accessCodeUsed: typeof data.accessCodeUsed === "string" ? data.accessCodeUsed : "",
    startedAt: asIso(data.startedAt, updatedAt),
    lastActiveAt: asIso(data.lastActiveAt, updatedAt),
    completedModuleIds: Array.isArray(data.completedModuleIds) ? [...data.completedModuleIds] : [],
    completedLessonIds: Array.isArray(data.completedLessonIds) ? [...data.completedLessonIds] : [],
    moduleScores:
      data.moduleScores && typeof data.moduleScores === "object" && !Array.isArray(data.moduleScores)
        ? { ...data.moduleScores }
        : {},
    timerAccumulatedMs: typeof data.timerAccumulatedMs === "number" ? data.timerAccumulatedMs : 0,
    timerSessionStartedAt:
      typeof data.timerSessionStartedAt === "number" ? data.timerSessionStartedAt : null,
    updatedAt,
    courseSubmitted: Boolean(data.courseSubmitted),
    completedAt: data.completedAt ? asIso(data.completedAt, "") || null : null,
    finalGrade: typeof data.finalGrade === "number" ? data.finalGrade : null,
    overallProgressPct: typeof data.overallProgressPct === "number" ? data.overallProgressPct : 0,
  };
}

export const PROGRESS_COLLECTION = "course_progress";

function defaultProgress(email: string): CourseProgressDoc {
  return emptyCourseProgress(email);
}

function progressDocRef(docId: string) {
  const db = getFirebaseDb();
  if (!db) return null;
  return doc(db, PROGRESS_COLLECTION, volunteerDocId(docId));
}

export async function getCourseProgress(docId: string): Promise<CourseProgressDoc | null> {
  const ref = progressDocRef(docId);
  if (!ref) return null;

  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;

  const data = snapshot.data() as Partial<CourseProgressDoc>;
  const updatedAt = asIso(data.updatedAt, new Date().toISOString());
  return normalizeCourseProgress(data.email ?? "", { ...data, updatedAt });
}

export async function loadCourseProgress(uid: string, email: string) {
  const existing = await getCourseProgress(uid);
  if (existing) return existing;

  const ref = progressDocRef(uid);
  const initial = defaultProgress(email);
  if (ref) {
    await setDoc(ref, { ...initial, updatedAt: serverTimestamp() });
  }
  return initial;
}

export async function saveCourseProgress(docId: string, progress: CourseProgressDoc) {
  const ref = progressDocRef(docId);
  if (!ref) return;
  await setDoc(ref, {
    ...progress,
    updatedAt: serverTimestamp(),
  });
}

export async function listRemoteCourseProgress(): Promise<CourseProgressDoc[]> {
  const db = getFirebaseDb();
  if (!db) return [];
  const snapshot = await getDocs(collection(db, PROGRESS_COLLECTION));
  return snapshot.docs
    .map((item) => {
      const data = item.data() as Partial<CourseProgressDoc>;
      const updatedAt = asIso(data.updatedAt, new Date().toISOString());
      return normalizeCourseProgress(data.email ?? "", { ...data, updatedAt });
    })
    .filter((doc) => Boolean(doc.volunteerId));
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
