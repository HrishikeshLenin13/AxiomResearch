import { isSupabaseConfigured, supabase } from "./supabase";

export type DataStore = "website_content" | "website_versions" | "marketing_interns";

export type StoreSyncSnapshot = {
  store: DataStore;
  source: "supabase" | "localStorage";
  usingFallback: boolean;
  fallbackReason: string | null;
  lastError: string | null;
  lastSyncedAt: number | null;
};

export type DataSyncStatus = {
  supabaseConfigured: boolean;
  supabaseVerified: boolean;
  verificationErrors: string[];
  stores: Record<DataStore, StoreSyncSnapshot>;
};

const DATA_STORES: DataStore[] = ["website_content", "website_versions", "marketing_interns"];

const SUPABASE_TABLES = [
  "website_content",
  "website_versions",
  "marketing_interns",
  "members",
] as const;

function createDefaultSnapshot(store: DataStore): StoreSyncSnapshot {
  return {
    store,
    source: "localStorage",
    usingFallback: !isSupabaseConfigured(),
    fallbackReason: isSupabaseConfigured() ? null : "Supabase environment variables are not set.",
    lastError: null,
    lastSyncedAt: null,
  };
}

const storeSnapshots = DATA_STORES.reduce(
  (snapshots, store) => {
    snapshots[store] = createDefaultSnapshot(store);
    return snapshots;
  },
  {} as Record<DataStore, StoreSyncSnapshot>,
);

let supabaseVerified = false;
const verificationErrors: string[] = [];
const warnedCodes = new Set<string>();
let verifyPromise: Promise<boolean> | null = null;

export function getDataSyncStatus(): DataSyncStatus {
  return {
    supabaseConfigured: isSupabaseConfigured(),
    supabaseVerified,
    verificationErrors: [...verificationErrors],
    stores: DATA_STORES.reduce(
      (stores, store) => {
        stores[store] = { ...storeSnapshots[store] };
        return stores;
      },
      {} as Record<DataStore, StoreSyncSnapshot>,
    ),
  };
}

export function isStoreUsingLocalFallback(store: DataStore) {
  return storeSnapshots[store].usingFallback;
}

function updateStoreSnapshot(store: DataStore, patch: Partial<StoreSyncSnapshot>) {
  storeSnapshots[store] = { ...storeSnapshots[store], ...patch, store };
}

export function warnDataSync(
  store: DataStore,
  code: string,
  message: string,
  detail?: unknown,
  options?: { repeat?: boolean },
) {
  const warningKey = `${store}:${code}`;
  if (!options?.repeat && warnedCodes.has(warningKey)) return;
  warnedCodes.add(warningKey);

  console.warn(`[Axiom Data Sync][${store}] ${message}`, detail ?? "");
  updateStoreSnapshot(store, {
    usingFallback: true,
    fallbackReason: message,
    lastError: typeof detail === "string" ? detail : message,
  });
}

export function clearDataSyncWarning(store: DataStore, code: string) {
  warnedCodes.delete(`${store}:${code}`);
}

export function markStoreSynced(store: DataStore, source: "supabase" | "localStorage") {
  updateStoreSnapshot(store, {
    source,
    usingFallback: source === "localStorage" && isSupabaseConfigured(),
    fallbackReason: source === "localStorage" && isSupabaseConfigured()
      ? storeSnapshots[store].fallbackReason
      : null,
    lastError: null,
    lastSyncedAt: Date.now(),
  });

  if (source === "supabase") {
    clearDataSyncWarning(store, "fetch-failed");
    clearDataSyncWarning(store, "write-failed");
    updateStoreSnapshot(store, { usingFallback: false, fallbackReason: null });
  }
}

export function markStoreFetchFailed(store: DataStore, error: string) {
  warnDataSync(
    store,
    "fetch-failed",
    "Supabase read failed. Serving localStorage data until connection recovers.",
    error,
  );
  updateStoreSnapshot(store, {
    source: "localStorage",
    usingFallback: true,
    fallbackReason: "Supabase read failed.",
    lastError: error,
  });
}

export function markStoreWriteFailed(store: DataStore, error: string) {
  warnDataSync(
    store,
    "write-failed",
    "Supabase write failed. Changes were saved to localStorage only.",
    error,
    { repeat: true },
  );
  updateStoreSnapshot(store, {
    lastError: error,
    usingFallback: true,
    fallbackReason: "Latest write did not reach Supabase.",
  });
}

export function warnLocalMigration(store: DataStore, detail?: string) {
  warnDataSync(
    store,
    "local-migration",
    "Supabase is empty. Migrating existing localStorage data to Supabase.",
    detail,
  );
}

export function warnUnconfiguredBackend() {
  for (const store of DATA_STORES) {
    warnDataSync(
      store,
      "unconfigured",
      "Supabase is not configured (missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY). Using localStorage only.",
    );
  }
}

export async function verifySupabaseConnection(): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    warnUnconfiguredBackend();
    supabaseVerified = false;
    return false;
  }

  if (!supabase) {
    verificationErrors.splice(0, verificationErrors.length, "Supabase client failed to initialize.");
    supabaseVerified = false;
    return false;
  }

  verificationErrors.length = 0;

  for (const table of SUPABASE_TABLES) {
    const { error } = await supabase.from(table).select("*", { head: true, count: "exact" });
    if (error) {
      verificationErrors.push(`${table}: ${error.message}`);
    }
  }

  if (verificationErrors.length > 0) {
    supabaseVerified = false;
    for (const store of DATA_STORES) {
      warnDataSync(
        store,
        "verification-failed",
        "Supabase verification failed. Data may fall back to localStorage.",
        verificationErrors.join(" | "),
      );
    }
    return false;
  }

  supabaseVerified = true;
  for (const store of DATA_STORES) {
    clearDataSyncWarning(store, "verification-failed");
    clearDataSyncWarning(store, "unconfigured");
  }
  return true;
}

export function ensureSupabaseVerified() {
  if (typeof window === "undefined") return;
  if (!verifyPromise) {
    verifyPromise = verifySupabaseConnection().finally(() => {
      verifyPromise = null;
    });
  }
}

if (typeof window !== "undefined") {
  ensureSupabaseVerified();
  if (import.meta.env.DEV) {
    (window as Window & { __axiomDataSyncStatus?: () => DataSyncStatus }).__axiomDataSyncStatus =
      getDataSyncStatus;
  }
}
