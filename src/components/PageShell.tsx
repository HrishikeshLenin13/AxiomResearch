import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ParticleField } from "./ParticleField";

export function PageHero({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub: string }) {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <ParticleField density={40} />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
          {eyebrow}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-5xl md:text-7xl font-semibold text-gradient leading-[1.05]"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {sub}
        </motion.p>
      </div>
    </section>
  );
}
