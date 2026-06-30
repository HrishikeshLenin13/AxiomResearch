import {
  markStoreFetchFailed,
  markStoreSynced,
  markStoreWriteFailed,
  warnLocalMigration,
} from "./data-sync-status";
import { applyInternAutomation } from "./intern-automation";
import { isSupabaseConfigured, supabase } from "./supabase";
import { notifyMarketingInternsChanged } from "./sync-events";

export type MarketingRecruit = {
  name: string;
  email: string;
  joinDate: string;
  referredBy?: string;
};

export type MarketingIntern = {
  id: string;
  name: string;
  recruits: number;
  recruitsList: MarketingRecruit[];
  certificateIssued?: boolean;
  certificateApproved?: boolean;
  mentorPromoted?: boolean;
  roleOverride?: "mentor";
};

export const MARKETING_INTERNS_KEY = "axiom-marketing-interns";

type MarketingInternRow = {
  id: string;
  name: string;
  recruits: number;
};

type MemberRow = {
  id: string;
  intern_id: string;
  name: string;
  email: string;
  join_date: string;
  referred_by: string | null;
};

type RemoteFetchResult =
  | { ok: true; data: MarketingIntern[] }
  | { ok: false; error: string };

const STORE = "marketing_interns" as const;

function notifyLocalStorageSync(key: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new StorageEvent("storage", { key }));
}

let internsCache: MarketingIntern[] | null = null;
let hydratePromise: Promise<void> | null = null;

function normalizeIntern(intern: Partial<MarketingIntern>): MarketingIntern | null {
  if (!intern || typeof intern.id !== "string" || typeof intern.name !== "string") return null;
  const recruitsList = Array.isArray(intern.recruitsList)
    ? intern.recruitsList
        .filter(
          (recruit): recruit is MarketingRecruit =>
            recruit &&
            typeof recruit.name === "string" &&
            typeof recruit.email === "string" &&
            typeof recruit.joinDate === "string",
        )
        .map((recruit) => ({
          name: recruit.name,
          email: recruit.email,
          joinDate: recruit.joinDate,
          referredBy: typeof recruit.referredBy === "string" ? recruit.referredBy : undefined,
        }))
    : [];
  return {
    id: intern.id,
    name: intern.name,
    recruits: recruitsList.length,
    recruitsList,
    certificateIssued: intern.certificateIssued === true,
    certificateApproved: intern.certificateApproved === true,
    mentorPromoted: intern.mentorPromoted === true,
    roleOverride: intern.roleOverride === "mentor" ? "mentor" : undefined,
  };
}

function mergeLocalInternFields(
  remoteInterns: MarketingIntern[],
  localInterns: MarketingIntern[],
): MarketingIntern[] {
  const localById = new Map(localInterns.map((entry) => [entry.id, entry]));
  return remoteInterns.map((intern) => {
    const local = localById.get(intern.id);
    return {
      ...intern,
      certificateIssued: local?.certificateIssued ?? intern.certificateIssued ?? false,
      certificateApproved: local?.certificateApproved ?? intern.certificateApproved ?? false,
      mentorPromoted: local?.mentorPromoted ?? intern.mentorPromoted ?? false,
      roleOverride: local?.roleOverride ?? intern.roleOverride,
    };
  });
}

function loadMarketingInternsFromLocalStorage(): MarketingIntern[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(MARKETING_INTERNS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Partial<MarketingIntern>[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeIntern).filter((intern): intern is MarketingIntern => intern !== null);
  } catch {
    return [];
  }
}

function saveMarketingInternsToLocalStorage(interns: MarketingIntern[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MARKETING_INTERNS_KEY, JSON.stringify(interns));
}

function rowsToMarketingInterns(internRows: MarketingInternRow[], memberRows: MemberRow[]): MarketingIntern[] {
  const membersByIntern = new Map<string, MarketingRecruit[]>();
  for (const member of memberRows) {
    const recruits = membersByIntern.get(member.intern_id) ?? [];
    recruits.push({
      name: member.name,
      email: member.email,
      joinDate: member.join_date,
      referredBy: member.referred_by ?? undefined,
    });
    membersByIntern.set(member.intern_id, recruits);
  }

  return internRows.map((intern) => {
    const recruitsList = membersByIntern.get(intern.id) ?? [];
    return {
      id: intern.id,
      name: intern.name,
      recruits: recruitsList.length,
      recruitsList,
    };
  });
}

async function fetchMarketingInternsFromSupabase(): Promise<RemoteFetchResult> {
  if (!supabase) return { ok: false, error: "Supabase client unavailable." };

  const { data: internRows, error: internError } = await supabase
    .from("marketing_interns")
    .select("id, name, recruits")
    .order("created_at", { ascending: true });
  if (internError) return { ok: false, error: internError.message };

  const { data: memberRows, error: memberError } = await supabase
    .from("members")
    .select("id, intern_id, name, email, join_date, referred_by")
    .order("created_at", { ascending: true });
  if (memberError) return { ok: false, error: memberError.message };

  return {
    ok: true,
    data: rowsToMarketingInterns(
      (internRows ?? []) as MarketingInternRow[],
      (memberRows ?? []) as MemberRow[],
    ),
  };
}

