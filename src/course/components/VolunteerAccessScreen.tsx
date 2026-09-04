import { FormEvent, useState } from "react";
import { useCourse } from "../context/CourseProvider";
import { CourseHeader } from "./CourseHeader";

export function VolunteerAccessScreen() {
  const { grantAccess } = useCourse();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const ok = await grantAccess(code);
      if (!ok) {
        setError("That access password is not valid. Check the code Axiom sent you and try again.");
      }
    } catch {
      setError("We could not verify the access password. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      <CourseHeader user={null} showCourseBadge={false} />
      <main className="mx-auto max-w-lg px-5 py-12 md:py-16">
        <p className="course-kicker">Axiom Research Initiative</p>
        <h1 className="course-serif text-4xl md:text-5xl mt-3 leading-tight">
          Volunteer Course Access
        </h1>
        <p className="mt-4 text-[var(--course-ink-soft)] leading-relaxed">
          Research Foundations is for Axiom volunteers. Enter the access password you received
          before continuing to identification.
        </p>

        <form onSubmit={handleSubmit} className="course-card mt-8 p-6 md:p-8">
          <label htmlFor="volunteer-access-code" className="block text-sm font-medium">
            Access password
          </label>
          <input
            id="volunteer-access-code"
            type="password"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            className="mt-2 w-full rounded-2xl border border-[var(--course-line)] bg-[var(--course-bg)] px-4 py-3 text-sm outline-none focus:border-[var(--course-accent)]"
            placeholder="Enter your access password"
            required
          />
          {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
          <button type="submit" disabled={submitting} className="course-btn-primary mt-6 w-full">
            {submitting ? "Checking..." : "Continue"}
          </button>
        </form>
      </main>
    </div>
  );
}
