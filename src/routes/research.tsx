import { createFileRoute } from "@tanstack/react-router";
import { CmsPageHero } from "../components/CmsPageHero";
import { Reveal } from "../components/Reveal";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Database — Axiom" },
      { name: "description", content: "An open, peer-reviewed archive of student research from across the Axiom network." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <>
      <CmsPageHero
        pageKey="research"
        eyebrow="Research database"
        fallbackTitle={<>An open archive of <span className="text-gradient-brand">student work.</span></>}
        fallbackTitleText="An open archive of student work."
        fallbackSub="The research archive will open once reviewed student papers are ready for publication."
      />

      <section className="relative pb-28 md:pb-32 px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-5">
                <FileText size={24} />
              </div>
              <h2 className="text-3xl font-semibold">Research archive coming soon</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Papers will be added after the team has received, reviewed, and approved real student submissions.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
