import { Link } from "@tanstack/react-router";
import { ArrowRight, Lock, Play } from "lucide-react";
import { COURSE_MODULES, PASSING_SCORE, isModuleUnlocked } from "../data/modules";
import { useCourse } from "../context/CourseProvider";
import { CourseHeader } from "./CourseHeader";
import { CourseProgressBar } from "./CourseProgressBar";
import { formatDuration } from "../lib/progress";

export function CourseDashboard() {
  const { user, progress, activeTimerMs, signOut } = useCourse();
  const completed = progress?.completedModuleIds ?? [];
  const total = COURSE_MODULES.length;
  const firstName = user?.displayName?.split(" ")[0] ?? "Student";

  return (
    <div className="min-h-screen">
      <CourseHeader user={user} onSignOut={() => void signOut()} homeTo="/learn/dashboard" />

      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <p className="course-kicker">Welcome back</p>
        <h1 className="course-serif text-5xl md:text-6xl mt-2 leading-none">{firstName}</h1>

        <div className="mt-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-[var(--course-ink-soft)]">Course progress</span>
            <span className="font-medium">
              {completed.length} / {total} sections passed
            </span>
          </div>
          <CourseProgressBar value={completed.length} max={total} />
          <p className="text-xs text-[var(--course-ink-soft)] mt-2">
            Time in course: {formatDuration(activeTimerMs)} · Pass each quiz with{" "}
            {Math.round(PASSING_SCORE * 100)}%+ to unlock the next section
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {COURSE_MODULES.map((module) => {
            const unlocked = isModuleUnlocked(module.id, completed);
            const passed = completed.includes(module.id);
            const score = progress?.moduleScores[module.id];

            return (
              <div
                key={module.id}
                className={`course-module-row ${unlocked ? "" : "locked"}`}
              >
                <div className="w-9 h-9 rounded-full border border-[var(--course-line)] grid place-items-center shrink-0 text-sm font-semibold">
                  {module.number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold leading-tight flex items-center gap-2">
                    {module.title}
                    {!unlocked ? <Lock size={14} className="text-[var(--course-ink-soft)]" /> : null}
                  </p>
                  <p className="text-sm text-[var(--course-ink-soft)] italic mt-0.5">{module.tagline}</p>
                  {score ? (
                    <p className="text-xs text-[var(--course-ink-soft)] mt-1">
                      Best quiz: {Math.round(score.score * 100)}%
                    </p>
                  ) : null}
                </div>
                {unlocked ? (
                  <Link
                    to="/learn/modules/$moduleId"
                    params={{ moduleId: module.id }}
                    className="shrink-0 w-10 h-10 rounded-full border border-[var(--course-line)] grid place-items-center hover:bg-[var(--course-bg-warm)]"
                    aria-label={`Open ${module.title}`}
                  >
                    <Play size={16} className="ml-0.5" />
                  </Link>
                ) : (
                  <div className="shrink-0 w-10 h-10 rounded-full border border-[var(--course-line)] grid place-items-center opacity-60">
                    <Lock size={15} />
                  </div>
                )}
                {passed ? (
                  <Link
                    to="/learn/modules/$moduleId/quiz"
                    params={{ moduleId: module.id }}
                    className="sr-only"
                  >
                    Review quiz
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>

        {completed.length === total ? (
          <div className="course-card mt-8 p-6 text-center">
            <h2 className="course-serif text-3xl">Course complete</h2>
            <p className="text-[var(--course-ink-soft)] mt-2">
              You finished all eight sections. Your progress is logged automatically.
            </p>
          </div>
        ) : null}

        <div className="mt-8 flex justify-center">
          <Link to="/learn" className="text-sm text-[var(--course-ink-soft)] hover:text-[var(--course-ink)] inline-flex items-center gap-1">
            Back to course home <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    </div>
  );
}
