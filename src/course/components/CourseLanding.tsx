import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import {
  COURSE_ESTIMATED_LABEL,
  COURSE_MODULES,
  PASSING_SCORE,
} from "../data/modules";
import { useCourse } from "../context/CourseProvider";
import { CourseHeader } from "./CourseHeader";
import { TypewriterPaper } from "./TypewriterPaper";

export function CourseLanding() {
  const navigate = useNavigate();
  const { configured, signInWithGoogle } = useCourse();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleGoogleSignIn() {
    setError("");
    setSubmitting(true);
    try {
      if (!configured) {
        setError("Firebase is not configured yet. Add your VITE_FIREBASE_* keys to .env.");
        return;
      }
      await signInWithGoogle();
      navigate({ to: "/learn/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen">
      <CourseHeader user={null} showCourseBadge={false} />

      <main className="mx-auto max-w-6xl px-5 pb-20">
        <section className="pt-10 md:pt-16 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <p className="course-kicker inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--course-accent)]" />
              Research methods training
            </p>
            <h1 className="course-serif text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.02] mt-4">
              Learn to do research{" "}
              <em className="text-[var(--course-accent-deep)] not-italic">that actually counts.</em>
            </h1>
            <p className="mt-5 text-lg text-[var(--course-ink-soft)] leading-relaxed max-w-xl">
              This course teaches you how to move from a rough idea to a defensible paper. You will
              practice finding real sources, reading studies, designing methods, analyzing data, and
              writing clearly. Volunteers use this training before joining Axiom research projects.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={submitting}
                onClick={() => void handleGoogleSignIn()}
                className="course-btn-primary disabled:opacity-60"
              >
                Begin the course
                <ArrowRight size={16} />
              </button>
              <a href="#syllabus" className="course-btn-secondary">
                View curriculum
              </a>
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={() => void handleGoogleSignIn()}
              className="course-btn-google mt-4"
            >
              <GoogleMark />
              Sign in with Google
            </button>

            {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

            <p className="mt-5 text-sm text-[var(--course-ink-soft)] max-w-lg">
              Sign in with Google so we can track your time and quiz scores automatically. Pass each
              quiz with {Math.round(PASSING_SCORE * 100)}% or higher to unlock the next section.
            </p>
          </div>

          <TypewriterPaper />
        </section>

        <section className="mt-16 grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Required for volunteers",
              body: "Complete every section before being assigned to a research project.",
            },
            {
              title: "From question to paper",
              body: "Methods, statistics, and writing taught the way working researchers practice them.",
            },
            {
              title: "Mastery gated",
              body: `Each quiz unlocks only after you pass the previous one with ${Math.round(PASSING_SCORE * 100)}% or higher.`,
            },
          ].map((item) => (
            <div key={item.title} className="course-card p-5">
              <p className="text-[var(--course-accent-deep)] text-lg mb-2">✦</p>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-[var(--course-ink-soft)] mt-2 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </section>

        <section id="syllabus" className="mt-20">
          <p className="course-kicker">Syllabus</p>
          <h2 className="course-serif text-4xl md:text-5xl mt-2">
            Eight units. One coherent training.
          </h2>
          <p className="text-[var(--course-ink-soft)] mt-3 max-w-2xl">
            Built for high school students with no prior research experience. Plan about{" "}
            {COURSE_ESTIMATED_LABEL} total including quizzes and short activities.
          </p>

          <div className="mt-8 space-y-3">
            {COURSE_MODULES.map((module) => (
              <div key={module.id} className="course-module-row">
                <div className="w-9 h-9 rounded-full border border-[var(--course-line)] grid place-items-center shrink-0 text-sm font-semibold">
                  {module.number}
                </div>
                <div>
                  <p className="font-semibold">{module.title}</p>
                  <p className="text-sm text-[var(--course-ink-soft)] italic">{module.tagline}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              type="button"
              disabled={submitting}
              onClick={() => void handleGoogleSignIn()}
              className="course-btn-primary disabled:opacity-60"
            >
              Sign in and start
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <footer className="mt-20 pt-8 border-t border-[var(--course-line)] text-center text-sm text-[var(--course-ink-soft)]">
          © {new Date().getFullYear()} Axiom Research Initiative
        </footer>
      </main>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.203 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 6.053 29.082 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.64 6.053 29.082 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}
