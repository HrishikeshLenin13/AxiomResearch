import { createFileRoute } from "@tanstack/react-router";
import { CmsPageHero } from "../components/CmsPageHero";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Internships — Axiom" },
      {
        name: "description",
        content:
          "Open internship and leadership roles at Axiom — marketing, outreach, curriculum, engineering, and more.",
      },
    ],
  }),
  component: CareersPage,
});

const roles = [
  {
    t: "Marketing Intern",
    team: "Growth",
    loc: "Remote",
    time: "Part-time",
    d: "Shape Axiom's voice across channels. Write, design, and support student outreach campaigns.",
  },
  {
    t: "Outreach Intern",
    team: "Community",
    loc: "Remote",
    time: "Part-time",
    d: "Build relationships with schools, clubs, and educators across regions.",
  },
  {
    t: "Research Reviewer",
    team: "Editorial",
    loc: "Remote",
    time: "Flexible",
    d: "Evaluate student submissions for rigor, originality, and clarity.",
  },
  {
    t: "Curriculum Developer",
    team: "Education",
    loc: "Remote",
    time: "Part-time",
    d: "Author and refine the Foundations curriculum modules with our education leads.",
  },
  {
    t: "Web Developer",
    team: "Engineering",
    loc: "Remote",
    time: "Part-time",
    d: "Improve Axiom’s website, research archive, and student dashboards.",
  },
  {
    t: "HR & Recruitment",
    team: "Operations",
    loc: "Remote",
    time: "Part-time",
    d: "Support hiring cycles, onboarding, and team operations for a remote student organization.",
  },
  {
    t: "Social Media Manager",
    team: "Growth",
    loc: "Remote",
    time: "Flexible",
    d: "Run Axiom's social presence — content, community, and creator partnerships.",
  },
  {
    t: "Research Team Lead",
    team: "Research",
    loc: "Remote",
    time: "Semester",
    d: "Lead an interdisciplinary student research group from question to publication.",
  },
];

function CareersPage() {
  return (
    <>
      <CmsPageHero
        pageKey="careers"
        eyebrow="Careers and internships"
        fallbackTitle="Work with the Axiom team."
        fallbackTitleText="Work with the Axiom team."
        fallbackSub="Explore remote roles across outreach, education, research, and operations. Contact the team to confirm current openings."
      />
      <section className="site-wrap site-page-body" aria-label="Roles at Axiom">
        <div className="site-editorial-list">
          {roles.map(({ t, team, loc, time, d }) => (
            <article key={t}>
              <div>
                <h2>{t}</h2>
                <p className="site-row-status">{team}</p>
              </div>
              <div>
                <p>{d}</p>
                <p className="mt-2 text-sm">
                  {loc} · {time}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="site-actions">
          <a href="mailto:axiomresearchteam@gmail.com" className="site-button">
            Email Axiom about a role <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
