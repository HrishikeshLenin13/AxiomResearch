import { createFileRoute, Link } from "@tanstack/react-router";
import { CmsPageHero } from "../components/CmsPageHero";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer — Axiom" },
      {
        name: "description",
        content:
          "Volunteer with Axiom — reviewers, ambassadors, mentors, and leadership pathways for students who want to give back.",
      },
    ],
  }),
  component: VolunteerPage,
});

const roles = [
  {
    t: "Research Reviewer",
    d: "Read and evaluate student submissions for rigor, originality, and clarity. Training provided.",
  },
  {
    t: "Peer Mentor",
    d: "Support newer Foundations students through their first research projects.",
  },
  {
    t: "Student Ambassador",
    d: "Run an Axiom chapter at your school. Organize workshops, recruit, build community.",
  },
  {
    t: "Leadership Pathway",
    d: "Step into program lead, regional coordinator, or core team roles after 1+ semester active.",
  },
];

function VolunteerPage() {
  return (
    <>
      <CmsPageHero
        pageKey="volunteer"
        eyebrow="Volunteer"
        fallbackTitle="Volunteer with Axiom."
        fallbackTitleText="Volunteer with Axiom."
        fallbackSub="Help students take their first steps in research. Ask the team which roles are available and what each involves."
      />
      <section className="site-wrap site-page-body" aria-label="Volunteer roles">
        <div className="site-editorial-list">
          {roles.map(({ t, d }) => (
            <article key={t}>
              <h2>{t}</h2>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <div className="site-actions">
          <Link to="/contact" className="site-button">
            Ask about volunteering <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/careers" className="site-text-link">
            Explore other roles
          </Link>
        </div>
      </section>
    </>
  );
}
