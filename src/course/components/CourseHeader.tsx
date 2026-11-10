import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { AxiomMark } from "../../components/AxiomMark";
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

export function CourseHeader({
  user,
  showCourseBadge = true,
  homeTo = "/learn",
}: CourseHeaderProps) {
  const navigate = useNavigate();
  const { quizSessionActive, setQuizSessionActive, volunteer, switchVolunteer } = useCourse();
  const [idOpen, setIdOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const accountTrigger = useRef<HTMLButtonElement>(null);
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
    function dismiss(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIdOpen(false);
      accountTrigger.current?.focus();
    }
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", dismiss);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", dismiss);
    };
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
    <header className="course-header">
      <div className="site-wrap course-header-inner">
        <button
          type="button"
          onClick={goHome}
          className="flex items-center gap-2.5 group min-w-0 text-left"
        >
          <AxiomMark size={25} className="shrink-0" />
          <span className="font-semibold tracking-tight whitespace-nowrap">Axiom Learn</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3 text-sm shrink-0">
          {showCourseBadge ? (
            <span className="hidden md:inline-flex rounded-full border border-[var(--course-line)] px-3 py-1 text-[var(--course-ink-soft)]">
              Research Foundations
            </span>
          ) : null}
          {displayLabel && volunteer ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                ref={accountTrigger}
                onClick={() => setIdOpen((open) => !open)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--course-line)] px-3 py-1.5 text-[var(--course-ink)] hover:bg-[var(--course-paper)] transition max-w-[min(36vw,220px)] min-h-11"
                aria-expanded={idOpen}
                aria-controls="course-account"
              >
                <span className="truncate">{displayLabel}</span>
                <ChevronDown size={14} className="shrink-0 text-[var(--course-ink-soft)]" />
              </button>
              <div id="course-account" hidden={!idOpen} className="course-account-panel">
                <p className="text-xs uppercase tracking-wide text-[var(--course-ink-soft)]">
                  Your Volunteer ID
                </p>
                <p className="mt-2 font-mono text-sm font-semibold break-all">
                  {volunteer.volunteerId}
                </p>
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
                <button
                  type="button"
                  onClick={() => {
                    if (
                      quizSessionActive &&
                      !window.confirm(
                        "Leave this quiz? Your answers for this attempt may be deleted.",
                      )
                    )
                      return;
                    setQuizSessionActive(false);
                    setIdOpen(false);
                    switchVolunteer();
                  }}
                  className="mt-2 course-btn-secondary w-full"
                >
                  Switch volunteer
                </button>
              </div>
            </div>
          ) : displayLabel ? (
            <span className="hidden sm:inline text-[var(--course-ink-soft)] truncate max-w-[180px]">
              {displayLabel}
            </span>
          ) : null}
        </div>
      </div>
    </header>
  );
}
