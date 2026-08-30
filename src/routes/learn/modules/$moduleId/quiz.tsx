import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { getModuleById, getNextModuleId, isModuleUnlocked } from "../../../../course/data/modules";
import { QuizView } from "../../../../course/components/QuizView";
import { useCourse } from "../../../../course/context/CourseProvider";

export const Route = createFileRoute("/learn/modules/$moduleId/quiz")({
  beforeLoad: ({ params }) => {
    const module = getModuleById(params.moduleId);
    if (!module) {
      throw redirect({ to: "/learn/dashboard" });
    }
  },
  head: ({ params }) => {
    const module = getModuleById(params.moduleId);
    return {
      meta: [
        { title: `Quiz — ${module?.title ?? "Module"} — Research Foundations` },
      ],
    };
  },
  component: ModuleQuizPage,
});

function ModuleQuizPage() {
  const { moduleId } = Route.useParams();
  const { progress } = useCourse();
  const module = getModuleById(moduleId);
  if (!module) return null;

  const completed = progress?.completedModuleIds ?? [];
  if (!isModuleUnlocked(module.id, completed)) {
    return (
      <div className="course-card p-8">
        <h1 className="course-serif text-3xl">Quiz locked</h1>
        <p className="text-[var(--course-ink-soft)] mt-2">
          Pass the previous unit quiz with at least 80% to unlock this quiz.
        </p>
        <Link to="/learn/dashboard" className="inline-block mt-4 text-[var(--course-accent-deep)] font-medium">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <QuizView
      moduleId={module.id}
      moduleTitle={module.title}
      nextModuleId={getNextModuleId(module.id)}
      briefing={module.keyTakeaways}
    />
  );
}
