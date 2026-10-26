import { formatDuration } from "./course-timer.ts";
type ProgressSummary = {
  completedModuleIds: string[];
  moduleScores: Record<string, {score:number; passed:boolean; attempts:number}>;
};
type ModuleSummary = {id:string; title:string};

/** A study aid, not a completion certificate. Never includes account/access fields. */
export function studySummary(progress: ProgressSummary, modules: readonly ModuleSummary[], timerMs: number): string {
  const passed = modules.filter(module => progress.completedModuleIds.includes(module.id)).length;
  const lines = ['Axiom study summary', `Units passed: ${passed}/${modules.length}`, `Study time: ${formatDuration(timerMs)}`, ''];
  for (const module of modules) {
    const record = progress.moduleScores[module.id];
    const score = record && Number.isFinite(record.score) ? ` — ${Math.round(Math.min(1, Math.max(0, record.score)) * 100)}%` : '';
    lines.push(`${progress.completedModuleIds.includes(module.id) ? '[passed]' : '[pending]'} ${module.title}${score}`);
  }
  lines.push('', 'Personal study record only; not a certificate or independently verified service-hours record.');
  return lines.join('\n') + '\n';
}
export function downloadStudySummary(progress: ProgressSummary, modules: readonly ModuleSummary[], timerMs: number, format: "text" | "json" = "text") {
  const payload = format === "json" ? JSON.stringify(studySummaryData(progress,modules,timerMs), null, 2) + "\n" : studySummary(progress,modules,timerMs);
  const url = URL.createObjectURL(new Blob([payload], {type:format === 'json' ? 'application/json' : 'text/plain;charset=utf-8'}));
  const link = document.createElement('a');link.href=url;link.download=format === 'json' ? 'axiom-study-summary.json' : 'axiom-study-summary.txt';
  document.body.append(link);link.click();link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Explicitly allowlisted machine-readable study data. */
export function studySummaryData(progress: ProgressSummary, modules: readonly ModuleSummary[], timerMs: number) {
  return {schemaVersion:1, studyTimeMs:Number.isFinite(timerMs) ? Math.min(Number.MAX_SAFE_INTEGER, Math.max(0, timerMs)) : 0,
    modules:modules.map(module => {
      const record=progress.moduleScores[module.id];
      return {title:module.title, passed:progress.completedModuleIds.includes(module.id), score:record && Number.isFinite(record.score) ? Math.min(1,Math.max(0,record.score)) : null};
    })};
}
