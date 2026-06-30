export const WEBSITE_CONTENT_CHANGED_EVENT = "axiom-website-content-changed";
export const WEBSITE_VERSIONS_CHANGED_EVENT = "axiom-website-versions-changed";
export const MARKETING_INTERNS_CHANGED_EVENT = "axiom-marketing-interns-changed";

export function notifyWebsiteContentChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(WEBSITE_CONTENT_CHANGED_EVENT));
}

export function notifyWebsiteVersionsChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(WEBSITE_VERSIONS_CHANGED_EVENT));
}

export function notifyMarketingInternsChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(MARKETING_INTERNS_CHANGED_EVENT));
}
