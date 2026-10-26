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
export function downloadStudySummary(progress: ProgressSummary, modules: readonly ModuleSummary[], timerMs: number) {
  const url = URL.createObjectURL(new Blob([studySummary(progress, modules, timerMs)], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a');link.href=url;link.download='axiom-study-summary.txt';
  document.body.append(link);link.click();link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
