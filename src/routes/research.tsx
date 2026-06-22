import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { motion } from "framer-motion";
import { Search, FileText, BookOpen, ArrowUpRight, Filter } from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Database — Axiom" },
      { name: "description", content: "An open, peer-reviewed archive of student research from across the Axiom network." },
    ],
  }),
  component: ResearchPage,
});

const papers = [
  { title: "Bioplastic synthesis from agricultural waste in low-resource settings", field: "Biology", year: 2025, author: "M. Adeyemi et al.", read: "12 min" },
  { title: "Quantifying urban heat island effects in mid-size South American cities", field: "Climate", year: 2025, author: "L. Vargas", read: "18 min" },
  { title: "A lightweight transformer architecture for low-data dialect translation", field: "CS / ML", year: 2024, author: "J. Park, R. Singh", read: "22 min" },
  { title: "Mental health outcomes of after-school peer mentoring: a 2-year study", field: "Psychology", year: 2025, author: "S. Okonkwo", read: "15 min" },
  { title: "On the geometry of self-similar fractals in coastline measurement", field: "Mathematics", year: 2024, author: "T. Bhatia", read: "9 min" },
  { title: "Microplastic transport in freshwater reservoirs of the Ganges basin", field: "Environment", year: 2025, author: "A. Sharma, P. Iyer", read: "20 min" },
];

const fields = ["All", "Biology", "Climate", "CS / ML", "Psychology", "Mathematics", "Environment"];

function ResearchPage() {
  const [q, setQ] = useState("");
  const [f, setF] = useState("All");
  const list = papers.filter(
    (p) => (f === "All" || p.field === f) && (q === "" || p.title.toLowerCase().includes(q.toLowerCase()) || p.author.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <>
      <PageHero
        eyebrow="Research database"
        title={<>An open archive of <span className="text-gradient-brand">student work.</span></>}
        sub="Every paper here was written by a high school student in the Axiom network, reviewed by trained peers, and published for the world to read — free, forever."
      />

      <section className="relative pb-28 md:pb-32 px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="glass-strong rounded-3xl p-6 md:p-7 mb-8">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center gap-3 bg-white/40 border border-border rounded-2xl px-4">
                  <Search size={16} className="text-muted-foreground" />
                  <input
                    value={q} onChange={(e) => setQ(e.target.value)}
                    placeholder="Search papers, authors, topics…"
                    className="flex-1 bg-transparent py-3 text-sm focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <Filter size={14} className="text-muted-foreground shrink-0" />
                  {fields.map((fld) => (
                    <button
                      key={fld} onClick={() => setF(fld)}
                      className={`shrink-0 text-xs rounded-full px-3 py-1.5 border transition ${
                        f === fld ? "bg-primary text-primary-foreground border-primary" : "bg-white/5 border-white/10 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {fld}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-4">
            {list.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.04}>
                <motion.a href="#" whileHover={{ y: -4 }} className="block glass rounded-3xl p-6 md:p-7 h-full group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs rounded-full bg-violet/20 border border-violet/30 px-3 py-1 text-cyan-glow">{p.field}</span>
                    <span className="text-xs text-muted-foreground">{p.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-snug group-hover:text-gradient-brand transition">{p.title}</h3>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{p.author}</span>
                    <span className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><BookOpen size={12} /> {p.read}</span>
                      <ArrowUpRight size={14} className="text-foreground/60 group-hover:text-cyan-glow transition" />
                    </span>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>

          {list.length === 0 && (
            <div className="text-center text-muted-foreground py-20">
              <FileText size={32} className="mx-auto mb-3 opacity-50" />
              No results. Try a different query.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
