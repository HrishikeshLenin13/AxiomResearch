import { CourseHeader } from "./CourseHeader";

type VolunteerIdRevealScreenProps = {
  volunteerId: string;
  firstName: string;
  lastName: string;
  onContinue: () => void;
};

export function VolunteerIdRevealScreen({
  volunteerId,
  firstName,
  lastName,
  onContinue,
}: VolunteerIdRevealScreenProps) {
  return (
    <div className="min-h-screen">
      <CourseHeader user={null} showCourseBadge={false} />
      <main className="mx-auto max-w-lg px-5 py-12 md:py-16">
        <p className="course-kicker">Welcome, {firstName}</p>
        <h1 className="course-serif text-4xl md:text-5xl mt-3 leading-tight">Save your Volunteer ID</h1>
        <p className="mt-4 text-[var(--course-ink-soft)] leading-relaxed">
          We created a unique ID for {firstName} {lastName}. You need this ID to continue the course
          next time.
        </p>

        <div className="course-card mt-8 p-6 md:p-8 text-center space-y-4">
          <p className="text-sm text-[var(--course-ink-soft)]">Your Volunteer ID is</p>
          <p className="text-3xl md:text-4xl font-semibold font-mono tracking-wide text-[var(--course-accent-deep)]">
            {volunteerId}
          </p>
          <p className="text-sm font-medium text-[var(--course-ink)]">
            Save this ID — write it down or take a screenshot.
          </p>
          <p className="text-xs text-[var(--course-ink-soft)]">
            This is not your access password. You will enter this ID when you return to the course.
          </p>
          <button type="button" onClick={onContinue} className="course-btn-primary w-full mt-2">
            Continue to the course
          </button>
        </div>
      </main>
    </div>
  );
}
