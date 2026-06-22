import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Sparkles, Users, BookOpen, Microscope, Database,
  Brain, MessageSquare, GitBranch, Lightbulb, ChevronDown, FileText,
  Megaphone, Code, UserPlus, Briefcase, Layers, CheckCircle2, HelpCircle, Search,
} from "lucide-react";
import { ParticleField } from "../components/ParticleField";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Axiom — Empowering the Next Generation of Researchers" },
      { name: "description", content: "Axiom helps high school students learn research, collaborate, and share meaningful academic work." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <WhyResearch />
      <Mission />
      <Programs />
      <HowItWorks />
      <Internships />
      <CTA />
    </>
  );
}

/* -------------------------------- HERO -------------------------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <ParticleField density={70} />

      {/* floating orbs */}
      <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-violet/20 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-cyan-glow/15 blur-3xl animate-float-slow" style={{ animationDelay: "-6s" }} />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-deep-blue/30 blur-3xl animate-pulse-glow" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <Sparkles size={12} className="text-cyan-glow" />
          A nonprofit research initiative
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 text-5xl sm:text-6xl md:text-8xl font-semibold leading-[1.02] tracking-tight"
        >
          <span className="text-gradient">Empowering the next</span>
          <br />
          <span className="text-gradient-brand">generation of researchers.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          A nonprofit initiative helping high school students learn research methods, collaborate with peers, and share thoughtful academic work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/volunteer"
            className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:scale-[1.03] transition-transform shadow-lg shadow-violet/30"
          >
            Get Involved
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/programs"
            className="group inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/10 transition"
          >
            Explore Programs
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-xs"
      >
        <span className="uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* --------------------------- WHY RESEARCH ----------------------------- */
