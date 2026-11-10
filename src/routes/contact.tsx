import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { CmsPageHero } from "../components/CmsPageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Axiom" },
      {
        name: "description",
        content:
          "Contact the Axiom team about student programs, volunteering, partnerships, or press.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <CmsPageHero
        pageKey="contact"
        eyebrow="Contact"
        fallbackTitle="Contact Axiom."
        fallbackTitleText="Contact Axiom."
        fallbackSub="Get in touch about student programs, volunteering, partnerships, or press."
      />
      <section className="site-wrap site-page-body" aria-label="Ways to contact Axiom">
        <div className="site-editorial-list">
          <article>
            <h2>Email the team</h2>
            <div>
              <p>For general questions, partnership proposals, or press inquiries.</p>
              <a className="site-text-link break-all" href="mailto:axiomresearchteam@gmail.com">
                axiomresearchteam@gmail.com
              </a>
            </div>
          </article>
          <article>
            <h2>Use the contact form</h2>
            <div>
              <p>The form opens on Tally in a new tab.</p>
              <a
                href="https://tally.so/r/gDJLWP"
                target="_blank"
                rel="noopener noreferrer"
                className="site-text-link"
              >
                Open the contact form <ExternalLink size={16} aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