async function persistMarketingInternsToSupabase(interns: MarketingIntern[]): Promise<boolean> {
  if (!supabase) return false;

  const internRows = interns.map((intern) => ({
    id: intern.id,
    name: intern.name,
    recruits: intern.recruitsList.length,
  }));

  if (internRows.length > 0) {
    const { error } = await supabase.from("marketing_interns").upsert(internRows, { onConflict: "id" });
    if (error) {
      markStoreWriteFailed(STORE, error.message);
      return false;
    }
  }

  const internIds = interns.map((intern) => intern.id);

  if (internIds.length > 0) {
    const { error: deleteMembersError } = await supabase.from("members").delete().in("intern_id", internIds);
    if (deleteMembersError) {
      markStoreWriteFailed(STORE, deleteMembersError.message);
      return false;
    }
  } else {
    const { error: deleteAllMembersError } = await supabase
      .from("members")
      .delete()
      .not("intern_id", "is", null);
    if (deleteAllMembersError) {
      markStoreWriteFailed(STORE, deleteAllMembersError.message);
      return false;
    }
  }

  const memberRows = interns.flatMap((intern) =>
    intern.recruitsList.map((recruit) => ({
      intern_id: intern.id,
      name: recruit.name,
      email: recruit.email,
      join_date: recruit.joinDate,
      referred_by: recruit.referredBy ?? null,
    })),
  );

  if (memberRows.length > 0) {
    const { error: insertMembersError } = await supabase.from("members").insert(memberRows);
    if (insertMembersError) {
      markStoreWriteFailed(STORE, insertMembersError.message);
      return false;
    }
  }

  if (internIds.length > 0) {
    const { data: remoteInterns, error: selectError } = await supabase.from("marketing_interns").select("id");
    if (selectError) {
      markStoreWriteFailed(STORE, selectError.message);
      return false;
    }
    const remoteIds = (remoteInterns ?? []).map((row) => row.id as string);
    const staleIds = remoteIds.filter((id) => !internIds.includes(id));
    if (staleIds.length > 0) {
      const { error: deleteStaleError } = await supabase.from("marketing_interns").delete().in("id", staleIds);
      if (deleteStaleError) {
        markStoreWriteFailed(STORE, deleteStaleError.message);
        return false;
      }
    }
  } else {
    const { error: deleteAllInternsError } = await supabase
      .from("marketing_interns")
      .delete()
      .not("id", "is", null);
    if (deleteAllInternsError) {
      markStoreWriteFailed(STORE, deleteAllInternsError.message);
      return false;
    }
  }

  return true;
}

async function hydrateMarketingInterns() {
  if (!isSupabaseConfigured()) return;

  const remoteResult = await fetchMarketingInternsFromSupabase();
  const local = loadMarketingInternsFromLocalStorage();

  if (remoteResult.ok) {
    const remote = remoteResult.data;

    if (remote.length > 0) {
      const merged = mergeLocalInternFields(remote, local);
      saveMarketingInterns(merged);
      markStoreSynced(STORE, "supabase");
      notifyLocalStorageSync(MARKETING_INTERNS_KEY);
      return;
    }

    if (local.length > 0) {
      warnLocalMigration(STORE);
      saveMarketingInterns(local);
      return;
    }

    internsCache = remote;
    saveMarketingInternsToLocalStorage(remote);
    markStoreSynced(STORE, "supabase");
    return;
  }

  markStoreFetchFailed(STORE, remoteResult.error);
  internsCache = local;
}

function ensureMarketingInternsHydrated() {
  if (typeof window === "undefined") return;
  if (!hydratePromise) {
    hydratePromise = hydrateMarketingInterns().finally(() => {
      hydratePromise = null;
    });
  }
}

export function loadMarketingInterns(): MarketingIntern[] {
  if (!internsCache) {
    internsCache = loadMarketingInternsFromLocalStorage();
    ensureMarketingInternsHydrated();
  }
  return internsCache;
}

export function saveMarketingInterns(interns: MarketingIntern[]) {
  const previous = internsCache ?? loadMarketingInternsFromLocalStorage();
  const automated = applyInternAutomation(previous, interns);
  internsCache = automated;
  saveMarketingInternsToLocalStorage(automated);
  notifyMarketingInternsChanged();

  if (!isSupabaseConfigured()) return;

  void persistMarketingInternsToSupabase(automated).then((saved) => {
    if (saved) markStoreSynced(STORE, "supabase");
  });
}

export function createMarketingIntern(name: string): MarketingIntern {
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    recruits: 0,
    recruitsList: [],
  };
}

export function addRecruitToIntern(
  interns: MarketingIntern[],
  internId: string,
  recruit: Omit<MarketingRecruit, "joinDate">,
): MarketingIntern[] {
  const joinDate = new Date().toISOString().slice(0, 10);
  return interns.map((intern) => {
    if (intern.id !== internId) return intern;
    const entry: MarketingRecruit = { ...recruit, joinDate };
    const recruitsList = [...intern.recruitsList, entry];
    return {
      ...intern,
      recruits: recruitsList.length,
      recruitsList,
    };
  });
}

export function findInternByReferral(
  interns: MarketingIntern[],
  referredBy: string,
): MarketingIntern | undefined {
  const normalized = referredBy.trim().toLowerCase();
  if (!normalized) return undefined;
  return interns.find(
    (intern) =>
      intern.id === referredBy ||
      intern.id.toLowerCase() === normalized ||
      intern.name.trim().toLowerCase() === normalized,
  );
}

export function registerMemberReferral(
  name: string,
  email: string,
  referredBy: string | null,
): { assigned: boolean; internName?: string } {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  if (!trimmedName || !trimmedEmail) return { assigned: false };

  const interns = loadMarketingInterns();
  if (!referredBy) return { assigned: false };

  const intern = findInternByReferral(interns, referredBy);
  if (!intern) return { assigned: false };

  const next = addRecruitToIntern(interns, intern.id, {
    name: trimmedName,
    email: trimmedEmail,
    referredBy,
  });
  saveMarketingInterns(next);
  return { assigned: true, internName: intern.name };
}

if (typeof window !== "undefined") {
  window.addEventListener("focus", () => {
    void hydrateMarketingInterns();
  });
  ensureMarketingInternsHydrated();
}
