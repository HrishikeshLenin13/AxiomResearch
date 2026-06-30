import type { ReactNode } from "react";

export function AdminCategoryGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="border-b border-border pb-3">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function AdminSectionPanel({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article id={id} className="scroll-mt-24 rounded-2xl border border-border bg-white/45 p-5 md:p-6">
      <header className="mb-4 border-b border-border/70 pb-4">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </header>
      {children}
    </article>
  );
}

export function AdminPlaceholderSection({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-white/30 px-4 py-8 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}
