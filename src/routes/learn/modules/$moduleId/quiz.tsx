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
        { name: "robots", content: "noindex,nofollow" },
      ],
    };
  },
  component: ModuleQuizPage,
});

function ModuleQuizPage() {
  const { moduleId } = Route.useParams();
  const { progress } = useCourse();
  const module = getModuleById(moduleId);
  const completed = progress?.completedModuleIds ?? [];

  if (!module) return null;

  if (!isModuleUnlocked(module.id, completed)) {
    return (
      <div className="glass rounded-3xl p-8">
        <h1 className="text-2xl font-semibold">Quiz locked</h1>
        <p className="text-muted-foreground mt-2">
          Complete the previous module quiz before attempting this one.
        </p>
        <Link to="/learn" className="inline-block mt-4 text-primary">
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
    />
  );
}
