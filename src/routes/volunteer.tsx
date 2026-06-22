import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { motion } from "framer-motion";
import { Heart, FileText, Users, Award, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer — Axiom" },
      { name: "description", content: "Volunteer with Axiom — reviewers, ambassadors, mentors, and leadership pathways for students who want to give back." },
    ],
  }),
  component: VolunteerPage,
});

const roles = [
  { icon: FileText, t: "Research Reviewer", d: "Read and evaluate student submissions for rigor, originality, and clarity. Training provided.", hrs: "20-40 hrs / semester" },
  { icon: Users, t: "Peer Mentor", d: "Support newer Foundations students through their first research projects.", hrs: "30-50 hrs / semester" },
  { icon: Heart, t: "Student Ambassador", d: "Run an Axiom chapter at your school. Organize workshops, recruit, build community.", hrs: "Flexible" },
  { icon: Award, t: "Leadership Pathway", d: "Step into program lead, regional coordinator, or core team roles after 1+ semester active.", hrs: "Application-based" },
];

function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title={<>Give time. <span className="text-gradient-brand">Build the network.</span></>}
        sub="Axiom runs entirely on student volunteers. Whatever you bring — reviewing, mentoring, organizing, building — there's a role that needs you."
      />
      <section className="relative pb-28 md:pb-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-5">
            {roles.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.07}>
                <motion.div whileHover={{ y: -4 }} className="glass rounded-3xl p-6 md:p-8 h-full group">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet/40 to-cyan-glow/20 border border-white/10 grid place-items-center">
                      <r.icon size={20} className="text-cyan-glow" />
                    </div>
                    <span className="text-xs rounded-full bg-white/5 border border-white/10 px-3 py-1 text-muted-foreground">{r.hrs}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{r.t}</h3>
                  <p className="text-muted-foreground leading-relaxed">{r.d}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 md:mt-16 glass-strong rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[30rem] h-[30rem] rounded-full bg-violet/20 blur-3xl" />
              <h3 className="relative text-3xl md:text-4xl font-semibold text-gradient">Volunteer hours, real impact.</h3>
              <p className="relative mt-4 text-muted-foreground max-w-xl mx-auto">
                All Axiom volunteer work counts toward verified service hours — documented, signed, and ready for school or college applications.
              </p>
              <Link to="/contact" className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:scale-[1.03] transition">
                Apply to volunteer <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
