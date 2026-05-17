import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { motion } from "framer-motion";
import { BookOpen, Microscope, Users, Database, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Programs — Axiom" },
      { name: "description", content: "Foundations, Mentored Research, Collaborative Teams, and the Open Research Database — the four programs of Axiom." },
    ],
  }),
  component: ProgramsPage,
});

const programs = [
  {
    icon: BookOpen, tag: "01", title: "Research Foundations",
    desc: "A complete curriculum on the craft of research — methodology, academic writing, citations, literature reviews, hypothesis design, experimentation, and the peer-review process.",
    points: [
      "Live workshops and self-paced modules",
      "Capstone project with mentor feedback",
      "Volunteer hours awarded on completion",
      "No prerequisites — open to all students",
    ],
  },
  {
    icon: Microscope, tag: "02", title: "Mentored Research",
    desc: "Selective, application-based program pairing accepted students with professors, graduate researchers, and senior mentors to pursue advanced original projects.",
    points: [
      "1:1 mentorship across 4-6 months",
      "Original research, not coursework",
      "Submission support to academic journals",
      "Letters of recommendation for top contributors",
    ],
  },
  {
    icon: Users, tag: "02.5", title: "Collaborative Research Teams",
    desc: "Peer-led, interdisciplinary research groups. Build accountability, run internal peer review, and pursue collaborative publishing as a team.",
    points: [
      "Cross-country, cross-discipline teams",
      "Structured peer-review cadence",
      "Team-authored publications",
      "Leadership pathways for team leads",
    ],
  },
  {
    icon: Database, tag: "03", title: "Open Research Database",
    desc: "Axiom's flagship publishing platform — a free, searchable archive of peer-reviewed student research, open to readers everywhere.",
    points: [
      "Free and permanently open access",
      "Trained reviewer pool",
      "Tagging by field and methodology",
      "Persistent identifiers for every paper",
    ],
  },
];

function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title={<>Four pathways into <span className="text-gradient-brand">real research.</span></>}
        sub="Whether you're brand new to research or ready to publish, there's a program that meets you where you are — and pushes you forward."
      />
      <section className="relative pb-32 px-6">
        <div className="mx-auto max-w-6xl space-y-6">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <motion.div whileHover={{ y: -4 }} className="group relative glass rounded-3xl p-8 md:p-12 overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet/15 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
                <div className="relative grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-4">
                    <div className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Program {p.tag}</div>
                    <div className="w-14 h-14 mt-4 rounded-2xl bg-gradient-to-br from-violet/40 to-cyan-glow/20 border border-white/10 grid place-items-center">
                      <p.icon size={22} className="text-cyan-glow" />
                    </div>
                    <h3 className="mt-5 text-3xl md:text-4xl font-semibold">{p.title}</h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-lg text-muted-foreground leading-relaxed">{p.desc}</p>
                    <ul className="mt-6 grid sm:grid-cols-2 gap-2">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-sm text-foreground/85">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-glow shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <Link to="/volunteer" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-cyan-glow transition">
                      Apply or get involved <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
