import { useNavigate } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import type { User } from "firebase/auth";
import { useCourse } from "../context/CourseProvider";

type CourseHeaderProps = {
  user: User | null;
  onSignOut?: () => void;
  showCourseBadge?: boolean;
  homeTo?: "/learn" | "/learn/dashboard";
};

export function CourseHeader({ user, showCourseBadge = true, homeTo = "/learn" }: CourseHeaderProps) {
  const navigate = useNavigate();
  const { quizSessionActive, setQuizSessionActive } = useCourse();

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
          {user?.email ? (
            <span className="hidden lg:inline text-[var(--course-ink-soft)] truncate max-w-[180px]">
              {user.email}
            </span>
          ) : null}
        </div>
      </div>
    </header>
  );
}
