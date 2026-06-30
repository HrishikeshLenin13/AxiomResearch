import type { CourseProgressDoc } from "./progress";

export type SheetsSyncPayload = {
  event: "login" | "progress" | "quiz" | "timer" | "signout";
  email: string;
  name: string;
  uid: string;
  completedModules: number;
  totalModules: number;
  modulesPassed: string[];
  timeSpentMinutes: number;
  moduleScores: Record<string, { score: number; passed: boolean; attempts: number }>;
  lastActive: string;
};

export function isSheetsSyncConfigured() {
  return Boolean(import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL?.trim());
}

export function buildSheetsPayload(
  event: SheetsSyncPayload["event"],
  user: { uid: string; email: string | null; displayName: string | null },
  progress: CourseProgressDoc,
  totalModules: number,
  timeSpentMs: number,
): SheetsSyncPayload {
  const moduleScores: SheetsSyncPayload["moduleScores"] = {};
  for (const [moduleId, record] of Object.entries(progress.moduleScores)) {
    moduleScores[moduleId] = {
      score: record.score,
      passed: record.passed,
      attempts: record.attempts,
    };
  }

  return {
    event,
    email: user.email ?? progress.email,
    name: user.displayName ?? "",
    uid: user.uid,
    completedModules: progress.completedModuleIds.length,
    totalModules,
    modulesPassed: progress.completedModuleIds,
    timeSpentMinutes: Math.round(timeSpentMs / 60000),
    moduleScores,
    lastActive: new Date().toISOString(),
  };
}

let syncQueue: Promise<void> = Promise.resolve();

export function queueSheetsSync(payload: SheetsSyncPayload) {
  const url = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!url) return;

  syncQueue = syncQueue.then(async () => {
    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.warn("Google Sheets sync failed", error);
    }
  });
}
