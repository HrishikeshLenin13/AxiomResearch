import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CmsPageHero } from "../components/CmsPageHero";
import { COURSE_MODULES, PASSING_SCORE } from "../course/data/modules";
import { getCourseEntryUrl, isExternalCourseUrl } from "../lib/course-entry";

export const Route = createFileRoute("/course")({
  head: () => ({
    meta: [
      { title: "Research Foundations Course — Axiom" },
      {
        name: "description",
        content:
          "Preview the eight-unit Research Foundations course for high school students: lessons, quizzes, and a final assessment.",
      },
    ],
  }),
  component: CoursePreviewPage,
});

function CourseEntry() {
  const label = (
    <>
      Open Axiom Learn <ArrowRight size={17} aria-hidden="true" />
    </>
  );
  if (isExternalCourseUrl())
    return (
      <a href={getCourseEntryUrl()} className="site-button">
        {label}
      </a>
    );
  return (
    <Link to="/learn" className="site-button">
      {label}
    </Link>
  );
}

function CoursePreviewPage() {
  return (
    <>
      <CmsPageHero
        pageKey="course"
        eyebrow="Course"
        fallbackTitle="Research Foundations."
        fallbackTitleText="Research Foundations."
        fallbackSub="An eight-unit course for high school students on turning a question into a research project. No prior research experience needed."
      />
      <section
        className="site-wrap site-page-body home-split"
        aria-labelledby="course-preview-title"
      >
        <div className="site-copy">
          <h2 className="site-subheading" id="course-preview-title">
            How the course works
          </h2>
          <p>
            Read the lessons at your own pace. Score {Math.round(PASSING_SCORE * 100)}% on each
            timed quiz to unlock the next unit, then take the final exam.
          </p>
          <p>
            You’ll need an Axiom volunteer access code to enter the learning workspace. Returning
            volunteers use their Volunteer ID to resume.
          </p>
          <div className="site-actions">
            <CourseEntry />
            <Link to="/contact" className="site-text-link">
              Ask about access
            </Link>
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-xl font-semibold">Curriculum</h2>
          <ol className="site-curriculum">
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
        </div>
      </section>
    </>
  );
}
