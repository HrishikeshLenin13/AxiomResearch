import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { COURSE_ESTIMATED_LABEL, COURSE_MODULES } from "../data/modules";
import { CourseHeader } from "./CourseHeader";
import { TypewriterPaper } from "./TypewriterPaper";

export function CourseLanding() {
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
              This course teaches you how to move from a rough idea to a defensible paper. Pass each
              multiple-choice quiz to unlock the next unit, then submit the course with a final exam.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/learn/dashboard" className="course-btn-primary">
                Begin the course
                <ArrowRight size={16} />
              </Link>
              <a href="#syllabus" className="course-btn-secondary">
                View curriculum
              </a>
            </div>

            <p className="mt-5 text-sm text-[var(--course-ink-soft)] max-w-lg">
              Units stay locked until you pass the previous quiz with 80%. Retakes are allowed, with
              a recorded-score cap of 80% after the first attempt.
            </p>
          </div>

          <TypewriterPaper />
        </section>

        <section className="mt-16 grid md:grid-cols-3 gap-5">
          {[
            {
              title: "From question to paper",
              body: "Methods, statistics, and writing taught the way working researchers practice them.",
            },
            {
              title: "Full lessons, not outlines",
              body: "Each unit includes a full lesson, key terms, and a timed multiple-choice quiz.",
            },
            {
              title: "Built for students",
              body: `Plan about ${COURSE_ESTIMATED_LABEL}. Work at your own pace, unit by unit.`,
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
            Built for high school students with no prior research experience.
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
            <Link to="/learn/dashboard" className="course-btn-primary">
              Open the dashboard
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
