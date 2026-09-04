import { COURSE_MODULE_META } from "../data/module-meta";
import type { CourseProgressDoc } from "./progress";
import {
  computeAverageQuizGrade,
  computeFinalGrade,
  computeTotalQuizAttempts,
  currentModuleLabel,
  volunteerDisplayName,
  volunteerStatus,
} from "./volunteer-stats";

export type SheetsSyncEvent =
  | "login"
  | "progress"
  | "lesson"
  | "quiz"
  | "timer"
  | "signout"
  | "complete"
  | "restart";

export type SheetsSyncPayload = {
  event: SheetsSyncEvent;
  email: string;
  name: string;
  uid: string;
  completedModules: number;
  totalModules: number;
  modulesPassed: string[];
  timeSpentMinutes: number;
  moduleScores: Record<string, { score: number; passed: boolean; attempts: number }>;
  lastActive: string;
  volunteerId: string;
  firstName: string;
  lastName: string;
  status: string;
  progressPct: number;
  modulesCompleted: number;
  lessonsViewed: number;
  averageQuizGrade: number | null;
  finalGrade: number | null;
  currentModule: string;
  startedAt: string;
  completedAt: string | null;
  courseSubmitted: boolean;
  totalQuizAttempts: number;
  accessCodeUsed: string;
};

const FAILED_SYNC_KEY = "axiom-sheets-sync-failed";

export function isSheetsSyncConfigured() {
  return Boolean(import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL?.trim());
}

function moduleScoresPayload(progress: CourseProgressDoc) {
  const moduleScores: SheetsSyncPayload["moduleScores"] = {};
  for (const [moduleId, record] of Object.entries(progress.moduleScores)) {
    moduleScores[moduleId] = {
      score: record.score,
      passed: record.passed,
      attempts: record.attempts,
    };
  }
  return moduleScores;
}

export function buildSheetsPayload(
  event: SheetsSyncEvent,
  user: { uid: string; email: string | null; displayName: string | null },
  progress: CourseProgressDoc,
  totalModules: number,
  timeSpentMs: number,
): SheetsSyncPayload {
  return buildVolunteerSheetsPayload(event, progress, timeSpentMs, {
    uid: user.uid,
    email: user.email ?? progress.email,
    name: user.displayName ?? volunteerDisplayName(progress),
    totalModules,
  });
}

export function buildVolunteerSheetsPayload(
  event: SheetsSyncEvent,
  progress: CourseProgressDoc,
  timeSpentMs: number,
  extras?: { uid?: string; email?: string; name?: string; totalModules?: number },
): SheetsSyncPayload {
  const totalModules = extras?.totalModules ?? COURSE_MODULE_META.length;
  const average = computeAverageQuizGrade(progress);
  return {
    event,
    email: extras?.email ?? progress.email,
    name: extras?.name ?? volunteerDisplayName(progress),
    uid: extras?.uid ?? progress.volunteerId,
    completedModules: progress.completedModuleIds.length,
    totalModules,
    modulesPassed: progress.completedModuleIds,
    timeSpentMinutes: Math.round(timeSpentMs / 60000),
    moduleScores: moduleScoresPayload(progress),
    lastActive: progress.lastActiveAt || new Date().toISOString(),
    volunteerId: progress.volunteerId,
    firstName: progress.firstName,
    lastName: progress.lastName,
    status: volunteerStatus(progress),
    progressPct: progress.overallProgressPct,
    modulesCompleted: progress.completedModuleIds.length,
    lessonsViewed: progress.completedLessonIds.length,
    averageQuizGrade: average == null ? null : Math.round(average * 100),
    finalGrade: (() => {
      const grade = computeFinalGrade(progress);
      return grade == null ? null : Math.round(grade * 100);
    })(),
    currentModule: currentModuleLabel(progress),
    startedAt: progress.startedAt,
    completedAt: progress.completedAt,
    courseSubmitted: progress.courseSubmitted,
    totalQuizAttempts: computeTotalQuizAttempts(progress),
    accessCodeUsed: progress.accessCodeUsed,
  };
}

function readFailedSyncQueue(): SheetsSyncPayload[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAILED_SYNC_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as SheetsSyncPayload[]) : [];
  } catch {
    return [];
  }
}

function writeFailedSyncQueue(queue: SheetsSyncPayload[]) {
  if (typeof localStorage === "undefined") return;
  if (queue.length === 0) {
    localStorage.removeItem(FAILED_SYNC_KEY);
    return;
  }
  localStorage.setItem(FAILED_SYNC_KEY, JSON.stringify(queue.slice(-20)));
}

async function postSheetsPayload(url: string, payload: SheetsSyncPayload) {
  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
}

let syncQueue: Promise<void> = Promise.resolve();

export function queueSheetsSync(
  payload: SheetsSyncPayload,
  onError?: (message: string) => void,
) {
  const url = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!url) return;

  syncQueue = syncQueue.then(async () => {
    const pending = readFailedSyncQueue();
    const batch = [...pending, payload];
    const stillFailed: SheetsSyncPayload[] = [];

    for (const item of batch) {
      try {
        await postSheetsPayload(url, item);
      } catch (error) {
        console.warn("Google Sheets sync failed", error);
        stillFailed.push(item);
      }
    }

    writeFailedSyncQueue(stillFailed);
    if (stillFailed.length > 0) {
      onError?.("Course progress is saved, but Google Sheets could not be updated.");
    }
  });
}
