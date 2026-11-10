import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";
import { COURSE_MODULES, PASSING_SCORE } from "../course/data/modules";
import { useWebsitePageContent } from "../hooks/useWebsitePageContent";
import { PUBLIC_PROGRAMS } from "../lib/public-programs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Axiom — Research for High School Students" },
      {
        name: "description",
        content:
          "Axiom is a student-led nonprofit. Explore the Research Foundations course, mentored research, peer teams, and volunteer opportunities for high school students.",
      },
    ],
  }),
  component: HomePage,
});

const participation = [
  {
    title: "I’m new to research",
    copy: "Read the syllabus first. If you want to participate, fill out the Axiom application and contact the team if you need a course access code.",
    to: "/join",
    action: "How to apply",
  },
  {
    title: "I want to work on a project",
    copy: "Bring a question or a topic you’re interested in. Ask Axiom about peer teams or current mentor availability before planning around a placement.",
    to: "/programs",
    action: "Compare research pathways",
  },
  {
    title: "I want to volunteer",
    copy: "Review student work, support newer researchers, or help with outreach and curriculum. Ask the team about open roles and service-hour documentation.",
    to: "/volunteer",
    action: "See volunteer roles",
  },
] as const;

const questions = [
  {
    question: "Who is this for, and what does it cost?",
    answer:
      "Axiom is designed for high school students. Research Foundations assumes no prior research experience, and Axiom’s core programs are free for participating students.",
  },
  {
    question: "Can I start the course right away?",
    answer:
      "Anyone can read the syllabus. The lessons and quizzes are in Axiom Learn, which requires an Axiom volunteer access code. Returning volunteers use their Volunteer ID to resume.",
  },
  {
    question: "Will I get a mentor or publish a paper?",
    answer:
      "Neither is guaranteed. Mentored Research is application-based, and matching depends on availability. The student research archive is still in development, and work would need to be reviewed and approved before listing.",
  },
];

function ProgramOverview() {
  return (
    <section className="home-offerings" aria-labelledby="home-offerings-title">
      <h2 id="home-offerings-title">What Axiom offers</h2>
      <ul>
        {PUBLIC_PROGRAMS.map(({ id, title, summary, status, to }) => (
          <li key={id} className="home-offering">
            <div>
              <div className="home-offering-title">
                <h3>
                  <Link
                    to={to === "/contact" ? "/programs" : to}
                    hash={to === "/contact" ? id : undefined}
                    aria-describedby={`home-status-${id} home-summary-${id}`}
                  >
                    {title}
                  </Link>
                </h3>
                <span className="home-offering-status" id={`home-status-${id}`}>
                  {id === "research-foundations" ? "Access code required" : status}
                </span>
              </div>
              <p id={`home-summary-${id}`}>{summary}</p>
            </div>
            <ArrowRight size={17} aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  );
}

function HomePage() {
  const cms = useWebsitePageContent("home", {
    title: "Research for high school students.",
    sub: "Axiom is a student-led nonprofit. Learn to evaluate sources, design a study, and write a paper. Then explore peer teams or apply for mentorship.",
  });

  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="site-wrap home-intro">
          <div className="home-hero-copy">
            <h1 id="home-title">{cms.title}</h1>
            <p>{cms.sub}</p>
            <div className="site-actions">
              <Link to="/course" className="site-button">
                View course <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link to="/join" className="site-text-link">
                How to apply <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <ul className="home-eligibility" aria-label="At a glance">
              <li>Free core programs</li>
              <li>No prior experience for the course</li>
            </ul>
          </div>
          <ProgramOverview />
        </div>
      </section>

      <section className="home-course" aria-labelledby="home-course-title">
        <div className="site-wrap home-section home-split">
          <div>
            <h2 id="home-course-title">Inside Research Foundations</h2>
            <p>
              Start by learning how to judge a source and turn a broad interest into a question you
              can investigate. Work through study design and analysis, then learn to communicate
              what you found and use AI responsibly.
            </p>
            <dl className="home-course-facts">
              <div>
                <dt>Format</dt>
                <dd>
                  {COURSE_MODULES.length} self-paced lessons, timed unit quizzes, and a final exam.
                </dd>
              </div>
              <div>
                <dt>Progress</dt>
                <dd>
                  Score {Math.round(PASSING_SCORE * 100)}% on a unit quiz to unlock the next lesson.
                </dd>
              </div>
              <div>
                <dt>Access</dt>
                <dd>Public syllabus; Axiom volunteer access code required for lessons.</dd>
              </div>
            </dl>
            <div className="site-actions">
              <Link to="/course" className="site-button site-button-light">
                View syllabus and access details <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="home-curriculum">
            <h3 className="home-curriculum-head">Course curriculum</h3>
            <ol>
              {COURSE_MODULES.map(({ id, number, title }) => (
                <li key={id}>
                  <span aria-hidden="true">{String(number).padStart(2, "0")}</span>
                  {title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section
        className="site-wrap home-section home-split"
        id="how-axiom-works"
        aria-labelledby="home-project-title"
      >
        <div>
          <h2 id="home-project-title">How a student project takes shape</h2>
          <p>
            Axiom’s course gives you the methods. Peer teams and mentorship are ways to use them on
            a project.
          </p>
          <Link to="/about" className="site-text-link">
            Why Axiom exists <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ol className="home-steps">
          <li>
            <span aria-hidden="true">01</span>
            <div>
              <h3>Find a question worth testing</h3>
              <p>
                Read existing work, narrow your topic, and say exactly what you want to find out.
              </p>
            </div>
          </li>
          <li>
            <span aria-hidden="true">02</span>
            <div>
              <h3>Plan and carry out the research</h3>
              <p>
                Choose what evidence to gather and how to compare it. On a team, divide the work and
                agree on how to document it.
              </p>
            </div>
          </li>
          <li>
            <span aria-hidden="true">03</span>
            <div>
              <h3>Use feedback to improve the work</h3>
              <p>
                Ask peers to challenge your conclusions, revise your draft, and explain what the
                evidence does and doesn’t support.
              </p>
              <Link to="/research" className="site-text-link">
                Read about sharing student research <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </li>
        </ol>
      </section>

      <section className="home-section home-ways" aria-labelledby="home-participation-title">
        <div className="site-wrap">
          <h2 id="home-participation-title">Where to start</h2>
          <div className="home-ways-grid">
            {participation.map(({ title, copy, to, action }) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
                <Link to={to} className="site-text-link">
                  {action} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-wrap home-section home-split" aria-labelledby="home-questions-title">
        <div>
          <h2 id="home-questions-title">Common questions</h2>
          <Link to="/faq" className="site-text-link">
            Read all FAQs <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="home-questions">
          {questions.map(({ question, answer }) => (
            <details key={question}>
              <summary>
                {question}
                <ChevronDown size={17} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="home-section home-close" aria-labelledby="home-join-title">
        <div className="site-wrap">
          <h2 id="home-join-title">Join Axiom</h2>
          <p>Apply to get involved, or ask the team which opportunity is the best fit for you.</p>
          <div className="site-actions">
            <Link to="/join" className="site-button">
              See how to apply <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="site-text-link">
              Contact the team <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
