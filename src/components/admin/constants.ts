export const adminInputClass =
  "w-full rounded-2xl border border-border bg-white/40 px-3 py-2.5 text-sm outline-none focus:border-primary";

export const adminBlockCardClass =
  "rounded-xl border border-border bg-white/50 p-4 shadow-sm";

export const adminPrimaryButtonClass =
  "rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition";

export const adminSecondaryButtonClass =
  "rounded-full border border-border bg-white/40 px-5 py-2.5 text-sm font-medium hover:bg-white/60 transition";

export const adminGhostButtonClass =
  "rounded-full border border-border bg-white/30 px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/50 hover:text-foreground transition";

export const adminCategories = [
  {
    title: "Management",
    sections: [
      { id: "marketing-interns", label: "Marketing Interns" },
      { id: "members", label: "Members" },
    ],
  },
  {
    title: "System",
    sections: [
      { id: "dashboard", label: "Dashboard" },
      { id: "version-history", label: "Version History" },
    ],
  },
  {
    title: "Tools",
    sections: [
      { id: "website-editor", label: "Website Editor" },
      { id: "navigation-editor", label: "Navigation Editor" },
    ],
  },
] as const;
