import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { FormEvent, useState } from "react";
import { isAdminSessionActive, signInAdmin } from "../lib/admin-session";

type LoginSearch = {
  redirect?: string;
};

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/admin",
  }),
  beforeLoad: () => {
    if (isAdminSessionActive()) {
      throw redirect({ to: "/admin" });
    }
  },
  head: () => ({
    meta: [
      { title: "Admin Login — Axiom" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { redirect: redirectTo } = Route.useSearch();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      signInAdmin(password);
      navigate({ to: redirectTo || "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm glass-strong rounded-3xl p-8">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-5">
          <Lock size={20} />
        </div>
        <h1 className="text-3xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">Enter the admin password to continue.</p>
        <label className="mt-6 block text-sm font-medium" htmlFor="login-password">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-border bg-white/40 px-4 py-3 text-sm outline-none focus:border-primary"
          autoComplete="current-password"
          required
        />
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition disabled:opacity-50"
        >
          {submitting ? "Signing in..." : "Log in"}
        </button>
      </form>
    </main>
  );
}
