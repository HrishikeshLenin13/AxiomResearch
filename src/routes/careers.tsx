import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers & Internships — Axiom" },
      { name: "description", content: "Open internship and leadership roles at Axiom — marketing, outreach, curriculum, engineering, and more." },
    ],
  }),
  component: CareersPage,
});

const roles = [
  { t: "Marketing Intern", team: "Growth", loc: "Remote", time: "Part-time", d: "Shape Axiom's voice across channels. Write, design, and support student outreach campaigns." },
  { t: "Outreach Intern", team: "Community", loc: "Remote", time: "Part-time", d: "Build relationships with schools, clubs, and educators across regions." },
  { t: "Research Reviewer", team: "Editorial", loc: "Remote", time: "Flexible", d: "Evaluate student submissions for rigor, originality, and clarity." },
  { t: "Curriculum Developer", team: "Education", loc: "Remote", time: "Part-time", d: "Author and refine the Foundations curriculum modules with our education leads." },
  { t: "Web Developer", team: "Engineering", loc: "Remote", time: "Part-time", d: "Build the next iteration of axiom.org, our database, and student dashboards." },
  { t: "HR & Recruitment", team: "Operations", loc: "Remote", time: "Part-time", d: "Support hiring cycles, onboarding, and team operations for a remote student organization." },
  { t: "Social Media Manager", team: "Growth", loc: "Remote", time: "Flexible", d: "Run Axiom's social presence — content, community, and creator partnerships." },
  { t: "Research Team Lead", team: "Research", loc: "Remote", time: "Semester", d: "Lead an interdisciplinary student research group from question to publication." },
];

function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers & internships"
        title={<>Help us build <span className="text-gradient-brand">what didn't exist.</span></>}
        sub="We're a student-led team building practical research programs. Each role offers meaningful work, ownership, and volunteer hours."
      />
      <section className="relative pb-28 md:pb-32 px-6">
        <div className="mx-auto max-w-5xl space-y-3">
          {roles.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.04}>
              <motion.a
                href="#apply" whileHover={{ x: 4 }}
                className="group flex flex-col md:flex-row md:items-center md:justify-between gap-4 glass rounded-3xl p-6 md:p-7 hover:bg-white/[0.07] transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-semibold">{r.t}</h3>
                    <span className="text-xs rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-muted-foreground">{r.team}</span>
                  </div>
                  <p className="text-sm text-muted-foreground max-w-2xl">{r.d}</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {r.loc}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {r.time}</span>
                  <ArrowUpRight size={18} className="text-foreground/60 group-hover:text-cyan-glow transition" />
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div id="apply" className="mt-14 md:mt-16 mx-auto max-w-3xl glass-strong rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-violet/20 blur-3xl" />
            <h3 className="relative text-3xl font-semibold text-gradient">Don't see the right role?</h3>
            <p className="relative mt-3 text-muted-foreground">We're open to thoughtful proposals from students who want to contribute.</p>
            <a href="mailto:axiomresearchteam@gmail.com" className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:scale-[1.03] transition">
              axiomresearchteam@gmail.com <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
