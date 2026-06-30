import {
  markStoreFetchFailed,
  markStoreSynced,
  markStoreWriteFailed,
  warnLocalMigration,
} from "./data-sync-status";
import { isSupabaseConfigured, supabase } from "./supabase";
import { notifyWebsiteContentChanged } from "./sync-events";

export type WebsiteContentSection = {
  heading: string;
  body: string;
};

export type WebsitePageContent = {
  title: string;
  sections: WebsiteContentSection[];
};

export const WEBSITE_CONTENT_KEY = "axiom-website-content";

export const WEBSITE_PAGE_KEYS = [
  "home",
  "about",
  "programs",
  "course",
  "volunteer",
  "careers",
  "research",
  "faq",
  "contact",
] as const;

export type WebsitePageKey = (typeof WEBSITE_PAGE_KEYS)[number];

export type WebsiteContentStore = Record<WebsitePageKey, WebsitePageContent>;

type WebsiteContentRow = {
  page_key: string;
  title: string;
  sections: WebsiteContentSection[];
};

type RemoteFetchResult =
  | { ok: true; data: WebsiteContentStore }
  | { ok: false; error: string };

const STORE = "website_content" as const;

let contentCache: WebsiteContentStore | null = null;
let hydratePromise: Promise<void> | null = null;

function createEmptyPageContent(): WebsitePageContent {
  return {
    title: "",
    sections: [{ heading: "", body: "" }],
  };
}

function createDefaultContent(): WebsiteContentStore {
  return WEBSITE_PAGE_KEYS.reduce((store, key) => {
    store[key] = createEmptyPageContent();
    return store;
  }, {} as WebsiteContentStore);
}

function normalizePageContent(page: Partial<WebsitePageContent> | undefined): WebsitePageContent {
  if (!page || typeof page.title !== "string" || !Array.isArray(page.sections)) {
    return createEmptyPageContent();
  }
  return {
    title: page.title,
    sections: page.sections.map((section) => ({
      heading: typeof section?.heading === "string" ? section.heading : "",
      body: typeof section?.body === "string" ? section.body : "",
    })),
  };
}

function mergeWebsiteContent(parsed: Partial<WebsiteContentStore>): WebsiteContentStore {
  const defaults = createDefaultContent();
  for (const key of WEBSITE_PAGE_KEYS) {
    defaults[key] = normalizePageContent(parsed[key]);
  }
  return defaults;
}

function hasWebsiteContentData(content: WebsiteContentStore) {
  return WEBSITE_PAGE_KEYS.some((key) => {
    const page = content[key];
    return Boolean(page.title.trim()) || page.sections.some((section) => section.heading.trim() || section.body.trim());
  });
}

function loadWebsiteContentFromLocalStorage(): WebsiteContentStore {
  try {
    if (typeof window === "undefined") return createDefaultContent();
    const raw = localStorage.getItem(WEBSITE_CONTENT_KEY);
    if (!raw) return createDefaultContent();
    return mergeWebsiteContent(JSON.parse(raw) as Partial<WebsiteContentStore>);
  } catch {
    return createDefaultContent();
  }
}

function saveWebsiteContentToLocalStorage(content: WebsiteContentStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WEBSITE_CONTENT_KEY, JSON.stringify(content));
}

function rowsToWebsiteContentStore(rows: WebsiteContentRow[]): WebsiteContentStore {
  const store = createDefaultContent();
  for (const row of rows) {
    const key = row.page_key as WebsitePageKey;
    if (!WEBSITE_PAGE_KEYS.includes(key)) continue;
    store[key] = normalizePageContent({
      title: row.title,
      sections: row.sections,
    });
  }
  return store;
}

async function fetchWebsiteContentFromSupabase(): Promise<RemoteFetchResult> {
  if (!supabase) return { ok: false, error: "Supabase client unavailable." };
  const { data, error } = await supabase.from("website_content").select("page_key, title, sections");
  if (error) return { ok: false, error: error.message };
  if (!data?.length) return { ok: true, data: createDefaultContent() };
  return { ok: true, data: rowsToWebsiteContentStore(data as WebsiteContentRow[]) };
}

async function upsertWebsiteContentToSupabase(content: WebsiteContentStore): Promise<boolean> {
  if (!supabase) return false;
  const rows = WEBSITE_PAGE_KEYS.map((key) => ({
    page_key: key,
    title: content[key].title,
    sections: content[key].sections,
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabase.from("website_content").upsert(rows, { onConflict: "page_key" });
  if (error) {
    markStoreWriteFailed(STORE, error.message);
    return false;
  }
  return true;
}

async function hydrateWebsiteContent() {
  if (!isSupabaseConfigured()) return;

  const remoteResult = await fetchWebsiteContentFromSupabase();
  const local = loadWebsiteContentFromLocalStorage();

  if (remoteResult.ok) {
    const remote = remoteResult.data;

    if (hasWebsiteContentData(remote)) {
      contentCache = remote;
      saveWebsiteContentToLocalStorage(remote);
      markStoreSynced(STORE, "supabase");
      notifyWebsiteContentChanged();
      return;
    }

    if (hasWebsiteContentData(local)) {
      warnLocalMigration(STORE);
      contentCache = local;
      const migrated = await upsertWebsiteContentToSupabase(local);
      if (migrated) markStoreSynced(STORE, "supabase");
      return;
    }

    contentCache = remote;
    saveWebsiteContentToLocalStorage(remote);
    markStoreSynced(STORE, "supabase");
    return;
  }

  markStoreFetchFailed(STORE, remoteResult.error);
  contentCache = local;
}

function ensureWebsiteContentHydrated() {
  if (typeof window === "undefined") return;
  if (!hydratePromise) {
    hydratePromise = hydrateWebsiteContent().finally(() => {
      hydratePromise = null;
    });
  }
}

export function loadWebsiteContent(): WebsiteContentStore {
  if (!contentCache) {
    contentCache = loadWebsiteContentFromLocalStorage();
    ensureWebsiteContentHydrated();
  }
  return contentCache;
}

export function saveWebsiteContent(content: WebsiteContentStore) {
  contentCache = content;
  saveWebsiteContentToLocalStorage(content);
  notifyWebsiteContentChanged();

  if (!isSupabaseConfigured()) return;

  void upsertWebsiteContentToSupabase(content).then((saved) => {
    if (saved) markStoreSynced(STORE, "supabase");
  });
}

export function getPageContent(key: WebsitePageKey): WebsitePageContent {
  return loadWebsiteContent()[key];
}

export function updatePageContent(key: WebsitePageKey, page: WebsitePageContent) {
  const content = loadWebsiteContent();
  content[key] = page;
  saveWebsiteContent(content);
  return content;
}

if (typeof window !== "undefined") {
  window.addEventListener("focus", () => {
    void hydrateWebsiteContent();
  });
  ensureWebsiteContentHydrated();
}
