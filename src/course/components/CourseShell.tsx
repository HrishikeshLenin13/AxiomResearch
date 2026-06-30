import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { BookOpen, Clock, LogOut, RotateCcw } from "lucide-react";
import { useCourse } from "../context/CourseProvider";
import { COURSE_MODULES, isModuleUnlocked } from "../data/modules";
import { formatDuration } from "../lib/progress";

export function CourseShell() {
  const location = useLocation();
  const { user, loading, progress, activeTimerMs, signOut, resetTimer } = useCourse();
  const isLogin = location.pathname === "/learn/login";

  if (isLogin) {
    return <Outlet />;
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background text-muted-foreground">
        Loading course...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const completed = progress?.completedModuleIds ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10 bg-background/80 backdrop-blur sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link to="/learn" className="text-lg font-semibold hover:text-primary transition-colors">
              Research Foundations
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="glass rounded-full px-4 py-2 text-sm flex items-center gap-2">
              <Clock size={14} className="text-cyan-glow" />
              <span>{formatDuration(activeTimerMs)}</span>
              <button
                type="button"
                onClick={() => void resetTimer()}
                className="text-muted-foreground hover:text-foreground"
                title="Restart timer"
              >
                <RotateCcw size={14} />
              </button>
            </div>
            <button
              type="button"
              onClick={() => void signOut()}
              className="rounded-full border border-white/15 px-4 py-2 text-sm inline-flex items-center gap-2 hover:bg-white/5"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="glass rounded-3xl p-4 h-fit lg:sticky lg:top-28">
          <p className="text-xs uppercase tracking-wider text-muted-foreground px-2 mb-3">Modules</p>
          <nav className="space-y-1">
            {COURSE_MODULES.map((module) => {
              const unlocked = isModuleUnlocked(module.id, completed);
              const passed = completed.includes(module.id);
              const active = location.pathname.includes(module.id);

              return (
                <Link
                  key={module.id}
                  to={unlocked ? "/learn/modules/$moduleId" : "/learn"}
                  params={{ moduleId: module.id }}
                  className={[
                    "block rounded-2xl px-3 py-2.5 text-sm transition-colors",
                    active ? "bg-primary/15 text-primary" : "hover:bg-white/5",
                    !unlocked ? "opacity-45 pointer-events-none" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-2">
                    <BookOpen size={14} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium">Module {module.number}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{module.title}</p>
                      {passed && <p className="text-xs text-emerald-400 mt-1">Completed</p>}
                      {!unlocked && <p className="text-xs text-muted-foreground mt-1">Locked</p>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
