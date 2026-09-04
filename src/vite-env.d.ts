/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_ADMIN_PASSWORD?: string;
  readonly VITE_AXIOM_WEBSITE_URL?: string;
  readonly VITE_COURSE_URL?: string;
  readonly VITE_FIREBASE_API_KEY?: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN?: string;
  readonly VITE_FIREBASE_PROJECT_ID?: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET?: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  readonly VITE_FIREBASE_APP_ID?: string;
  readonly VITE_GOOGLE_SHEETS_WEBHOOK_URL?: string;
  readonly VITE_VOLUNTEER_ACCESS_CODES?: string;
  readonly VITE_REQUIRE_PREREGISTERED_VOLUNTEER_IDS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
