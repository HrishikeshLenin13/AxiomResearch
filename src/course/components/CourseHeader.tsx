import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { BookOpen, ChevronDown } from "lucide-react";
import { useCourse } from "../context/CourseProvider";

type CourseHeaderUser = {
  email?: string | null;
  displayName?: string | null;
} | null;

type CourseHeaderProps = {
  user: CourseHeaderUser;
  onSignOut?: () => void;
  showCourseBadge?: boolean;
  homeTo?: "/learn" | "/learn/dashboard";
};

export function CourseHeader({ user, showCourseBadge = true, homeTo = "/learn" }: CourseHeaderProps) {
  const navigate = useNavigate();
  const { quizSessionActive, setQuizSessionActive, volunteer, switchVolunteer } = useCourse();
  const [idOpen, setIdOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const displayLabel = volunteer
    ? `${volunteer.firstName} ${volunteer.lastName}`.trim()
    : user?.email || user?.displayName || "";

  useEffect(() => {
    if (!idOpen) return;
    function onPointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIdOpen(false);
      }
    }
    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, [idOpen]);

  function goHome() {
    if (
      quizSessionActive &&
      !window.confirm("Leave this quiz? Your answers for this attempt may be deleted.")
    ) {
      return;
    }
    setQuizSessionActive(false);
    navigate({ to: homeTo });
  }

  async function copyVolunteerId() {
    if (!volunteer?.volunteerId) return;
    try {
      await navigator.clipboard.writeText(volunteer.volunteerId);
    } catch {
      // Clipboard may be unavailable; the ID is still visible.
    }
  }

  return (
    <header className="border-b border-[var(--course-line)] bg-[var(--course-bg)]/90 backdrop-blur-sm sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between gap-4">
        <button type="button" onClick={goHome} className="flex items-center gap-2.5 group min-w-0 text-left">
          <BookOpen size={18} className="text-[var(--course-accent-deep)] shrink-0" />
          <span className="font-semibold tracking-tight truncate">Research Foundations</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3 text-sm shrink-0">
          {showCourseBadge ? (
            <span className="hidden md:inline-flex rounded-full border border-[var(--course-line)] px-3 py-1 text-[var(--course-ink-soft)]">
              Course
            </span>
          ) : null}
          {displayLabel && volunteer ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIdOpen((open) => !open)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--course-line)] px-3 py-1.5 text-[var(--course-ink)] hover:bg-[var(--course-paper)] transition max-w-[220px]"
                aria-expanded={idOpen}
                aria-haspopup="true"
              >
                <span className="truncate">{displayLabel}</span>
                <ChevronDown size={14} className="shrink-0 text-[var(--course-ink-soft)]" />
              </button>
              {idOpen ? (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-[var(--course-line)] bg-[var(--course-bg)] shadow-lg p-4 z-40">
                  <p className="text-xs uppercase tracking-wide text-[var(--course-ink-soft)]">
                    Your Volunteer ID
                  </p>
                  <p className="mt-2 font-mono text-sm font-semibold break-all">{volunteer.volunteerId}</p>
                  <p className="mt-2 text-xs text-[var(--course-ink-soft)] leading-relaxed">
                    Save this ID. You need it to resume the course on another visit.
                  </p>
                  <button
                    type="button"
                    onClick={() => void copyVolunteerId()}
                    className="mt-3 course-btn-secondary !py-2 !px-4 !text-xs w-full"
                  >
                    Copy ID
                  </button>
                </div>
              ) : null}
            </div>
          ) : displayLabel ? (
            <span className="hidden sm:inline text-[var(--course-ink-soft)] truncate max-w-[180px]">
              {displayLabel}
            </span>
          ) : null}
          {volunteer ? (
            <button
              type="button"
              onClick={switchVolunteer}
              className="hidden sm:inline text-xs text-[var(--course-ink-soft)] hover:text-[var(--course-ink)]"
            >
              Switch volunteer
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
