import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useCourse } from "../context/CourseProvider";
import { CourseHeader } from "./CourseHeader";
import { CourseProgressBar } from "./CourseProgressBar";
import { COURSE_MODULES } from "../data/modules";

export function CourseModuleShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, progress, quizSessionActive, setQuizSessionActive } = useCourse();
  const isModuleRoute = location.pathname.includes("/learn/modules/");
  const completed = COURSE_MODULES.filter((module) =>
    progress?.completedModuleIds.includes(module.id),
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-[var(--course-ink-soft)]">
        Loading...
      </div>
    );
  }

  function goDashboard() {
    if (
      quizSessionActive &&
      !window.confirm("Leave this quiz? Your answers for this attempt may be deleted.")
    ) {
      return;
    }
    setQuizSessionActive(false);
    navigate({ to: "/learn/dashboard" });
  }

  return (
    <div className="min-h-screen">
      <CourseHeader user={user} homeTo="/learn/dashboard" />

      {isModuleRoute ? (
        <div className="border-b border-[var(--course-line)] bg-[var(--course-paper)]/60">
          <div className="mx-auto max-w-3xl px-5 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--course-ink-soft)]">
              <button type="button" onClick={goDashboard} className="hover:text-[var(--course-ink)]">
                ← Dashboard
              </button>
              <span>
                {completed}/{COURSE_MODULES.length} quizzes passed
              </span>
            </div>
            <CourseProgressBar value={completed} max={COURSE_MODULES.length} className="mt-2" />
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-3xl px-5 py-8">
        <Outlet />
      </div>
    </div>
  );
}
