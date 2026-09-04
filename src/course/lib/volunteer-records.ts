import {
  deleteCourseProgress,
  emptyCourseProgress,
  getCourseProgress,
  isVolunteerDeleted,
  listRemoteCourseProgress,
  saveCourseProgress,
  type CourseProgressDoc,
} from "./progress";
import {
  loadLocalVolunteerProgress,
  listLocalVolunteerProgress,
  removeLocalVolunteerProgress,
  writeLocalVolunteerProgress,
} from "./volunteer-cache";
import {
  deleteVolunteerIdRecord,
  generateVolunteerIdForSignup,
  getVolunteerIdRecord,
  validateVolunteerIdFormat,
} from "./volunteer-ids";
import {
  normalizeVolunteerId,
  readAccessCodeUsed,
  type VolunteerIdentity,
} from "./volunteer-session";

export type IdentifyVolunteerResult =
  | { ok: true; progress: CourseProgressDoc; identity: VolunteerIdentity }
  | { ok: false; error: string };

function newerDoc(left: CourseProgressDoc | null, right: CourseProgressDoc | null) {
  if (!left) return right;
  if (!right) return left;
  return Date.parse(right.updatedAt) >= Date.parse(left.updatedAt) ? right : left;
}

export async function lookupVolunteerProgress(volunteerId: string) {
  const id = normalizeVolunteerId(volunteerId);
  if (!id) return null;
  try {
    const remote = await getCourseProgress(id);
    return newerDoc(loadLocalVolunteerProgress(id), remote);
  } catch {
    return loadLocalVolunteerProgress(id);
  }
}

export async function registerNewVolunteer(
  firstName: string,
  lastName: string,
): Promise<IdentifyVolunteerResult> {
  const trimmedFirst = firstName.trim();
  const trimmedLast = lastName.trim();
  if (!trimmedFirst || !trimmedLast) {
    return { ok: false, error: "Enter your first and last name." };
  }

  try {
    const record = await generateVolunteerIdForSignup(trimmedFirst, trimmedLast);
    const identity: VolunteerIdentity = {
      volunteerId: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
    };
    const accessCodeUsed = readAccessCodeUsed();
    const created = {
      ...emptyCourseProgress("", identity),
      accessCodeUsed,
      timerSessionStartedAt: Date.now(),
    };
    return { ok: true, identity, progress: created };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not create your volunteer record.",
    };
  }
}

export async function resumeVolunteerById(volunteerId: string): Promise<IdentifyVolunteerResult> {
  const idCheck = validateVolunteerIdFormat(volunteerId);
  if (!idCheck.ok) return idCheck;

  const existing = await lookupVolunteerProgress(idCheck.id);
  const idRecord = await getVolunteerIdRecord(idCheck.id);

  if (!existing && !idRecord) {
    return {
      ok: false,
      error: "Volunteer ID not found. Check your ID or sign up as a new volunteer.",
    };
  }

  if (existing && isVolunteerDeleted(existing)) {
    return {
      ok: false,
      error: "This volunteer record was removed. Contact Axiom if you need help.",
    };
  }

  const identity: VolunteerIdentity = {
    volunteerId: idCheck.id,
    firstName: existing?.firstName || idRecord?.firstName || "",
    lastName: existing?.lastName || idRecord?.lastName || "",
  };

  if (!identity.firstName || !identity.lastName) {
    return {
      ok: false,
      error: "Volunteer ID not found. Check your ID or sign up as a new volunteer.",
    };
  }

  if (existing) {
    return {
      ok: true,
      identity: {
        volunteerId: existing.volunteerId || identity.volunteerId,
        firstName: existing.firstName,
        lastName: existing.lastName,
      },
      progress: {
        ...existing,
        volunteerId: existing.volunteerId || identity.volunteerId,
        firstName: existing.firstName,
        lastName: existing.lastName,
        accessCodeUsed: existing.accessCodeUsed || readAccessCodeUsed(),
        timerSessionStartedAt: Date.now(),
      },
    };
  }

  const accessCodeUsed = readAccessCodeUsed();
  const created = {
    ...emptyCourseProgress("", identity),
    accessCodeUsed,
    timerSessionStartedAt: Date.now(),
  };
  return { ok: true, identity, progress: created };
}

export async function identifyVolunteerRecord(
  firstName: string,
  lastName: string,
  volunteerId: string,
): Promise<IdentifyVolunteerResult> {
  return resumeVolunteerById(volunteerId);
}

export async function listVolunteerRecords(): Promise<CourseProgressDoc[]> {
  const map = new Map<string, CourseProgressDoc>();
  for (const doc of listLocalVolunteerProgress()) {
    map.set(doc.volunteerId, doc);
  }
  try {
    for (const doc of await listRemoteCourseProgress()) {
      const existing = map.get(doc.volunteerId);
      map.set(doc.volunteerId, newerDoc(existing ?? null, doc) ?? doc);
    }
  } catch (error) {
    console.warn("Unable to list Firebase volunteer records", error);
  }
  return [...map.values()].sort((a, b) =>
    Date.parse(b.lastActiveAt || b.updatedAt) - Date.parse(a.lastActiveAt || a.updatedAt),
  );
}

export function splitVolunteerRecords(records: CourseProgressDoc[]) {
  const active = records.filter((row) => !isVolunteerDeleted(row));
  const deleted = records
    .filter((row) => isVolunteerDeleted(row))
    .sort((a, b) => Date.parse(b.deletedAt || b.updatedAt) - Date.parse(a.deletedAt || a.updatedAt));
  return { active, deleted };
}

export async function softDeleteVolunteerRecord(volunteerId: string) {
  const id = normalizeVolunteerId(volunteerId);
  if (!id) throw new Error("Invalid volunteer ID.");

  const existing = await lookupVolunteerProgress(id);
  if (!existing) throw new Error("Volunteer not found.");
  if (isVolunteerDeleted(existing)) return existing;

  const now = new Date().toISOString();
  const next: CourseProgressDoc = {
    ...existing,
    deletedAt: now,
    updatedAt: now,
  };
  await saveCourseProgress(id, next);
  writeLocalVolunteerProgress(next);
  return next;
}

export async function permanentlyDeleteVolunteerRecord(volunteerId: string) {
  const id = normalizeVolunteerId(volunteerId);
  if (!id) throw new Error("Invalid volunteer ID.");

  const existing = await lookupVolunteerProgress(id);
  if (!existing) throw new Error("Volunteer not found.");
  if (!isVolunteerDeleted(existing)) {
    throw new Error("Move the volunteer to Recently deleted before deleting forever.");
  }

  await deleteCourseProgress(id);
  await deleteVolunteerIdRecord(id);
  removeLocalVolunteerProgress(id);
}
