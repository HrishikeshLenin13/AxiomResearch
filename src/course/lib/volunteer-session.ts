export type VolunteerIdentity = {
  volunteerId: string;
  firstName: string;
  lastName: string;
};

export const VOLUNTEER_ACCESS_SESSION_KEY = "axiom-volunteer-access";
export const VOLUNTEER_IDENTITY_SESSION_KEY = "axiom-volunteer-identity";
export const VOLUNTEER_ACCESS_CODE_KEY = "axiom-volunteer-access-code";

export function readAccessGranted() {
  if (typeof sessionStorage === "undefined") return false;
  return sessionStorage.getItem(VOLUNTEER_ACCESS_SESSION_KEY) === "granted";
}

export function writeAccessGranted() {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(VOLUNTEER_ACCESS_SESSION_KEY, "granted");
}

export function clearAccessGranted() {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem(VOLUNTEER_ACCESS_SESSION_KEY);
  sessionStorage.removeItem(VOLUNTEER_ACCESS_CODE_KEY);
}

export function writeAccessCodeUsed(code: string) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(VOLUNTEER_ACCESS_CODE_KEY, code.trim());
}

export function readAccessCodeUsed() {
  if (typeof sessionStorage === "undefined") return "";
  return sessionStorage.getItem(VOLUNTEER_ACCESS_CODE_KEY) ?? "";
}

export function readVolunteerIdentity(): VolunteerIdentity | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(VOLUNTEER_IDENTITY_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<VolunteerIdentity>;
    if (!parsed.volunteerId || !parsed.firstName || !parsed.lastName) return null;
    return {
      volunteerId: parsed.volunteerId,
      firstName: parsed.firstName,
      lastName: parsed.lastName,
    };
  } catch {
    return null;
  }
}

export function writeVolunteerIdentity(identity: VolunteerIdentity) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(VOLUNTEER_IDENTITY_SESSION_KEY, JSON.stringify(identity));
}

export function clearVolunteerIdentity() {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.removeItem(VOLUNTEER_IDENTITY_SESSION_KEY);
}

export function namesMatch(left: string, right: string) {
  return left.trim().toLowerCase() === right.trim().toLowerCase();
}

export function normalizeVolunteerId(value: string) {
  return value.trim();
}

export function volunteerDocId(volunteerId: string) {
  return normalizeVolunteerId(volunteerId).replaceAll("/", "_");
}

export function isValidVolunteerId(value: string) {
  return normalizeVolunteerId(value).length >= 3;
}

function clientFallbackCodes() {
  const raw = import.meta.env.VITE_VOLUNTEER_ACCESS_CODES ?? "";
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function verifyVolunteerAccessCode(code: string) {
  const submitted = code.trim();
  if (!submitted) return false;

  try {
    const response = await fetch("/api/volunteer-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: submitted }),
    });
    if (response.ok) {
      const data = (await response.json()) as { ok?: boolean };
      if (typeof data.ok === "boolean") return data.ok;
    }
  } catch {
    // Fall through to the optional client env list for static preview.
  }

  return clientFallbackCodes().includes(submitted);
}
