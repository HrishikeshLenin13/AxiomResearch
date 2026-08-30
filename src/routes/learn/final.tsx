import { createFileRoute, Link } from "@tanstack/react-router";
import { CourseHeader } from "../../course/components/CourseHeader";
import { QuizView } from "../../course/components/QuizView";
import { useCourse } from "../../course/context/CourseProvider";
import { FINAL_QUIZ_ID, isFinalUnlocked } from "../../course/data/modules";
import { FINAL_QUIZ_BRIEFING } from "../../course/data/quizzes";

export const Route = createFileRoute("/learn/final")({
  head: () => ({
    meta: [{ title: "Final exam — Research Foundations" }],
  }),
  component: FinalExamPage,
});

function FinalExamPage() {
  const { progress, user } = useCourse();
  const completed = progress?.completedModuleIds ?? [];

  if (!isFinalUnlocked(completed)) {
    return (
      <div className="min-h-screen">
        <CourseHeader user={user} homeTo="/learn/dashboard" />
        <div className="mx-auto max-w-3xl px-5 py-10">
          <div className="course-card p-8">
            <h1 className="course-serif text-3xl">Final exam locked</h1>
            <p className="text-[var(--course-ink-soft)] mt-2">
              Pass all eight unit quizzes before taking the final exam.
            </p>
            <Link to="/learn/dashboard" className="inline-block mt-4 text-[var(--course-accent-deep)] font-medium">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <CourseHeader user={user} homeTo="/learn/dashboard" />
      <div className="mx-auto max-w-3xl px-5 py-8">
        <QuizView
          moduleId={FINAL_QUIZ_ID}
          moduleTitle="Final exam"
          nextModuleId={null}
          briefing={FINAL_QUIZ_BRIEFING}
          isFinal
        />
      </div>
    </div>
  );
}
