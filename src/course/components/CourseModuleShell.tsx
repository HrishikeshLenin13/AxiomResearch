import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useCourse } from "../context/CourseProvider";
import { CourseHeader } from "./CourseHeader";
import { CourseProgressBar } from "./CourseProgressBar";
import { COURSE_MODULES } from "../data/modules";
import { formatDuration } from "../lib/progress";

export function CourseModuleShell() {
  const location = useLocation();
  const { user, loading, progress, activeTimerMs, signOut } = useCourse();
  const isModuleRoute = location.pathname.includes("/learn/modules/");
  const completed = progress?.completedModuleIds.length ?? 0;

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-[var(--course-ink-soft)]">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <CourseHeader user={user} onSignOut={() => void signOut()} homeTo="/learn/dashboard" />

      {isModuleRoute ? (
        <div className="border-b border-[var(--course-line)] bg-[var(--course-paper)]/60">
          <div className="mx-auto max-w-3xl px-5 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--course-ink-soft)]">
              <Link to="/learn/dashboard" className="hover:text-[var(--course-ink)]">
                ← Dashboard
              </Link>
              <span>
                {completed}/{COURSE_MODULES.length} passed · {formatDuration(activeTimerMs)}
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
