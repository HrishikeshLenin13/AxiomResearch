export type Callout = {
  type: "tip" | "mistake" | "did-you-know";
  title: string;
  body: string;
};

export type CourseModuleSection = {
  title: string;
  body: string;
  callouts?: Callout[];
};

export type CourseActivity = {
  title: string;
  objective: string;
  instructions: string[];
  deliverable: string;
  timeEstimate: string;
};

export type CourseReflection = {
  prompt: string;
  guidelines: string[];
  wordCount: string;
  rubric: string[];
};

export type VocabularyTerm = {
  term: string;
  definition: string;
};

export type FurtherReading = {
  title: string;
  description: string;
};

export type CourseModule = {
  id: string;
  number: number;
  title: string;
  summary: string;
  estimatedMinutes: number;
  learningObjectives: string[];
  sections: CourseModuleSection[];
  vocabulary: VocabularyTerm[];
  keyTakeaways: string[];
  commonMistakes: string[];
  researchTips: string[];
  activity: CourseActivity;
  reflection: CourseReflection;
  furtherReading: FurtherReading[];
};

export const PASSING_SCORE = 0.7;
