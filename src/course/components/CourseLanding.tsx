import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { COURSE_MODULES } from "../data/modules";
import { CourseHeader } from "./CourseHeader";

export function CourseLanding() {
  return (
    <div className="min-h-screen">
      <CourseHeader user={null} showCourseBadge={false} />
      <main className="site-wrap course-overview">
        <section className="course-overview-head">
          <div>
            <h1>Research Foundations</h1>
            <p>
              Learn to turn a rough idea into a research question, choose a method, and write about
              what you find.
            </p>
            <div className="site-actions">
              <Link to="/learn/dashboard" className="course-btn-primary">
                Open your dashboard <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a href="#syllabus" className="site-text-link">
                View curriculum
              </a>
            </div>
          </div>
          <dl className="course-overview-facts">
            <div>
              <dt>Format</dt>
              <dd>{COURSE_MODULES.length} self-paced units</dd>
            </div>
            <div>
              <dt>Pace</dt>
              <dd>Work through one unit at a time</dd>
            </div>
            <div>
              <dt>Prerequisites</dt>
              <dd>No prior research experience</dd>
            </div>
            <div>
              <dt>Assessment</dt>
              <dd>Unit quizzes and a final exam</dd>
            </div>
          </dl>
        </section>
        <section className="course-overview-body" id="syllabus">
          <h2>Curriculum</h2>
          <p>
            Each unit includes a lesson, key terms, and a timed multiple-choice quiz. Score 80% to
            unlock the next unit. If you retake a quiz, the maximum recorded score is 80%.
          </p>
          <ol className="course-syllabus">
            {COURSE_MODULES.map(({ id, number, title, tagline }) => (
              <li key={id}>
                <span>{String(number).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{tagline}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  );
}
