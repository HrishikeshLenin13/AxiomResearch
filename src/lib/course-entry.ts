/** Public URL of the standalone course. Leave unset to use /learn on this origin. */
export function getCourseEntryUrl() {
  const configured = import.meta.env.VITE_COURSE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  return "/learn";
}

export function isExternalCourseUrl() {
  return getCourseEntryUrl().startsWith("http");
}
