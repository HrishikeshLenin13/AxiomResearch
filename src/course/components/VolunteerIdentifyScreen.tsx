import { FormEvent, useState } from "react";
import { useCourse } from "../context/CourseProvider";
import { CourseHeader } from "./CourseHeader";
import { VolunteerIdRevealScreen } from "./VolunteerIdRevealScreen";

type FlowMode = "choose" | "new" | "returning" | "reveal";

export function VolunteerIdentifyScreen() {
  const { registerNewVolunteer, resumeVolunteer } = useCourse();
  const [mode, setMode] = useState<FlowMode>("choose");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [volunteerId, setVolunteerId] = useState("");
  const [revealedId, setRevealedId] = useState("");
  const [pendingIdentity, setPendingIdentity] = useState<{ firstName: string; lastName: string } | null>(
    null,
  );
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleNewSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await registerNewVolunteer(firstName, lastName);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setRevealedId(result.volunteerId);
      setPendingIdentity({ firstName: result.firstName, lastName: result.lastName });
      setMode("reveal");
    } catch {
      setError("We could not create your volunteer record. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReturning(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await resumeVolunteer(volunteerId);
      if (!result.ok) setError(result.error);
    } catch {
      setError("We could not load your volunteer record. Check your ID and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleContinueAfterReveal() {
    void resumeVolunteer(revealedId);
  }

  if (mode === "reveal" && revealedId && pendingIdentity) {
    return (
      <VolunteerIdRevealScreen
        volunteerId={revealedId}
        firstName={pendingIdentity.firstName}
        lastName={pendingIdentity.lastName}
        onContinue={handleContinueAfterReveal}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <CourseHeader user={null} showCourseBadge={false} />
      <main className="mx-auto max-w-lg px-5 py-12 md:py-16">
        <p className="course-kicker">Volunteer identification</p>
        <h1 className="course-serif text-4xl md:text-5xl mt-3 leading-tight">
          {mode === "choose" ? "How are you joining?" : mode === "new" ? "Sign up" : "Welcome back"}
        </h1>
        <p className="mt-4 text-[var(--course-ink-soft)] leading-relaxed">
          {mode === "choose"
            ? "First time here? We will create a Volunteer ID for you. Returning? Enter the ID you saved."
            : mode === "new"
              ? "Enter your name. We will generate a unique Volunteer ID for you to save."
              : "Enter the Volunteer ID you saved when you first signed up."}
        </p>

        {mode === "choose" ? (
          <div className="course-card mt-8 p-6 md:p-8 space-y-3">
            <button
              type="button"
              onClick={() => {
                setError("");
                setMode("new");
              }}
              className="course-btn-primary w-full"
            >
              New volunteer
            </button>
            <button
              type="button"
              onClick={() => {
                setError("");
                setMode("returning");
              }}
              className="w-full rounded-2xl border border-[var(--course-line)] bg-[var(--course-bg)] px-4 py-3 text-sm font-medium hover:border-[var(--course-accent)] transition"
            >
              Returning — enter your ID
            </button>
          </div>
        ) : null}

        {mode === "new" ? (
          <form onSubmit={handleNewSignup} className="course-card mt-8 p-6 md:p-8 space-y-4">
            <div>
              <label htmlFor="volunteer-first-name" className="block text-sm font-medium">
                First name
              </label>
              <input
                id="volunteer-first-name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoComplete="given-name"
                className="mt-2 w-full rounded-2xl border border-[var(--course-line)] bg-[var(--course-bg)] px-4 py-3 text-sm outline-none focus:border-[var(--course-accent)]"
                required
              />
            </div>
            <div>
              <label htmlFor="volunteer-last-name" className="block text-sm font-medium">
                Last name
              </label>
              <input
                id="volunteer-last-name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                autoComplete="family-name"
                className="mt-2 w-full rounded-2xl border border-[var(--course-line)] bg-[var(--course-bg)] px-4 py-3 text-sm outline-none focus:border-[var(--course-accent)]"
                required
              />
            </div>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button type="submit" disabled={submitting} className="course-btn-primary w-full">
              {submitting ? "Creating your ID..." : "Create my Volunteer ID"}
            </button>
            <button
              type="button"
              onClick={() => {
                setError("");
                setMode("choose");
              }}
              className="w-full text-sm text-[var(--course-ink-soft)] hover:text-[var(--course-ink)]"
            >
              Back
            </button>
          </form>
        ) : null}

        {mode === "returning" ? (
          <form onSubmit={handleReturning} className="course-card mt-8 p-6 md:p-8 space-y-4">
            <div>
              <label htmlFor="volunteer-id" className="block text-sm font-medium">
                Volunteer ID
              </label>
              <input
                id="volunteer-id"
                value={volunteerId}
                onChange={(event) => setVolunteerId(event.target.value)}
                autoComplete="off"
                spellCheck={false}
                placeholder="AX-2026-0042"
                className="mt-2 w-full rounded-2xl border border-[var(--course-line)] bg-[var(--course-bg)] px-4 py-3 text-sm outline-none focus:border-[var(--course-accent)]"
                required
              />
              <p className="mt-2 text-xs text-[var(--course-ink-soft)]">
                This is the ID we showed you when you signed up — not your access password.
              </p>
            </div>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button type="submit" disabled={submitting} className="course-btn-primary w-full">
              {submitting ? "Loading..." : "Continue to the course"}
            </button>
            <button
              type="button"
              onClick={() => {
                setError("");
                setMode("choose");
              }}
              className="w-full text-sm text-[var(--course-ink-soft)] hover:text-[var(--course-ink)]"
            >
              Back
            </button>
          </form>
        ) : null}
      </main>
    </div>
  );
}
