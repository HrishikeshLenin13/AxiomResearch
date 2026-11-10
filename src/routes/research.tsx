import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CmsPageHero } from "../components/CmsPageHero";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Student Research — Axiom" },
      {
        name: "description",
        content:
          "Read about Axiom’s open student research archive and how student submissions will be reviewed.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <>
      <CmsPageHero
        pageKey="research"
        eyebrow="Student research"
        fallbackTitle="An archive for student research."
        fallbackTitleText="An archive for student research."
        fallbackSub="Axiom is developing an open archive. No papers are listed yet; student submissions will be added after review and approval."
      />
      <section className="site-wrap site-page-body home-split" aria-labelledby="research-review">
        <div>
          <h2 className="site-subheading" id="research-review">
            What makes research ready to share?
          </h2>
        </div>
        <div className="site-copy">
          <p>
            Explain the question, show how you gathered and analyzed evidence, and describe what
            your findings do and don’t support. Review helps you make that reasoning clear to
            someone who wasn’t part of the project.
          </p>
          <div className="site-actions">
            <Link to="/contact" className="site-button">
              Ask about student submissions
            </Link>
            <Link to="/course" className="site-text-link">
              Learn research methods <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
