import {
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  setDoc,
  serverTimestamp,
  type Timestamp,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";
import { normalizeVolunteerId, volunteerDocId } from "./volunteer-session";

export const VOLUNTEER_IDS_COLLECTION = "volunteer_ids";
export const VOLUNTEER_COUNTERS_COLLECTION = "volunteer_counters";
const LOCAL_COUNTER_KEY = "axiom-volunteer-id-counter";

export type VolunteerIdStatus = "unused" | "assigned" | "active" | "completed";

export type VolunteerIdRecord = {
  id: string;
  firstName: string;
  lastName: string;
  status: VolunteerIdStatus;
  notes: string;
  createdAt: string;
  assignedAt: string | null;
  activatedAt: string | null;
};

function asIso(value: unknown, fallback: string) {
  if (typeof value === "string" && value) return value;
  if (value && typeof value === "object" && "toDate" in value) {
    try {
      return (value as Timestamp).toDate().toISOString();
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export function formatVolunteerId(year: number, sequence: number) {
  return `AX-${year}-${String(sequence).padStart(4, "0")}`;
}

export function isVolunteerIdFormat(value: string) {
  return /^AX-\d{4}-\d{4}$/i.test(normalizeVolunteerId(value));
}

function localNextSequence(year: number) {
  if (typeof localStorage === "undefined") return 1;
  try {
    const raw = localStorage.getItem(LOCAL_COUNTER_KEY);
    const parsed = raw ? (JSON.parse(raw) as { year?: number; sequence?: number }) : null;
    const next =
      parsed?.year === year && typeof parsed.sequence === "number" ? parsed.sequence + 1 : 1;
    localStorage.setItem(LOCAL_COUNTER_KEY, JSON.stringify({ year, sequence: next }));
    return next;
  } catch {
    return Date.now() % 10000;
  }
}

function volunteerIdRef(id: string) {
  const db = getFirebaseDb();
  if (!db) return null;
  return doc(db, VOLUNTEER_IDS_COLLECTION, volunteerDocId(id));
}

function normalizeRecord(id: string, data: Partial<VolunteerIdRecord> | null | undefined): VolunteerIdRecord {
  const now = new Date().toISOString();
  return {
    id: normalizeVolunteerId(id),
    firstName: typeof data?.firstName === "string" ? data.firstName : "",
    lastName: typeof data?.lastName === "string" ? data.lastName : "",
    status: (data?.status as VolunteerIdStatus) || "unused",
    notes: typeof data?.notes === "string" ? data.notes : "",
    createdAt: asIso(data?.createdAt, now),
    assignedAt: data?.assignedAt ? asIso(data.assignedAt, "") || null : null,
    activatedAt: data?.activatedAt ? asIso(data.activatedAt, "") || null : null,
  };
}

export async function getVolunteerIdRecord(id: string): Promise<VolunteerIdRecord | null> {
  const ref = volunteerIdRef(id);
  if (!ref) return null;
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return normalizeRecord(id, snapshot.data() as Partial<VolunteerIdRecord>);
}

export async function listVolunteerIdRecords(): Promise<VolunteerIdRecord[]> {
  const db = getFirebaseDb();
  if (!db) return [];
  const snapshot = await getDocs(collection(db, VOLUNTEER_IDS_COLLECTION));
  return snapshot.docs
    .map((item) => normalizeRecord(item.id, item.data() as Partial<VolunteerIdRecord>))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function nextSequenceForYear(year: number) {
  const db = getFirebaseDb();
  if (db) {
    const counterRef = doc(db, VOLUNTEER_COUNTERS_COLLECTION, String(year));
    const snap = await getDoc(counterRef);
    if (snap.exists()) {
      const sequence = snap.data()?.sequence;
      if (typeof sequence === "number") return sequence + 1;
    }
  }

  const records = await listVolunteerIdRecords();
  const prefix = `AX-${year}-`;
  let max = 0;
  for (const record of records) {
    if (!record.id.toUpperCase().startsWith(prefix)) continue;
    const suffix = Number(record.id.slice(prefix.length));
    if (!Number.isNaN(suffix)) max = Math.max(max, suffix);
  }
  return max + 1;
}

export async function generateVolunteerIdForSignup(
  firstName: string,
  lastName: string,
): Promise<VolunteerIdRecord> {
  const trimmedFirst = firstName.trim();
  const trimmedLast = lastName.trim();
  if (!trimmedFirst || !trimmedLast) {
    throw new Error("Enter your first and last name.");
  }

  const db = getFirebaseDb();
  const year = new Date().getFullYear();
  const now = new Date().toISOString();

  if (db) {
    const counterRef = doc(db, VOLUNTEER_COUNTERS_COLLECTION, String(year));
    const id = await runTransaction(db, async (transaction) => {
      const counterSnap = await transaction.get(counterRef);
      let next = 1;
      if (counterSnap.exists()) {
        const sequence = counterSnap.data()?.sequence;
        if (typeof sequence === "number") next = sequence + 1;
      }

      const candidateId = formatVolunteerId(year, next);
      const idRef = doc(db, VOLUNTEER_IDS_COLLECTION, volunteerDocId(candidateId));
      const existing = await transaction.get(idRef);
      if (existing.exists()) {
        throw new Error("Could not assign a unique Volunteer ID. Please try again.");
      }

      transaction.set(counterRef, { sequence: next, updatedAt: serverTimestamp() }, { merge: true });
      transaction.set(idRef, {
        id: candidateId,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        status: "active",
        notes: "",
        createdAt: now,
        assignedAt: now,
        activatedAt: now,
        updatedAt: serverTimestamp(),
      });
      return candidateId;
    });

    return normalizeRecord(id, {
      id,
      firstName: trimmedFirst,
      lastName: trimmedLast,
      status: "active",
      createdAt: now,
      assignedAt: now,
      activatedAt: now,
    });
  }

  const sequence = localNextSequence(year);
  const id = formatVolunteerId(year, sequence);
  return {
    id,
    firstName: trimmedFirst,
    lastName: trimmedLast,
    status: "active",
    notes: "",
    createdAt: now,
    assignedAt: now,
    activatedAt: now,
  };
}

export async function createVolunteerId(options?: {
  firstName?: string;
  lastName?: string;
  notes?: string;
  id?: string;
}): Promise<VolunteerIdRecord> {
  const ref = volunteerIdRef(options?.id ?? "");
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase is not configured.");

  const year = new Date().getFullYear();
  const id = normalizeVolunteerId(options?.id || formatVolunteerId(year, await nextSequenceForYear(year)));
  const targetRef = volunteerIdRef(id);
  if (!targetRef) throw new Error("Firebase is not configured.");

  const existing = await getDoc(targetRef);
  if (existing.exists()) throw new Error(`Volunteer ID ${id} already exists.`);

  const hasName = Boolean(options?.firstName?.trim() || options?.lastName?.trim());
  const now = new Date().toISOString();
  const record: VolunteerIdRecord = {
    id,
    firstName: options?.firstName?.trim() ?? "",
    lastName: options?.lastName?.trim() ?? "",
    status: hasName ? "assigned" : "unused",
    notes: options?.notes?.trim() ?? "",
    createdAt: now,
    assignedAt: hasName ? now : null,
    activatedAt: null,
  };

  await setDoc(targetRef, { ...record, updatedAt: serverTimestamp() });
  return record;
}

export async function createVolunteerIdBatch(count: number) {
  const created: VolunteerIdRecord[] = [];
  for (let i = 0; i < count; i += 1) {
    created.push(await createVolunteerId());
  }
  return created;
}

export async function markVolunteerIdActivated(id: string, firstName: string, lastName: string) {
  const ref = volunteerIdRef(id);
  if (!ref) return;
  const existing = await getDoc(ref);
  const now = new Date().toISOString();
  if (!existing.exists()) {
    await setDoc(ref, {
      id: normalizeVolunteerId(id),
      firstName,
      lastName,
      status: "active",
      notes: "",
      createdAt: now,
      assignedAt: now,
      activatedAt: now,
      updatedAt: serverTimestamp(),
    });
    return;
  }
  const current = normalizeRecord(id, existing.data() as Partial<VolunteerIdRecord>);
  await setDoc(ref, {
    ...current,
    firstName: firstName || current.firstName,
    lastName: lastName || current.lastName,
    status: current.status === "completed" ? "completed" : "active",
    activatedAt: current.activatedAt || now,
    updatedAt: serverTimestamp(),
  });
}

export async function markVolunteerIdCompleted(id: string) {
  const ref = volunteerIdRef(id);
  if (!ref) return;
  const existing = await getDoc(ref);
  if (!existing.exists()) return;
  const current = normalizeRecord(id, existing.data() as Partial<VolunteerIdRecord>);
  await setDoc(ref, {
    ...current,
    status: "completed",
    updatedAt: serverTimestamp(),
  });
}

export function validateVolunteerIdFormat(id: string): { ok: true; id: string } | { ok: false; error: string } {
  const normalized = normalizeVolunteerId(id);
  if (!isVolunteerIdFormat(normalized)) {
    return {
      ok: false,
      error: "Enter a valid Volunteer ID in the format AX-2026-0042.",
    };
  }
  return { ok: true, id: normalized };
}
