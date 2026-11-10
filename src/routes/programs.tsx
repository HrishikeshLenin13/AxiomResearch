import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CmsPageHero } from "../components/CmsPageHero";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Axiom" },
      {
        name: "description",
        content:
          "Explore Research Foundations, mentored research, peer collaboration, and Axiom’s developing research archive.",
      },
    ],
  }),
  component: ProgramsPage,
});

const programs = [
  {
    title: "Research Foundations",
    status: "Self-paced course",
    description:
      "Learn to develop a research question, evaluate sources, choose a method, and communicate your findings. The eight-unit course is built for high school students new to research.",
    action: "View the course and access requirements",
    to: "/course",
  },
  {
    title: "Mentored Research",
    status: "Application-based",
    description:
      "A pathway for students who want to develop an original project with guidance. Ask about current openings and requirements before planning around a placement.",
    action: "Ask about availability",
    to: "/contact",
  },
  {
    title: "Collaborative Research Teams",
    status: "Peer-led",
    description:
      "Explore working in a team across disciplines, giving and receiving feedback, and building a project together. Contact Axiom about team availability.",
    action: "Ask about joining a team",
    to: "/contact",
  },
  {
    title: "Open Research Database",
    status: "In development",
    description:
      "Axiom is building a free, searchable archive for reviewed student work. Papers will be listed after submissions have been received, reviewed, and approved.",
    action: "Read about the archive",
    to: "/research",
  },
] as const;

function ProgramsPage() {
  return (
    <>
      <CmsPageHero
        pageKey="programs"
        eyebrow="Programs"
        fallbackTitle="Find a research pathway."
        fallbackTitleText="Find a research pathway."
        fallbackSub="Start with the fundamentals, or explore ways to develop a project with other students."
      />
      <section className="site-wrap site-page-body" aria-label="Axiom programs">
        <div className="site-editorial-list">
          {programs.map(({ title, status, description, action, to }) => (
            <article key={title}>
              <div>
                <h2>{title}</h2>
                <p className="site-row-status">{status}</p>
              </div>
              <div>
                <p>{description}</p>
                <Link to={to} className="site-text-link">
                  {action} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