function WhyResearch() {
  const cards = [
    { icon: Brain, title: "Critical thinking", desc: "Research trains students to question assumptions, evaluate evidence, and reason from first principles." },
    { icon: Users, title: "Collaborative learning", desc: "Working with peers and mentors helps students strengthen ideas through dialogue and feedback." },
    { icon: MessageSquare, title: "Mentorship matters", desc: "Expert feedback shortens the path from curiosity to contribution by years." },
    { icon: GitBranch, title: "Peer review", desc: "Honest critique from peers sharpens every idea — and builds the rigor real science demands." },
    { icon: Lightbulb, title: "Original inquiry", desc: "Students learn to move from curiosity to focused, evidence-based questions." },
    { icon: BookOpen, title: "Shared knowledge", desc: "Clear writing and responsible publishing help student work reach the right audience." },
  ];
  return (
    <Section eyebrow="Why research matters" title={<>The future is built<br /><span className="text-gradient-brand">by curious minds.</span></>}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <FeatureCard icon={c.icon} title={c.title} desc={c.desc} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative glass rounded-3xl p-7 h-full overflow-hidden"
    >
      <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
        style={{ background: "linear-gradient(135deg, oklch(0.6 0.24 295 / 0.4), transparent 60%)" }}
      />
      <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-violet/10 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
      <div className="relative">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet/30 to-cyan-glow/20 border border-white/10 grid place-items-center mb-5">
          <Icon size={18} className="text-cyan-glow" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ------------------------------ MISSION ------------------------------- */
function Mission() {
  const pillars = ["Accessibility", "Collaboration", "Mentorship", "Innovation", "Open knowledge"];
  return (
    <Section eyebrow="Our mission" title={<>Democratizing access to <span className="text-gradient-brand">academic research.</span></>}>
      <div className="grid lg:grid-cols-5 gap-10 items-start">
        <Reveal className="lg:col-span-3">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">
            Research opportunities can be difficult to access early. Axiom helps motivated high school students learn the craft of inquiry, work with mentors, and develop thoughtful academic projects.
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            We believe the next generation of scientists, engineers, economists, and thinkers is already here. They just need a door open.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="glass rounded-3xl p-6 space-y-3">
            {pillars.map((p, i) => (
              <div key={p} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                <span className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                  <span className="font-medium">{p}</span>
                </span>
                <CheckCircle2 size={16} className="text-cyan-glow" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------ PROGRAMS ------------------------------ */
function Programs() {
  const programs = [
    {
      tag: "Program 01",
      icon: BookOpen,
      title: "Research Foundations",
      desc: "A structured curriculum covering methodologies, academic writing, citations, literature reviews, hypotheses, experimentation, and peer review. Culminates in a capstone project.",
      bullets: ["Capstone project", "Volunteer hours awarded", "Beginner-friendly"],
    },
    {
      tag: "Program 02",
      icon: Microscope,
      title: "Mentored Research",
      desc: "Application-based program pairing students with professors, graduate researchers, and advanced mentors to pursue higher-level original research projects.",
      bullets: ["Selective admission", "1:1 mentorship", "Original research"],
    },
    {
      tag: "Program 02.5",
      icon: Users,
      title: "Collaborative Research Teams",
      desc: "Peer-led interdisciplinary research groups. Build accountability, run internal peer review, and pursue collaborative publishing opportunities together.",
      bullets: ["Cross-discipline teams", "Peer review system", "Co-authored papers"],
    },
    {
      tag: "Program 03",
      icon: Database,
      title: "Open Research Database",
      desc: "A free, public, searchable archive of peer-reviewed student research. Open-access knowledge sharing as a public good.",
      bullets: ["Free & open access", "Peer-reviewed", "Permanent DOIs"],
    },
  ];

  return (
    <Section eyebrow="Programs" title={<>Four pathways. <span className="text-gradient-brand">One mission.</span></>}>
      <div className="grid md:grid-cols-2 gap-5">
        {programs.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <ProgramCard {...p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProgramCard({ tag, icon: Icon, title, desc, bullets }: any) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="group relative glass rounded-3xl p-8 h-full overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(600px circle at 30% 0%, oklch(0.6 0.24 295 / 0.2), transparent 40%)" }}
      />
      <div className="relative flex items-start justify-between mb-6">
        <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">{tag}</div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet/40 to-cyan-glow/20 border border-white/10 grid place-items-center">
          <Icon size={20} className="text-cyan-glow" />
        </div>
      </div>
      <h3 className="relative text-2xl md:text-3xl font-semibold mb-3">{title}</h3>
      <p className="relative text-muted-foreground leading-relaxed mb-6">{desc}</p>
      <ul className="relative flex flex-wrap gap-2">
        {bullets.map((b: string) => (
          <li key={b} className="text-xs rounded-full bg-white/5 border border-white/10 px-3 py-1 text-foreground/80">
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ----------------------------- HOW IT WORKS --------------------------- */
function HowItWorks() {
  const steps = [
    { t: "Learn Research Foundations", d: "Begin with methodology, citations, lit reviews, and the language of research." },
    { t: "Collaborate & Explore Ideas", d: "Form teams across borders and disciplines. Find the question worth answering." },
    { t: "Conduct Research", d: "Hypothesize, experiment, analyze. Build the work with mentor guidance." },
    { t: "Peer Review & Improve", d: "Refine through honest critique. Defend ideas. Strengthen arguments." },
    { t: "Publish & Share Knowledge", d: "Add to the open Axiom database. Your work, accessible to the world." },
  ];

  return (
    <Section eyebrow="How it works" title={<>From curiosity to <span className="text-gradient-brand">contribution.</span></>}>
      <div className="relative">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet/50 to-transparent" />
        <div className="space-y-10">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.08}>
              <div className={`relative grid md:grid-cols-2 gap-6 items-center ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                <div className="md:[direction:ltr]">
                  <div className="glass rounded-3xl p-7">
                    <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">Step {String(i + 1).padStart(2, "0")}</div>
                    <h3 className="text-2xl font-semibold mb-2">{s.t}</h3>
                    <p className="text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center md:[direction:ltr]">
                  <div className="relative w-16 h-16 rounded-full glass-strong grid place-items-center font-display font-semibold">
                    {String(i + 1).padStart(2, "0")}
                    <div className="absolute inset-0 rounded-full bg-violet/20 blur-2xl -z-10" />
                  </div>
                </div>
                <div className="absolute left-6 md:hidden top-7 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-glow shadow-cyan" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* --------------------------- INTERNSHIPS ------------------------------ */
function Internships() {
  const roles = [
    { icon: Megaphone, t: "Marketing Intern" },
    { icon: UserPlus, t: "Outreach Intern" },
    { icon: FileText, t: "Research Reviewer" },
    { icon: BookOpen, t: "Curriculum Developer" },
    { icon: Code, t: "Web Developer" },
    { icon: Briefcase, t: "HR & Recruitment" },
    { icon: Sparkles, t: "Social Media Manager" },
    { icon: Layers, t: "Research Team Lead" },
  ];
  return (
    <Section eyebrow="Internships & leadership" title={<>Build Axiom. <span className="text-gradient-brand">Build yourself.</span></>}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((r, i) => (
          <Reveal key={r.t} delay={i * 0.04}>
            <Link to="/careers" className="group block glass rounded-2xl p-5 hover:bg-white/[0.07] transition relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-violet/10 blur-2xl opacity-0 group-hover:opacity-100 transition" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
                    <r.icon size={16} className="text-cyan-glow" />
                  </div>
                  <span className="text-sm font-medium">{r.t}</span>
                </div>
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------- FAQ --------------------------------- */

const FAQ_CATEGORIES = ["All", "Getting started", "Programs", "Volunteering"] as const;
type FaqCat = (typeof FAQ_CATEGORIES)[number];

const FAQ_ITEMS: { q: string; a: string; cat: Exclude<FaqCat, "All"> }[] = [
  { q: "What is Axiom?", a: "Axiom is a student-led nonprofit that teaches high schoolers how to conduct, collaborate on, and publish academic research.", cat: "Getting started" },
  { q: "Can beginners join?", a: "Absolutely. Our Research Foundations program assumes zero prior experience and walks you through every step.", cat: "Getting started" },
  { q: "Is this free?", a: "Yes. Axiom is a nonprofit. Core programs are free for participating students.", cat: "Getting started" },
  { q: "Do students actually publish papers?", a: "Yes — through our Open Research Database, partner journals, and collaborative team submissions.", cat: "Programs" },
  { q: "How does peer review work?", a: "Trained student reviewers and mentors evaluate submissions for rigor, originality, and clarity before publication.", cat: "Programs" },
  { q: "Are mentors guaranteed?", a: "Foundations students receive program-level mentorship. Mentored Research participants are paired 1:1 after admission.", cat: "Programs" },
  { q: "How are volunteer hours awarded?", a: "Hours are awarded for program completion, reviewer work, leadership roles, and team-based research contributions.", cat: "Volunteering" },
  { q: "How can I volunteer?", a: "Visit the Volunteer or Careers pages to find a role — reviewer, ambassador, mentor, or operations.", cat: "Volunteering" },
];

function FAQ() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<FaqCat>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = FAQ_ITEMS.filter((it) => {
    const matchCat = cat === "All" || it.cat === cat;
    const q = query.trim().toLowerCase();
    const matchQ = !q || it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
              <HelpCircle size={12} className="text-cyan-glow" />
              FAQ
            </div>
            <h2 className="text-4xl md:text-6xl font-semibold text-gradient leading-[1.05]">
              Questions, <span className="text-gradient-brand">answered.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg max-w-xl">
              Search by keyword or filter by topic. Still curious? Reach out — we read every message.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar: search + categories */}
          <Reveal className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="glass-strong rounded-3xl p-6 space-y-5">
              <div className="relative">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search questions…"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-violet/60 focus:bg-white/[0.06] transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                {FAQ_CATEGORIES.map((c) => {
                  const active = c === cat;
                  const count = c === "All" ? FAQ_ITEMS.length : FAQ_ITEMS.filter((i) => i.cat === c).length;
                  return (
                    <button
                      key={c}
                      onClick={() => { setCat(c); setOpenIdx(null); }}
                      className={`group relative flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm transition ${
                        active ? "bg-white/[0.06] border border-white/15 text-foreground" : "border border-transparent text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-cyan-glow shadow-cyan" : "bg-white/20"}`} />
                        {c}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">{String(count).padStart(2, "0")}</span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-4 border-t border-white/5 text-xs text-muted-foreground leading-relaxed">
                Can't find it? <Link to="/contact" className="text-foreground hover:text-cyan-glow transition">Email the team →</Link>
              </div>
            </div>
          </Reveal>

          {/* Question list */}
          <div className="lg:col-span-8 space-y-3">
            {filtered.length === 0 && (
              <div className="glass rounded-2xl p-8 text-center text-muted-foreground text-sm">
                No questions match "{query}". Try another keyword.
              </div>
            )}
            {filtered.map((item, i) => (
              <Reveal key={item.q} delay={Math.min(i * 0.04, 0.2)}>
                <FaqItem
                  q={item.q}
                  a={item.a}
                  cat={item.cat}
                  idx={i + 1}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  q, a, cat, idx, open, onToggle,
}: { q: string; a: string; cat: string; idx: number; open: boolean; onToggle: () => void }) {
  return (
    <motion.div
      layout
      className={`group relative rounded-2xl overflow-hidden border transition-colors ${
        open
          ? "bg-white/[0.05] border-white/15"
          : "bg-white/[0.02] border-white/[0.07] hover:border-white/15 hover:bg-white/[0.04]"
      }`}
    >
      {/* gradient hover wash */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ${open ? "opacity-100" : "group-hover:opacity-60"}`}
        style={{ background: "radial-gradient(600px circle at 0% 0%, oklch(0.6 0.24 295 / 0.10), transparent 50%)" }}
      />

      <button
        onClick={onToggle}
        className="relative w-full flex items-start gap-5 p-5 md:p-6 text-left"
      >
        <span className="shrink-0 mt-0.5 w-9 h-9 rounded-xl bg-gradient-to-br from-violet/30 to-cyan-glow/20 border border-white/10 grid place-items-center text-[11px] font-mono">
          {String(idx).padStart(2, "0")}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-1">{cat}</span>
          <span className="block font-medium text-base md:text-lg leading-snug pr-4">{q}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="shrink-0 mt-1 w-8 h-8 rounded-full glass grid place-items-center text-lg leading-none text-foreground"
        >
          +
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="relative pl-[4.25rem] pr-6 pb-6 -mt-1 text-muted-foreground leading-relaxed">
          {a}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------- CTA --------------------------------- */
function CTA() {
  return (
    <section className="relative py-28 px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] glass-strong p-12 md:p-20 text-center">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-violet/25 blur-3xl" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <Reveal>
          <p className="relative text-xs uppercase tracking-[0.3em] text-cyan-glow mb-4">Get involved</p>
          <h2 className="relative text-4xl md:text-6xl font-semibold text-gradient leading-tight">
            Join the future of<br /><span className="text-gradient-brand">student research.</span>
          </h2>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/programs" className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:scale-[1.03] transition">Apply Now</Link>
            <Link to="/volunteer" className="rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/10 transition">Become a Volunteer</Link>
            <Link to="/about" className="rounded-full px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1">
              Learn More <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------- Shared Section --------------------------- */
function Section({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="relative py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="max-w-3xl mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">{eyebrow}</p>
            <h2 className="text-4xl md:text-6xl font-semibold text-gradient leading-[1.05]">{title}</h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
