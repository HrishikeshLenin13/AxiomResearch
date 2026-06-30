import { createFileRoute } from "@tanstack/react-router";
import { CmsPageHero } from "../components/CmsPageHero";
import { Reveal } from "../components/Reveal";
import { Target, Eye, Users, Rocket } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Axiom" },
      { name: "description", content: "The story, mission, and vision behind Axiom — a student-led nonprofit democratizing research." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const blocks = [
    { icon: Target, t: "Our mission", d: "To open the doors of academic research to any student, anywhere, with the curiosity to walk through them." },
    { icon: Eye, t: "Our vision", d: "A world where original research is a normal part of growing up — not a privilege reserved for a lucky few." },
    { icon: Users, t: "Who we are", d: "A small team of high school students who love research, building the program we wished existed when we were starting out." },
    { icon: Rocket, t: "Where we're going", d: "Growing into more school chapters, building our open research database, and helping other curious students start their own projects." },
  ];

  return (
    <>
      <CmsPageHero
        pageKey="about"
        eyebrow="About Axiom"
        fallbackTitle={<>Built by students. <span className="text-gradient-brand">For students.</span></>}
        fallbackTitleText="Built by students. For students."
        fallbackSub="Axiom started with a simple question: why does serious research feel out of reach to most high schoolers? We're the answer we wish we'd had."
      />

      <section className="relative pb-16 md:pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="glass rounded-3xl p-8 md:p-12 leading-relaxed text-foreground/90 text-lg space-y-5">
              <p>
                Axiom was started by a small group of high school students who were obsessed with research — but kept running into the same wall. Real research opportunities felt locked behind the right school, the right city, or knowing the right person. So we decided to build the thing we wished had existed for us.
              </p>
              <p>
                What began as a handful of friends helping each other read papers and form hypotheses has grown into a community of students learning research methodology together, working through ideas with mentors, collaborating in small teams, and publishing what they find.
              </p>
              <p>
                We're not a credential factory and we're not pretending to be more than we are. We're students helping other students do real work — and inviting anyone curious enough to want to grow alongside us.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-28 md:pb-32 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-5">
          {blocks.map((b, i) => (
            <Reveal key={b.t} delay={i * 0.07}>
              <div className="glass rounded-3xl p-6 md:p-8 h-full">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet/30 to-cyan-glow/20 border border-white/10 grid place-items-center mb-5">
                  <b.icon size={18} className="text-cyan-glow" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{b.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
