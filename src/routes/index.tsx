import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ChevronDown } from "lucide-react";
import { COURSE_MODULES } from "../course/data/modules";
import { useWebsitePageContent } from "../hooks/useWebsitePageContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Axiom — Research Starts with Curiosity" },
      {
        name: "description",
        content:
          "Learn research methods, explore meaningful questions, and find ways to collaborate with Axiom, a student-led nonprofit.",
      },
    ],
  }),
  component: HomePage,
});

const ways = [
  {
    title: "Learn",
    copy: "Practice research methods, evaluate sources, and learn to explain what your evidence actually supports.",
    to: "/course",
    action: "View Research Foundations",
  },
  {
    title: "Collaborate",
    copy: "Explore peer-led projects and learn how to give and use constructive feedback.",
    to: "/programs",
    action: "Explore the programs",
  },
  {
    title: "Contribute",
    copy: "Help build Axiom through volunteer roles in research review, curriculum, and outreach.",
    to: "/volunteer",
    action: "See volunteer opportunities",
  },
] as const;

const steps = [
  [
    "Start with the fundamentals",
    "Learn what makes a question researchable and how to evaluate an existing source.",
  ],
  [
    "Narrow the question",
    "Choose an outcome you can observe, and a comparison that makes the result meaningful.",
  ],
  [
    "Choose a method",
    "Plan what you will measure, collect evidence responsibly, and document your decisions.",
  ],
  [
    "Share what you found",
    "State what the evidence supports, where it falls short, and what you would test next.",
  ],
];

const questions = [
  [
    "Do I need research experience?",
    "No. Research Foundations is designed for high school students who are new to research.",
  ],
  [
    "What does the course include?",
    "Eight self-paced units, timed multiple-choice quizzes, and a final assessment. The syllabus is available on the course page.",
  ],
  [
    "Will I be matched with a mentor?",
    "Mentored research is application-based. A placement depends on availability and is not guaranteed.",
  ],
];

function ResearchNotebook() {
  return (
    <figure className="research-notebook">
      <div className="research-notebook-head">
        <span>Research notebook</span>
        <span>Example study</span>
      </div>
      <div className="research-notebook-content">
        <div className="research-notebook-notes">
          <figcaption>Does extra light change how fast seedlings grow?</figcaption>
          <dl className="research-variables">
            <div>
              <dt>Change</dt>
              <dd>Hours of light</dd>
            </div>
            <div>
              <dt>Measure</dt>
              <dd>Height over time</dd>
            </div>
          </dl>
          <div className="research-schedule" aria-label="Measurement schedule">
            {[1, 4, 7].map((day) => (
              <span key={day}>Day {day}</span>
            ))}
          </div>
        </div>
        <div className="research-plate" aria-hidden="true">
          <svg viewBox="0 0 310 230" fill="none">
            <defs>
              <linearGradient
                id="plate-leaf"
                x1="75"
                y1="28"
                x2="233"
                y2="190"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#d8eea6" />
                <stop offset="1" stopColor="#478579" />
              </linearGradient>
              <pattern id="plate-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M24 0H0v24" stroke="#5c8e8a" strokeOpacity=".3" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="310" height="230" fill="url(#plate-grid)" />
            <path
              d="M42 173h226m-154 0c25-10 57-10 82 0"
              stroke="#4b7773"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M154 170c1-27 8-53 25-79m-24 66c-9-23-22-40-39-54"
              stroke="#356559"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M171 105c-1-35 27-54 68-58-8 38-32 61-68 58ZM132 125c-7-28-31-44-65-45 8 32 29 51 65 45Z"
              fill="url(#plate-leaf)"
              stroke="#356559"
              strokeWidth="1.2"
            />
            <path
              d="M176 101c14-15 32-27 49-42m-98 60c-14-13-28-22-47-31"
              stroke="#356559"
              strokeWidth="1.25"
            />
            <path
              d="M273 170V49m-7 0h14m-14 30h14m-14 30h14m-14 30h14m-14 30h14"
              stroke="#4b7773"
              strokeWidth="1.2"
            />
            <circle cx="239" cy="47" r="4" fill="#356559" />
          </svg>
        </div>
      </div>
      <div className="research-notebook-foot">A research plan, not a result</div>
    </figure>
  );
}

function HomePage() {
  const cms = useWebsitePageContent("home", {
    title: "Research starts with curiosity.",
    sub: "Axiom helps high school students build research skills, explore meaningful questions, and connect with a community of curious learners.",
  });

  return (
    <>
      <section className="home-hero">
        <div className="site-wrap home-hero-copy">
          <h1>{cms.title}</h1>
          <p>{cms.sub}</p>
          <div className="site-actions">
            <Link to="/programs" className="site-button">
              Explore programs <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a href="#how-axiom-works" className="site-text-link">
              How Axiom works <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <ResearchNotebook />
      </section>

      <section className="home-section home-ways">
        <div className="site-wrap">
          <h2>Find your way into research.</h2>
          <div className="home-ways-grid">
            {ways.map(({ title, copy, to, action }) => (
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

      <section className="site-wrap home-section home-split" id="how-axiom-works">
        <div>
          <h2>From a question to something you can test.</h2>
          <p>
            Research isn’t a straight line. These are the steps you’ll practice as you turn an idea
            into a project.
          </p>
        </div>
        <ol className="home-steps">
          {steps.map(([title, body], index) => (
            <li key={title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-course">
        <div className="site-wrap home-section home-split">
          <div>
            <h2>Learn how research actually works.</h2>
            <p>
              Research Foundations is an eight-unit, self-paced course for high school students.
              Read full lessons, check your understanding in timed quizzes, and finish with a final
              assessment.
            </p>
            <div className="site-actions">
              <Link to="/course" className="site-button site-button-light">
                View the course <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="home-curriculum">
            <div className="home-curriculum-head">
              <span>Axiom Learn</span>
              <span>Curriculum preview</span>
            </div>
            <ol>
              {COURSE_MODULES.slice(0, 4).map((module) => (
                <li key={module.id}>
                  <span>{String(module.number).padStart(2, "0")}</span>
                  {module.title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="site-wrap home-section home-split">
        <div>
          <h2>Take your next step.</h2>
          <p>
            Explore the ways students and volunteers can participate today, and see what Axiom is
            still building.
          </p>
        </div>
        <div className="home-steps home-pathways">
          <article>
            <h3>Work with other students</h3>
            <p>
              Explore peer-led collaboration and application-based mentorship. Ask about current
              availability before planning a project.
            </p>
            <Link className="site-text-link" to="/programs">
              View research pathways <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
          <article>
            <h3>Share student research</h3>
            <p>
              Axiom is developing an open research archive. Learn how the team thinks about review
              and sharing student work.
            </p>
            <Link className="site-text-link" to="/research">
              Explore student research <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
          <article>
            <h3>Help run Axiom</h3>
            <p>Find roles in outreach, curriculum, technology, and research review.</p>
            <Link className="site-text-link" to="/careers">
              Browse open roles <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section className="home-section home-ways">
        <div className="site-wrap home-split">
          <div>
            <h2>Before you begin.</h2>
            <Link to="/faq" className="site-text-link">
              Read all FAQs <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="home-questions">
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <ChevronDown size={17} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="site-wrap home-section home-close">
        <h2>Your next question could become your first research project.</h2>
        <div className="site-actions">
          <Link to="/join" className="site-button">
            Join Axiom <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link to="/course" className="site-text-link">
            Explore the course <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
