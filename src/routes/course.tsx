import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Layers, Users } from "lucide-react";
import { PageHero } from "../components/PageShell";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/course")({
  head: () => ({
    meta: [
      { title: "Course — Axiom" },
      { name: "description", content: "Axiom's Research & Marketing Course is launching soon." },
    ],
  }),
  component: CoursePage,
});

const sections = [
  { icon: BookOpen, title: "Overview", body: "Details coming soon" },
  { icon: Layers, title: "Structure", body: "Details coming soon" },
  { icon: Users, title: "Mentorship System", body: "Details coming soon" },
  { icon: GraduationCap, title: "Certification", body: "Details coming soon" },
];

function CoursePage() {
  return (
    <>
      <PageHero eyebrow="Course" title="Research & Marketing Course" sub="Launching Soon" />
      <section className="relative pb-28 md:pb-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-5">
            {sections.map((section, index) => (
              <Reveal key={section.title} delay={index * 0.06}>
                <div className="glass rounded-3xl p-6 md:p-8 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet/20 to-cyan-glow/15 border border-white/10 grid place-items-center mb-5">
                    <section.icon size={20} className="text-cyan-glow" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 glass-strong rounded-3xl p-6 md:p-8 text-center">
              <p className="text-muted-foreground">
                Course content will be released and managed by the team.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
