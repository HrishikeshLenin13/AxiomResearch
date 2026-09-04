import { Link } from "@tanstack/react-router";
import { Lock, Play } from "lucide-react";
import {
  COURSE_MODULES,
  FINAL_QUIZ_ID,
  PASSING_SCORE,
  isFinalUnlocked,
  isModuleUnlocked,
} from "../data/modules";
import { useCourse } from "../context/CourseProvider";
import { CourseHeader } from "./CourseHeader";
import { CourseProgressBar } from "./CourseProgressBar";

export function CourseDashboard() {
  const { user, volunteer, progress, resetCourseProgress, submitCourse, sheetsWarning } = useCourse();
  const completed = progress?.completedModuleIds ?? [];
  const total = COURSE_MODULES.length;
  const firstName = volunteer?.firstName ?? user?.displayName?.split(" ")[0] ?? "Student";
  const modulesPassed = COURSE_MODULES.filter((module) => completed.includes(module.id)).length;
  const finalRecord = progress?.moduleScores[FINAL_QUIZ_ID];
  const finalUnlocked = isFinalUnlocked(completed);
  const finalPassed = Boolean(finalRecord?.passed);
  const courseSubmitted = Boolean(progress?.courseSubmitted);
  const statusLabel = courseSubmitted
    ? "submitted"
    : finalPassed
      ? "ready to submit"
      : "final pending";

  return (
    <div className="min-h-screen">
      <CourseHeader user={user} homeTo="/learn/dashboard" />

      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <p className="course-kicker">Welcome</p>
        <h1 className="course-serif text-5xl md:text-6xl mt-2 leading-none">{firstName}</h1>
        {volunteer ? (
          <p className="mt-2 text-sm text-[var(--course-ink-soft)]">
            Volunteer ID {volunteer.volunteerId}
          </p>
        ) : null}
        {sheetsWarning ? (
          <p className="mt-3 text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            {sheetsWarning}
          </p>
        ) : null}
        <p className="text-[var(--course-ink-soft)] mt-3 max-w-xl">
          Pass each unit quiz with {Math.round(PASSING_SCORE * 100)}% to unlock the next unit. After
          all eight quizzes, take the final exam, then submit the course. Only multiple-choice
          questions are graded.
        </p>

        <div className="mt-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-[var(--course-ink-soft)]">Course progress</span>
            <span className="font-medium">
              {modulesPassed} / {total} units · {statusLabel}
            </span>
          </div>
          <CourseProgressBar value={modulesPassed + (finalPassed ? 1 : 0)} max={total + 1} />
        </div>

        <div className="mt-8 space-y-3">
          {COURSE_MODULES.map((module) => {
            const unlocked = isModuleUnlocked(module.id, completed);
            const passed = completed.includes(module.id);
            const score = progress?.moduleScores[module.id];

            return (
              <div key={module.id} className={`course-module-row ${unlocked ? "" : "locked"}`}>
                <div className="w-9 h-9 rounded-full border border-[var(--course-line)] grid place-items-center shrink-0 text-sm font-semibold">
                  {module.number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold leading-tight flex items-center gap-2">
                    {module.title}
                    {!unlocked ? <Lock size={14} /> : null}
                  </p>
                  <p className="text-sm text-[var(--course-ink-soft)] italic mt-0.5">{module.tagline}</p>
                  {score ? (
                    <p className="text-xs text-[var(--course-ink-soft)] mt-1">
                      Grade: {Math.round(score.score * 100)}% · Attempts: {score.attempts}
                    </p>
                  ) : unlocked ? (
                    <p className="text-xs text-[var(--course-ink-soft)] mt-1">Not yet submitted</p>
                  ) : (
                    <p className="text-xs text-[var(--course-ink-soft)] mt-1">Pass the previous quiz to unlock</p>
                  )}
                  {passed ? <p className="text-xs text-emerald-700 mt-1">Passed</p> : null}
                </div>
                {unlocked ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to="/learn/modules/$moduleId"
                      params={{ moduleId: module.id }}
                      className="shrink-0 w-10 h-10 rounded-full border border-[var(--course-line)] grid place-items-center hover:bg-[var(--course-bg-warm)]"
                      aria-label={`Open ${module.title}`}
                    >
                      <Play size={16} className="ml-0.5" />
                    </Link>
                    <Link
                      to="/learn/modules/$moduleId/quiz"
                      params={{ moduleId: module.id }}
                      className="text-xs font-medium text-[var(--course-accent-deep)] hover:underline"
                    >
                      Quiz
                    </Link>
                  </div>
                ) : (
                  <div className="shrink-0 w-10 h-10 rounded-full border border-[var(--course-line)] grid place-items-center">
                    <Lock size={15} />
                  </div>
                )}
              </div>
            );
          })}

          <div className={`course-module-row ${finalUnlocked ? "" : "locked"}`}>
            <div className="w-9 h-9 rounded-full border border-[var(--course-line)] grid place-items-center shrink-0 text-sm font-semibold">
              F
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold">Final exam</p>
              <p className="text-sm text-[var(--course-ink-soft)] italic mt-0.5">
                Timed multiple-choice exam. Submit the course after you pass.
              </p>
              {finalRecord ? (
                <p className="text-xs text-[var(--course-ink-soft)] mt-1">
                  Grade: {Math.round(finalRecord.score * 100)}%
                  {finalPassed ? " · Passed" : ""}
                </p>
              ) : null}
            </div>
            {finalUnlocked ? (
              <Link
                to="/learn/final"
                className="shrink-0 w-10 h-10 rounded-full border border-[var(--course-line)] grid place-items-center hover:bg-[var(--course-bg-warm)]"
                aria-label="Open final exam"
              >
                <Play size={16} className="ml-0.5" />
              </Link>
            ) : (
              <div className="shrink-0 w-10 h-10 rounded-full border border-[var(--course-line)] grid place-items-center">
                <Lock size={15} />
              </div>
            )}
          </div>
        </div>

        {finalPassed && !courseSubmitted ? (
          <div className="course-card mt-8 p-6 text-center">
            <h2 className="course-serif text-3xl">Ready to submit</h2>
            <p className="text-[var(--course-ink-soft)] mt-2">
              Final exam grade: {Math.round((finalRecord?.score ?? 0) * 100)}%
            </p>
            <p className="text-sm text-[var(--course-ink-soft)] mt-2">
              Your final is recorded. Submit the course when you are ready.
            </p>
            <button
              type="button"
              onClick={() => void submitCourse()}
              className="course-btn-primary mt-5"
            >
              Submit course
            </button>
          </div>
        ) : null}

        {courseSubmitted ? (
          <div className="course-card mt-8 p-6 text-center">
            <h2 className="course-serif text-3xl">Course submitted</h2>
            <p className="text-[var(--course-ink-soft)] mt-2">
              Final grade: {Math.round((finalRecord?.score ?? 0) * 100)}%
            </p>
          </div>
        ) : null}

        <div className="mt-8 course-card p-5 text-sm text-[var(--course-ink-soft)] flex flex-wrap items-center justify-between gap-3">
          <span>Restart the course from zero. This clears every quiz grade.</span>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Reset all progress to 0? This cannot be undone.")) {
                void resetCourseProgress();
              }
            }}
            className="course-btn-secondary !py-2 !px-4 !text-sm"
          >
            Restart course
          </button>
        </div>
      </main>
    </div>
  );
}
