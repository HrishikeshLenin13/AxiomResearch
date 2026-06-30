import { Link } from "@tanstack/react-router";
import { BookOpen, LogOut } from "lucide-react";
import type { User } from "firebase/auth";

type CourseHeaderProps = {
  user: User | null;
  onSignOut?: () => void;
  showCourseBadge?: boolean;
  homeTo?: "/learn" | "/learn/dashboard";
};

export function CourseHeader({ user, onSignOut, showCourseBadge = true, homeTo = "/learn" }: CourseHeaderProps) {
  return (
    <header className="border-b border-[var(--course-line)] bg-[var(--course-bg)]/90 backdrop-blur-sm sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-4">
        <Link to={homeTo} className="flex items-center gap-2.5 group">
          <BookOpen size={18} className="text-[var(--course-accent-deep)]" />
          <span className="font-semibold tracking-tight">Axiom Research Initiative</span>
        </Link>

        <div className="flex items-center gap-3 text-sm">
          {showCourseBadge ? (
            <span className="hidden sm:inline-flex rounded-full border border-[var(--course-line)] px-3 py-1 text-[var(--course-ink-soft)]">
              Course
            </span>
          ) : null}
          {user ? (
            <>
              <span className="hidden md:inline text-[var(--course-ink-soft)] truncate max-w-[220px]">
                {user.email}
              </span>
              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--course-line)] px-3 py-1.5 hover:bg-[var(--course-paper)]"
                aria-label="Sign out"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
