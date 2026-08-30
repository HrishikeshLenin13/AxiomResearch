import { module01 } from "./content/m01";
import { module02 } from "./content/m02";
import { module03 } from "./content/m03";
import { module04 } from "./content/m04";
import { module07 } from "./content/m07";
import { module08 } from "./content/m08";
import { module10 } from "./content/m10";
import { module12 } from "./content/m12";
import type { CourseModule } from "./module-types";

export type { CourseModule, CourseActivity, CourseReflection, CourseModuleSection } from "./module-types";

export const PASSING_SCORE = 0.8;
export const RETAKE_SCORE_CAP = 0.8;
export const MODULE_QUIZ_SECONDS = 10 * 60;
export const FINAL_QUIZ_SECONDS = 20 * 60;

export const COURSE_ESTIMATED_LABEL = "2 - 3 hours of core lessons";

function unit(
  source: CourseModule,
  number: number,
  id: string,
  title: string,
  tagline: string,
): CourseModule {
  return {
    ...source,
    id,
    number,
    title,
    tagline,
  };
}

export const COURSE_MODULES: CourseModule[] = [
  unit(module01, 1, "module-1", "What Research Actually Is", "From curiosity to contribution"),
  unit(module03, 2, "module-2", "Finding Reliable Sources", "Where real evidence lives"),
  unit(module04, 3, "module-3", "How to Read Papers", "References, citations, and source material"),
  unit(module02, 4, "module-4", "Developing a Research Question", "Methodology starts here"),
  unit(module07, 5, "module-5", "Experimental Design", "Building a study you can defend"),
  unit(module08, 6, "module-6", "Data Analysis and Statistics", "What the numbers can and cannot say"),
  unit(module10, 7, "module-7", "Communication: Writing Papers", "Saying it clearly so the work survives"),
  unit(module12, 8, "module-8", "AI in Research", "Powerful tool, dangerous shortcut"),
];

export function getModuleById(id: string) {
  return COURSE_MODULES.find((module) => module.id === id);
}

export function getNextModuleId(id: string) {
  const index = COURSE_MODULES.findIndex((module) => module.id === id);
  if (index < 0 || index >= COURSE_MODULES.length - 1) return null;
  return COURSE_MODULES[index + 1].id;
}

export function isModuleUnlocked(moduleId: string, completedModuleIds: string[]) {
  const index = COURSE_MODULES.findIndex((module) => module.id === moduleId);
  if (index <= 0) return true;
  const previous = COURSE_MODULES[index - 1];
  return completedModuleIds.includes(previous.id);
}

export const FINAL_QUIZ_ID = "final";

export function isFinalUnlocked(completedModuleIds: string[]) {
  return COURSE_MODULES.every((module) => completedModuleIds.includes(module.id));
}
