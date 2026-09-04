import { normalizeCourseProgress, type CourseProgressDoc } from "./progress";
import { volunteerDocId, type VolunteerIdentity } from "./volunteer-session";

export const VOLUNTEER_REGISTRY_KEY = "axiom-volunteer-registry";
export const VOLUNTEER_PROGRESS_PREFIX = "axiom-volunteer-progress:";

function progressKey(volunteerId: string) {
  return `${VOLUNTEER_PROGRESS_PREFIX}${volunteerDocId(volunteerId)}`;
}

export function readVolunteerRegistry(): string[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(VOLUNTEER_REGISTRY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function addVolunteerToRegistry(volunteerId: string) {
  if (typeof localStorage === "undefined") return;
  const id = volunteerDocId(volunteerId);
  const next = Array.from(new Set([...readVolunteerRegistry(), id]));
  localStorage.setItem(VOLUNTEER_REGISTRY_KEY, JSON.stringify(next));
}

export function loadLocalVolunteerProgress(volunteerId: string): CourseProgressDoc | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(progressKey(volunteerId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CourseProgressDoc>;
    return normalizeCourseProgress(parsed.email || "", parsed);
  } catch {
    return null;
  }
}

export function writeLocalVolunteerProgress(progress: CourseProgressDoc) {
  if (typeof localStorage === "undefined" || !progress.volunteerId) return;
  localStorage.setItem(progressKey(progress.volunteerId), JSON.stringify(progress));
  addVolunteerToRegistry(progress.volunteerId);
}

export function listLocalVolunteerProgress(): CourseProgressDoc[] {
  return readVolunteerRegistry()
    .map((id) => loadLocalVolunteerProgress(id))
    .filter((doc): doc is CourseProgressDoc => Boolean(doc?.volunteerId));
}

export function identityFromProgress(progress: CourseProgressDoc): VolunteerIdentity | null {
  if (!progress.volunteerId || !progress.firstName || !progress.lastName) return null;
  return {
    volunteerId: progress.volunteerId,
    firstName: progress.firstName,
    lastName: progress.lastName,
  };
}
