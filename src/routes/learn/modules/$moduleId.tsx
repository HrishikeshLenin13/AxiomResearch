import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Clock, ListChecks, PenLine, Target } from "lucide-react";
import {
  COURSE_ESTIMATED_LABEL,
  getModuleById,
  getNextModuleId,
  isModuleUnlocked,
} from "../../../course/data/modules";
import { QUIZ_QUESTIONS_PER_MODULE } from "../../../course/data/quizzes";
import { useCourse } from "../../../course/context/CourseProvider";

export const Route = createFileRoute("/learn/modules/$moduleId")({
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
        { title: `${module?.title ?? "Module"} — Axiom Research Initiative` },
        { name: "robots", content: "noindex,nofollow" },
      ],
    };
  },
  component: ModuleLessonPage,
});

function ModuleLessonPage() {
  const { moduleId } = Route.useParams();
  const { progress } = useCourse();
  const module = getModuleById(moduleId);
  const completed = progress?.completedModuleIds ?? [];

  if (!module) return null;

  if (!isModuleUnlocked(module.id, completed)) {
    return (
      <div className="course-card p-8">
        <h1 className="course-serif text-3xl">Section locked</h1>
        <p className="text-[var(--course-ink-soft)] mt-2">
          Pass the previous quiz with at least 80% to unlock this lesson.
        </p>
        <Link to="/learn/dashboard" className="inline-block mt-4 text-[var(--course-accent-deep)] font-medium">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const nextModuleId = getNextModuleId(module.id);
  const passed = completed.includes(module.id);

  return (
    <div className="space-y-5 pb-10">
      <div className="course-card p-6 md:p-8">
        <p className="course-kicker">Unit {module.number} · ~{COURSE_ESTIMATED_LABEL} total course</p>
        <h1 className="course-serif text-4xl md:text-5xl mt-2">{module.title}</h1>
        <p className="text-[var(--course-ink-soft)] italic mt-2">{module.tagline}</p>
        <p className="text-[var(--course-ink-soft)] mt-4 leading-relaxed">{module.summary}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--course-ink-soft)]">
          <span className="inline-flex items-center gap-2">
            <Clock size={14} />
            ~{module.estimatedMinutes} min
          </span>
          <span className="inline-flex items-center gap-2">
            <ListChecks size={14} />
            {module.sections.length} sections · {QUIZ_QUESTIONS_PER_MODULE} quiz questions
          </span>
        </div>
      </div>

      <div className="course-card p-6 md:p-8">
        <h2 className="font-semibold text-lg">Learning objectives</h2>
        <ul className="mt-3 space-y-2 text-[var(--course-ink-soft)] list-disc pl-5">
          {module.learningObjectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </div>

      {module.sections.map((section) => (
        <article key={section.title} className="course-card p-6 md:p-8">
          <h2 className="font-semibold text-lg">{section.title}</h2>
          <p className="text-[var(--course-ink-soft)] mt-3 leading-relaxed">{section.body}</p>
        </article>
      ))}

      <div className="course-card p-6 md:p-8">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Target size={18} className="text-[var(--course-accent-deep)]" />
          Key takeaways
        </h2>
        <ul className="mt-3 space-y-2 text-[var(--course-ink-soft)] list-disc pl-5">
          {module.keyTakeaways.map((takeaway) => (
            <li key={takeaway}>{takeaway}</li>
          ))}
        </ul>
      </div>

      <div className="course-card p-6 md:p-8">
        <h2 className="font-semibold text-lg">Practical activity · ~{module.activity.timeMinutes} min</h2>
        <p className="font-medium mt-2">{module.activity.title}</p>
        <ol className="mt-4 space-y-2 text-[var(--course-ink-soft)] list-decimal pl-5">
          {module.activity.steps.map((step) => (
            <li key={step} className="leading-relaxed">{step}</li>
          ))}
        </ol>
        <p className="mt-4 text-sm">
          <span className="font-medium">Deliverable:</span>{" "}
          <span className="text-[var(--course-ink-soft)]">{module.activity.deliverable}</span>
        </p>
      </div>

      <div className="course-card p-6 md:p-8">
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <PenLine size={18} className="text-[var(--course-accent-deep)]" />
          Reflection · {module.reflection.wordTarget}
        </h2>
        <p className="text-[var(--course-ink-soft)] mt-3 leading-relaxed">{module.reflection.prompt}</p>
        <ul className="mt-3 space-y-1 text-sm text-[var(--course-ink-soft)] list-disc pl-5">
          {module.reflection.guideQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/learn/dashboard" className="text-sm text-[var(--course-ink-soft)] hover:text-[var(--course-ink)]">
          Dashboard
        </Link>
        <div className="flex gap-2">
          {passed && nextModuleId ? (
            <Link
              to="/learn/modules/$moduleId"
              params={{ moduleId: nextModuleId }}
              className="course-btn-secondary !py-2.5 !px-5 !text-sm"
            >
              Next unit
            </Link>
          ) : null}
          <Link
            to="/learn/modules/$moduleId/quiz"
            params={{ moduleId: module.id }}
            className="course-btn-primary !py-2.5 !px-5 !text-sm"
          >
            {passed ? "Review quiz" : "Take quiz"}
          </Link>
        </div>
      </div>
    </div>
  );
}
