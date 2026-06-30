import type { Session } from "@supabase/supabase-js";
import type { Profile, UserRole } from "./auth-types";
import { isUserRole } from "./auth-types";
import { isSupabaseConfigured, supabase } from "./supabase";

export type AuthState = {
  session: Session | null;
  profile: Profile | null;
};

function normalizeProfile(row: Record<string, unknown> | null): Profile | null {
  if (!row || typeof row.id !== "string" || typeof row.email !== "string") return null;
  const role = typeof row.role === "string" && isUserRole(row.role) ? row.role : "member";
  return {
    id: row.id,
    email: row.email,
    full_name: typeof row.full_name === "string" ? row.full_name : null,
    role,
    created_at: typeof row.created_at === "string" ? row.created_at : new Date().toISOString(),
  };
}

export async function fetchProfile(userId: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("profiles").select("id, email, full_name, role, created_at").eq("id", userId).maybeSingle();
  if (error || !data) return null;
  return normalizeProfile(data as Record<string, unknown>);
}

export async function getAuthState(): Promise<AuthState> {
  if (!supabase) return { session: null, profile: null };
  const { data } = await supabase.auth.getSession();
  const session = data.session;
  if (!session) return { session: null, profile: null };
  const profile = await fetchProfile(session.user.id);
  return { session, profile };
}

export async function signInWithEmail(email: string, password: string) {
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export function hasRole(profile: Profile | null, role: UserRole) {
  return profile?.role === role;
}

export function isAdminProfile(profile: Profile | null) {
  return hasRole(profile, "admin");
}

export async function requireAdminAuth(): Promise<AuthState> {
  const auth = await getAuthState();
  if (!auth.session || !isAdminProfile(auth.profile)) {
    return { session: null, profile: null };
  }
  return auth;
}

export function onAuthStateChange(callback: (auth: AuthState) => void) {
  if (!supabase) return () => undefined;
  const { data } = supabase.auth.onAuthStateChange(async () => {
    callback(await getAuthState());
  });
  return () => data.subscription.unsubscribe();
}
