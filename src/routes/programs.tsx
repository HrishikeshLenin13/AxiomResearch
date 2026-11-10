import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CmsPageHero } from "../components/CmsPageHero";
import { PUBLIC_PROGRAMS } from "../lib/public-programs";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Axiom" },
      {
        name: "description",
        content:
          "Compare Research Foundations, mentored research, peer collaboration, and Axiom’s developing research archive.",
      },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <>
      <CmsPageHero
        pageKey="programs"
        eyebrow="Programs"
        fallbackTitle="Research programs"
        fallbackTitleText="Research programs"
        fallbackSub="Compare what you’ll do in each program, what it takes to participate, and how to get started."
      />
      <section className="site-wrap site-page-body" aria-label="Axiom programs">
        <div className="site-editorial-list program-directory">
          {PUBLIC_PROGRAMS.map(({ id, title, status, description, access, action, to }) => (
            <article key={id} id={id}>
              <div>
                <h2>{title}</h2>
                <p className="site-row-status">{status}</p>
              </div>
              <div>
                <p>{description}</p>
                <p className="program-access">
                  <strong>How to get started:</strong> {access}
                </p>
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
