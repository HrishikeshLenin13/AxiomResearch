import type { ReactNode } from "react";

export function PageHero({ title, sub }: { eyebrow: string; title: ReactNode; sub: string }) {
  return (
    <section className="site-page-hero">
      <div className="site-wrap">
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
    </section>
  );
}
