import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, BookMarked, Clock, Lightbulb, ListChecks, Sparkles, Target } from "lucide-react";
import {
  COURSE_ESTIMATED_LABEL,
  getModuleById,
  getNextModuleId,
  isModuleUnlocked,
} from "../../../../course/data/modules";
import { QUIZ_QUESTIONS_PER_MODULE } from "../../../../course/data/quizzes";
import type { Callout } from "../../../../course/data/module-types";
import { useEffect } from "react";
import { useCourse } from "../../../../course/context/CourseProvider";

export const Route = createFileRoute("/learn/modules/$moduleId/")({
  head: ({ params }) => {
    const module = getModuleById(params.moduleId);
    return {
      meta: [
        { title: `${module?.title ?? "Module"} — Research Foundations` },
      ],
    };
  },
  component: ModuleLessonPage,
});

function ModuleLessonPage() {
  const { moduleId } = Route.useParams();
  const { progress, recordLessonComplete } = useCourse();
  const module = getModuleById(moduleId);

  useEffect(() => {
    if (module && isModuleUnlocked(module.id, progress?.completedModuleIds ?? [])) {
      void recordLessonComplete(module.id);
    }
  }, [module, progress?.completedModuleIds, recordLessonComplete]);

  if (!module) return null;

  const completed = progress?.completedModuleIds ?? [];
  if (!isModuleUnlocked(module.id, completed)) {
    return (
      <div className="course-card p-8">
        <h1 className="course-serif text-3xl">Unit locked</h1>
        <p className="text-[var(--course-ink-soft)] mt-2">
          Pass the previous unit quiz with at least 80% to unlock this lesson.
        </p>
        <Link to="/learn/dashboard" className="inline-block mt-4 text-[var(--course-accent-deep)] font-medium">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const passed = completed.includes(module.id);
  const nextModuleId = getNextModuleId(module.id);

  return (
    <div className="space-y-5 pb-10">
      <div className="course-card p-6 md:p-8">
        <p className="course-kicker">Unit {module.number} · {COURSE_ESTIMATED_LABEL}</p>
        <h1 className="course-serif text-4xl md:text-5xl mt-2">{module.title}</h1>
        {module.tagline ? (
          <p className="text-[var(--course-ink-soft)] italic mt-2">{module.tagline}</p>
        ) : null}
        <p className="text-[var(--course-ink-soft)] mt-4 leading-relaxed">{module.summary}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--course-ink-soft)]">
          <span className="inline-flex items-center gap-2">
            <Clock size={14} />
            ~{module.estimatedMinutes} min of reading
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
          <div className="mt-3 space-y-4 text-[var(--course-ink-soft)] leading-relaxed">
            {section.body.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          {section.callouts?.map((callout) => (
            <CourseCallout key={callout.title} callout={callout} />
          ))}
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
        <h2 className="font-semibold text-lg">Common mistakes</h2>
        <ul className="mt-3 space-y-2 text-[var(--course-ink-soft)] list-disc pl-5">
          {module.commonMistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="course-card p-6 md:p-8">
        <h2 className="font-semibold text-lg">Research tips</h2>
        <ul className="mt-3 space-y-2 text-[var(--course-ink-soft)] list-disc pl-5">
          {module.researchTips.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="course-card p-6 md:p-8">
        <h2 className="font-semibold text-lg">Vocabulary</h2>
        <dl className="mt-4 space-y-3">
          {module.vocabulary.map((item) => (
            <div key={item.term} className="rounded-xl border border-[var(--course-line)] bg-[var(--course-bg)]/50 p-4">
              <dt className="font-medium flex items-center gap-2">
                <BookMarked size={14} className="text-[var(--course-accent-deep)]" />
                {item.term}
              </dt>
              <dd className="text-sm text-[var(--course-ink-soft)] mt-1 leading-relaxed">{item.definition}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="course-card p-6 md:p-8">
        <h2 className="font-semibold text-lg">Further reading</h2>
        <ul className="mt-3 space-y-3">
          {module.furtherReading.map((item) => (
            <li key={item.title}>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-[var(--course-ink-soft)] mt-1 leading-relaxed">{item.description}</p>
            </li>
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
          {passed && !nextModuleId ? (
            <Link to="/learn/final" className="course-btn-secondary !py-2.5 !px-5 !text-sm">
              Final exam
            </Link>
          ) : null}
          <Link
            to="/learn/modules/$moduleId/quiz"
            params={{ moduleId: module.id }}
            className="course-btn-primary !py-2.5 !px-5 !text-sm"
          >
            Take quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

function CourseCallout({ callout }: { callout: Callout }) {
  const meta = {
    tip: { icon: Lightbulb, label: "Research tip" },
    mistake: { icon: AlertTriangle, label: "Common mistake" },
    "did-you-know": { icon: Sparkles, label: "Did you know?" },
  }[callout.type];
  const Icon = meta.icon;

  return (
    <div className="mt-4 rounded-xl border border-[var(--course-line)] bg-[var(--course-bg)]/70 p-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Icon size={16} className="text-[var(--course-accent-deep)]" />
        {callout.title || meta.label}
      </div>
      <p className="text-sm text-[var(--course-ink-soft)] mt-2 leading-relaxed">{callout.body}</p>
    </div>
  );
}
