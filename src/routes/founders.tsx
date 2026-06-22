import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PageHero } from "../components/PageShell";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/founders")({
  head: () => ({
    meta: [
      { title: "Founders — Axiom" },
      { name: "description", content: "Axiom founders page placeholder." },
    ],
  }),
  component: FoundersPage,
});

function FoundersPage() {
  return (
    <>
      <PageHero
        eyebrow="Founders"
        title={<>Meet the <span className="text-gradient-brand">founders.</span></>}
        sub="This page will release Summer 2027."
      />
      <section className="relative pb-28 md:pb-32 px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-5">
                <Users size={24} />
              </div>
              <h2 className="text-3xl font-semibold">Founders page coming soon</h2>
              <p className="mt-4 text-muted-foreground">
                Founder profiles and background will be released Summer 2027.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
