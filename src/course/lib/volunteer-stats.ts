import { COURSE_MODULE_META, FINAL_QUIZ_ID } from "../data/module-meta";
import type { CourseProgressDoc } from "./progress";

const ACTIVE_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;

export function computeOverallProgressPct(progress: CourseProgressDoc) {
  if (progress.courseSubmitted) return 100;
  const modulesPassed = COURSE_MODULE_META.filter((module) =>
    progress.completedModuleIds.includes(module.id),
  ).length;
  const finalPassed = Boolean(progress.moduleScores[FINAL_QUIZ_ID]?.passed);
  return Math.round(((modulesPassed + (finalPassed ? 1 : 0)) / (COURSE_MODULE_META.length + 1)) * 100);
}

export function computeAverageQuizGrade(progress: CourseProgressDoc) {
  const scores = Object.entries(progress.moduleScores)
    .filter(([moduleId]) => moduleId !== FINAL_QUIZ_ID)
    .map(([, record]) => record.score);
  if (scores.length === 0) return null;
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

export function computeFinalGrade(progress: CourseProgressDoc) {
  if (typeof progress.finalGrade === "number") return progress.finalGrade;
  const finalRecord = progress.moduleScores[FINAL_QUIZ_ID];
  return finalRecord?.passed ? finalRecord.score : null;
}

export function computeTotalQuizAttempts(progress: CourseProgressDoc) {
  return Object.values(progress.moduleScores).reduce((sum, record) => sum + record.attempts, 0);
}

export function volunteerStatus(progress: CourseProgressDoc) {
  if (progress.courseSubmitted) return "Completed";
  if (progress.completedModuleIds.length > 0) return "In progress";
  return "Started";
}

export function currentModuleLabel(progress: CourseProgressDoc) {
  if (progress.courseSubmitted) return "Submitted";
  const nextUnit = COURSE_MODULE_META.find((module) => !progress.completedModuleIds.includes(module.id));
  if (nextUnit) return `Unit ${nextUnit.number}: ${nextUnit.title}`;
  if (!progress.moduleScores[FINAL_QUIZ_ID]?.passed) return "Final exam";
  return "Ready to submit";
}

export function applyProgressDerivedFields(progress: CourseProgressDoc): CourseProgressDoc {
  const now = new Date().toISOString();
  return {
    ...progress,
    lastActiveAt: now,
    updatedAt: now,
    overallProgressPct: computeOverallProgressPct(progress),
    finalGrade: computeFinalGrade(progress),
  };
}

export function isActiveVolunteer(progress: CourseProgressDoc, now = Date.now()) {
  if (progress.courseSubmitted) return false;
  const lastActive = Date.parse(progress.lastActiveAt || progress.updatedAt);
  if (Number.isNaN(lastActive)) return false;
  return now - lastActive <= ACTIVE_WINDOW_MS;
}

export function formatPercent(value: number | null | undefined) {
  if (value == null || Number.isNaN(value)) return "—";
  return `${Math.round(value * (value <= 1 ? 100 : 1))}%`;
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString();
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString();
}

export function formatTime(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleTimeString();
}

export function volunteerDisplayName(progress: CourseProgressDoc) {
  return `${progress.firstName} ${progress.lastName}`.trim() || "Volunteer";
}
