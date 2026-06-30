const ADMIN_SESSION_KEY = "axiom-admin-authenticated";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "axiom123";

export function isAdminSessionActive() {
  if (typeof sessionStorage === "undefined") return false;
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function signInAdmin(password: string) {
  if (password !== ADMIN_PASSWORD) {
    throw new Error("Incorrect password.");
  }
  sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
}

export function signOutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
