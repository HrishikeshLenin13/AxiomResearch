import { Link } from "@tanstack/react-router";
import { BookOpen, ExternalLink, LogOut } from "lucide-react";
import type { User } from "firebase/auth";
import { getAxiomWebsiteUrl } from "../lib/website-link";

type CourseHeaderProps = {
  user: User | null;
  onSignOut?: () => void;
  showCourseBadge?: boolean;
  homeTo?: "/learn" | "/learn/dashboard";
};

export function CourseHeader({ user, onSignOut, showCourseBadge = true, homeTo = "/learn" }: CourseHeaderProps) {
  const websiteUrl = getAxiomWebsiteUrl();
  const isExternalWebsite = websiteUrl.startsWith("http");

  return (
    <header className="border-b border-[var(--course-line)] bg-[var(--course-bg)]/90 backdrop-blur-sm sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-4">
        <Link to={homeTo} className="flex items-center gap-2.5 group min-w-0">
          <BookOpen size={18} className="text-[var(--course-accent-deep)] shrink-0" />
          <span className="font-semibold tracking-tight truncate">Axiom Research Initiative</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 text-sm shrink-0">
          {isExternalWebsite ? (
            <a
              href={websiteUrl}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--course-line)] px-3 py-1.5 hover:bg-[var(--course-paper)] text-[var(--course-ink-soft)] hover:text-[var(--course-ink)]"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Return to website</span>
              <span className="sm:hidden">Website</span>
            </a>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--course-line)] px-3 py-1.5 hover:bg-[var(--course-paper)] text-[var(--course-ink-soft)] hover:text-[var(--course-ink)]"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Return to website</span>
              <span className="sm:hidden">Website</span>
            </Link>
          )}

          {showCourseBadge ? (
            <span className="hidden md:inline-flex rounded-full border border-[var(--course-line)] px-3 py-1 text-[var(--course-ink-soft)]">
              Course
            </span>
          ) : null}
          {user ? (
            <>
              <span className="hidden lg:inline text-[var(--course-ink-soft)] truncate max-w-[180px]">
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
