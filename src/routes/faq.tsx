import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { CmsPageHero } from "../components/CmsPageHero";
import { Reveal } from "../components/Reveal";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Axiom" },
      { name: "description", content: "Common questions about Axiom programs, volunteer hours, publishing, and membership." },
    ],
  }),
  component: FaqPage,
});

const groups = [
  {
    title: "Getting started",
    items: [
      { q: "What is Axiom?", a: "Axiom is a student-led nonprofit helping high school students learn academic research through structured programs, mentorship, and open publishing." },
      { q: "Can beginners join?", a: "Yes. The Research Foundations program is built for students with zero prior research experience." },
      { q: "Is this free?", a: "Yes. All core Axiom programs are free for participating students." },
    ],
  },
  {
    title: "Programs & publishing",
    items: [
      { q: "Do students actually publish papers?", a: "Yes — through the Open Research Database, partner journals, and team-authored submissions." },
      { q: "How does peer review work?", a: "Trained student reviewers and mentors evaluate submissions for rigor, originality, and clarity before publication." },
      { q: "Are mentors guaranteed?", a: "Foundations students receive program-level mentorship. Mentored Research participants are paired 1:1 after admission." },
    ],
  },
  {
    title: "Volunteering & hours",
    items: [
      { q: "How are volunteer hours awarded?", a: "Hours are awarded for program completion, reviewer work, leadership roles, and research contributions." },
      { q: "How can I volunteer?", a: "Visit Volunteer or Careers to apply for a reviewer, ambassador, mentor, or operations role." },
    ],
  },
];

function FaqPage() {
  return (
    <>
      <CmsPageHero
        pageKey="faq"
        eyebrow="FAQ"
        fallbackTitle={<>Everything you need <span className="text-gradient-brand">to know.</span></>}
        fallbackTitleText="Everything you need to know."
        fallbackSub="Still curious? Reach out — we read every message."
      />
      <section className="relative pb-28 md:pb-32 px-6">
        <div className="mx-auto max-w-3xl space-y-12">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.05}>
              <div>
                <h3 className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">{g.title}</h3>
                <div className="space-y-3">
                  {g.items.map((it, i) => <Item key={it.q} {...it} i={i} />)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function Item({ q, a }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="glass rounded-3xl overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="font-medium pr-4">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-2xl text-muted-foreground leading-none">+</motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{a}</div>
      </motion.div>
    </motion.div>
  );
}
