/** Main Axiom nonprofit site. Use `/` when course and site share one domain. */
export function getAxiomWebsiteUrl() {
  const configured = import.meta.env.VITE_AXIOM_WEBSITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  return "/";
}
