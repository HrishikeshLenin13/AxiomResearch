import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { useCourse } from "../context/CourseProvider";
import { CourseHeader } from "./CourseHeader";
import { CourseProgressBar } from "./CourseProgressBar";
import { COURSE_MODULES, isModuleUnlocked } from "../data/modules";

export function CourseModuleShell() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, loading, progress, quizSessionActive, setQuizSessionActive } = useCourse();
  const completedIds = progress?.completedModuleIds ?? [];
  const completed = COURSE_MODULES.filter(({ id }) => completedIds.includes(id)).length;
  const currentId = pathname.split("/")[3];

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center" role="status">
        Loading course…
      </div>
    );
  }

  function confirmNavigation() {
    if (
      quizSessionActive &&
      !window.confirm("Leave this quiz? Your answers for this attempt may be deleted.")
    )
      return false;
    setQuizSessionActive(false);
    return true;
  }

  function goDashboard() {
    if (confirmNavigation()) void navigate({ to: "/learn/dashboard" });
  }

  function curriculum() {
    return (
      <nav aria-label="Course units" className="course-unit-nav">
        <p className="course-unit-progress">
          {completed} of {COURSE_MODULES.length} quizzes passed
        </p>
        <CourseProgressBar value={completed} max={COURSE_MODULES.length} />
        <ol>
          {COURSE_MODULES.map(({ id, number, title }) => {
            const passed = completedIds.includes(id);
            const current = currentId === id;
            const unlocked = isModuleUnlocked(id, completedIds);
            return (
              <li key={id}>
                {unlocked ? (
                  <button
                    type="button"
                    aria-current={current ? "step" : undefined}
                    onClick={() => {
                      if (confirmNavigation())
                        void navigate({ to: "/learn/modules/$moduleId", params: { moduleId: id } });
                    }}
                  >
                    <span>{String(number).padStart(2, "0")}</span>
                    {title}
                    {passed && (
                      <>
                        <Check size={15} aria-hidden="true" />
                        <span className="sr-only">Passed</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div aria-current={current ? "step" : undefined}>
                    <span>{String(number).padStart(2, "0")}</span>
                    {title}
                    <Lock size={14} aria-hidden="true" />
                    <span className="sr-only">Locked</span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <div className="min-h-screen">
      <a href="#course-workspace" className="site-skip">
        Skip to lesson content
      </a>
      <CourseHeader user={user} homeTo="/learn/dashboard" />
      <div className="course-workspace site-wrap">
        <aside className="course-workspace-rail">
          <button type="button" onClick={goDashboard} className="site-text-link">
            <ArrowLeft size={16} aria-hidden="true" /> Dashboard
          </button>
          <div className="course-desktop-units">{curriculum()}</div>
          <details className="course-mobile-units">
            <summary>
              Course units · {completed}/{COURSE_MODULES.length} passed
            </summary>
            {curriculum()}
          </details>
        </aside>
        <main id="course-workspace" tabIndex={-1} className="course-workspace-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
