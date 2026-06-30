import { adminCategories } from "./constants";

export function AdminSidebar() {
  return (
    <aside className="lg:w-64 shrink-0 rounded-2xl border border-border bg-white/40 p-5">
      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Sections</p>
      <nav className="mt-4 space-y-5" aria-label="Admin sections">
        {adminCategories.map((category) => (
          <div key={category.title}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {category.title}
            </p>
            <ul className="mt-2 space-y-1">
              {category.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block rounded-xl px-3 py-2 text-sm text-foreground/80 hover:bg-white/50 hover:text-foreground transition"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
