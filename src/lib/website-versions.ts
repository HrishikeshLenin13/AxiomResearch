import {
  markStoreFetchFailed,
  markStoreSynced,
  markStoreWriteFailed,
  warnLocalMigration,
} from "./data-sync-status";
import {
  loadWebsiteContent,
  saveWebsiteContent,
  type WebsiteContentStore,
} from "./website-content";
import { isSupabaseConfigured, supabase } from "./supabase";
import { notifyWebsiteContentChanged, notifyWebsiteVersionsChanged } from "./sync-events";

export const WEBSITE_VERSIONS_KEY = "axiom-website-versions";
export { WEBSITE_CONTENT_CHANGED_EVENT } from "./sync-events";

export type WebsiteContentVersion = {
  id: string;
  timestamp: number;
  label: string;
  data: WebsiteContentStore;
};

type WebsiteVersionRow = {
  id: string;
  label: string;
  timestamp: number;
  data: WebsiteContentStore;
};

type RemoteFetchResult =
  | { ok: true; data: WebsiteContentVersion[] }
  | { ok: false; error: string };

const STORE = "website_versions" as const;

function notifyLocalStorageSync(key: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new StorageEvent("storage", { key }));
}

let versionsCache: WebsiteContentVersion[] | null = null;
let hydratePromise: Promise<void> | null = null;

function loadWebsiteVersionsFromLocalStorage(): WebsiteContentVersion[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(WEBSITE_VERSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (entry): entry is WebsiteContentVersion =>
          entry &&
          typeof entry.id === "string" &&
          typeof entry.timestamp === "number" &&
          typeof entry.label === "string" &&
          entry.data &&
          typeof entry.data === "object",
      )
      .sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

function saveWebsiteVersionsToLocalStorage(versions: WebsiteContentVersion[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WEBSITE_VERSIONS_KEY, JSON.stringify(versions));
}

function rowsToWebsiteVersions(rows: WebsiteVersionRow[]): WebsiteContentVersion[] {
  return rows
    .map((row) => ({
      id: row.id,
      label: row.label,
      timestamp: row.timestamp,
      data: row.data,
    }))
    .sort((a, b) => b.timestamp - a.timestamp);
}

async function fetchWebsiteVersionsFromSupabase(): Promise<RemoteFetchResult> {
  if (!supabase) return { ok: false, error: "Supabase client unavailable." };
  const { data, error } = await supabase
    .from("website_versions")
    .select("id, label, timestamp, data")
    .order("timestamp", { ascending: false });
  if (error) return { ok: false, error: error.message };
  return { ok: true, data: rowsToWebsiteVersions((data ?? []) as WebsiteVersionRow[]) };
}

async function insertWebsiteVersionToSupabase(version: WebsiteContentVersion): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from("website_versions").insert({
    id: version.id,
    label: version.label,
    timestamp: version.timestamp,
    data: version.data,
  });
  if (error) {
    markStoreWriteFailed(STORE, error.message);
    return false;
  }
  return true;
}

async function upsertWebsiteVersionsToSupabase(versions: WebsiteContentVersion[]): Promise<boolean> {
  if (!supabase || versions.length === 0) return false;
  const { error } = await supabase.from("website_versions").upsert(
    versions.map((version) => ({
      id: version.id,
      label: version.label,
      timestamp: version.timestamp,
      data: version.data,
    })),
    { onConflict: "id" },
  );
  if (error) {
    markStoreWriteFailed(STORE, error.message);
    return false;
  }
  return true;
}

async function hydrateWebsiteVersions() {
  if (!isSupabaseConfigured()) return;

  const remoteResult = await fetchWebsiteVersionsFromSupabase();
  const local = loadWebsiteVersionsFromLocalStorage();

  if (remoteResult.ok) {
    const remote = remoteResult.data;

    if (remote.length > 0) {
      versionsCache = remote;
      saveWebsiteVersionsToLocalStorage(remote);
      markStoreSynced(STORE, "supabase");
      notifyLocalStorageSync(WEBSITE_VERSIONS_KEY);
      return;
    }

    if (local.length > 0) {
      warnLocalMigration(STORE);
      versionsCache = local;
      const migrated = await upsertWebsiteVersionsToSupabase(local);
      if (migrated) markStoreSynced(STORE, "supabase");
      return;
    }

    versionsCache = remote;
    saveWebsiteVersionsToLocalStorage(remote);
    markStoreSynced(STORE, "supabase");
    return;
  }

  markStoreFetchFailed(STORE, remoteResult.error);
  versionsCache = local;
}

function ensureWebsiteVersionsHydrated() {
  if (typeof window === "undefined") return;
  if (!hydratePromise) {
    hydratePromise = hydrateWebsiteVersions().finally(() => {
      hydratePromise = null;
    });
  }
}

function persistWebsiteVersions(versions: WebsiteContentVersion[]) {
  versionsCache = versions;
  saveWebsiteVersionsToLocalStorage(versions);
}

export { notifyWebsiteContentChanged, WEBSITE_VERSIONS_CHANGED_EVENT } from "./sync-events";

export function loadWebsiteVersions(): WebsiteContentVersion[] {
  if (!versionsCache) {
    versionsCache = loadWebsiteVersionsFromLocalStorage();
    ensureWebsiteVersionsHydrated();
  }
  return versionsCache;
}

export function saveWebsiteVersion(): WebsiteContentVersion {
  const versions = loadWebsiteVersions();
  const version: WebsiteContentVersion = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    label: `Version ${versions.length + 1}`,
    data: loadWebsiteContent(),
  };
  persistWebsiteVersions([version, ...versions]);
  notifyWebsiteVersionsChanged();

  if (isSupabaseConfigured()) {
    void insertWebsiteVersionToSupabase(version).then((saved) => {
      if (saved) markStoreSynced(STORE, "supabase");
    });
  }

  return version;
}

export function restoreWebsiteVersion(id: string): WebsiteContentVersion | null {
  const version = loadWebsiteVersions().find((entry) => entry.id === id);
  if (!version) return null;
  saveWebsiteContent(version.data);
  notifyWebsiteContentChanged();
  notifyWebsiteVersionsChanged();
  return version;
}

if (typeof window !== "undefined") {
  window.addEventListener("focus", () => {
    void hydrateWebsiteVersions();
  });
  ensureWebsiteVersionsHydrated();
}
