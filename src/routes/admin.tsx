import { createFileRoute } from "@tanstack/react-router";
import { Lock, LayoutDashboard } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import {
  addRecruitToIntern,
  createMarketingIntern,
  loadMarketingInterns,
  saveMarketingInterns,
  type MarketingIntern,
} from "../lib/marketing-interns";

const ADMIN_PASSWORD = "axiom123";
const ADMIN_SESSION_KEY = "axiom-admin-authenticated";

function isAdminSessionActive() {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

const dashboardSections = [
  "Content Editor",
  "Marketing Interns",
  "Members",
  "Version History",
];

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Axiom" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(isAdminSessionActive);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      setAuthenticated(true);
      setError("");
      setPassword("");
      return;
    }
    setError("Incorrect password");
  }

  function handleLogout() {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthenticated(false);
    setPassword("");
    setError("");
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-background px-6 py-12 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-sm glass-strong rounded-3xl p-8">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary grid place-items-center mb-5">
            <Lock size={20} />
          </div>
          <h1 className="text-3xl font-semibold">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the admin password to access the dashboard shell.
          </p>
          <label className="mt-6 block text-sm font-medium" htmlFor="admin-password">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-border bg-white/40 px-4 py-3 text-sm outline-none focus:border-primary"
            autoComplete="current-password"
          />
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            Log in
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="glass-strong rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Admin</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold">Axiom Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-white/40 transition"
            >
              Log out
            </button>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary grid place-items-center">
              <LayoutDashboard size={22} />
            </div>
          </div>
        </header>

        <section className="mt-6 grid md:grid-cols-2 gap-5">
          {dashboardSections.map((section) => (
            <div key={section} className="glass rounded-3xl p-6 md:p-8 min-h-40">
              {section === "Marketing Interns" ? (
                <MarketingInternsPanel />
              ) : (
                <h2 className="text-xl font-semibold">{section}</h2>
              )}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function MarketingInternsPanel() {
  const [interns, setInterns] = useState<MarketingIntern[]>([]);
  const [selectedInternId, setSelectedInternId] = useState<string | null>(null);
  const [internName, setInternName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [assignedInternId, setAssignedInternId] = useState("");

  useEffect(() => {
    function refreshInterns() {
      setInterns(loadMarketingInterns());
    }
    refreshInterns();
    window.addEventListener("storage", refreshInterns);
    window.addEventListener("focus", refreshInterns);
    return () => {
      window.removeEventListener("storage", refreshInterns);
      window.removeEventListener("focus", refreshInterns);
    };
  }, []);

  function persist(next: MarketingIntern[]) {
    setInterns(next);
    saveMarketingInterns(next);
  }

  function handleAddIntern(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = internName.trim();
    if (!name) return;
    persist([...interns, createMarketingIntern(name)]);
    setInternName("");
  }

  function handleAddMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!assignedInternId || !memberName.trim() || !memberEmail.trim()) return;
    const next = addRecruitToIntern(interns, assignedInternId, {
      name: memberName.trim(),
      email: memberEmail.trim(),
    });
    persist(next);
    setMemberName("");
    setMemberEmail("");
  }

  const selectedIntern = interns.find((intern) => intern.id === selectedInternId) ?? null;

  return (
    <div>
      <h2 className="text-xl font-semibold">Marketing Interns</h2>
      <p className="mt-1 text-sm text-muted-foreground">{interns.length} intern(s) tracked</p>

      <form onSubmit={handleAddIntern} className="mt-4 flex gap-2">
        <input
          value={internName}
          onChange={(event) => setInternName(event.target.value)}
          placeholder="Intern name"
          className="flex-1 rounded-2xl border border-border bg-white/40 px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
        >
          Add
        </button>
      </form>

      {interns.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {interns.map((intern) => (
            <li key={intern.id}>
              <button
                type="button"
                onClick={() =>
                  setSelectedInternId(selectedInternId === intern.id ? null : intern.id)
                }
                className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  selectedInternId === intern.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-white/40"
                }`}
              >
                <span className="font-medium">
                  {intern.name} — {intern.recruits} recruits
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">No marketing interns yet.</p>
      )}

      {selectedIntern && (
        <div className="mt-4 rounded-2xl border border-border p-4">
          <h3 className="font-semibold">{selectedIntern.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {selectedIntern.recruits} recruited member(s)
          </p>
          {selectedIntern.recruitsList.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {selectedIntern.recruitsList.map((recruit, index) => (
                <li key={`${recruit.email}-${index}`} className="rounded-xl bg-white/40 px-3 py-2">
                  <div className="font-medium">{recruit.name}</div>
                  <div className="text-muted-foreground">{recruit.email}</div>
                  <div className="text-xs text-muted-foreground">Joined {recruit.joinDate}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">No recruits assigned yet.</p>
          )}
        </div>
      )}

      <form onSubmit={handleAddMember} className="mt-5 space-y-2 border-t border-border pt-4">
        <p className="text-sm font-medium">Register member</p>
        <input
          value={memberName}
          onChange={(event) => setMemberName(event.target.value)}
          placeholder="Member name"
          className="w-full rounded-2xl border border-border bg-white/40 px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <input
          value={memberEmail}
          onChange={(event) => setMemberEmail(event.target.value)}
          placeholder="Member email"
          type="email"
          className="w-full rounded-2xl border border-border bg-white/40 px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <select
          value={assignedInternId}
          onChange={(event) => setAssignedInternId(event.target.value)}
          className="w-full rounded-2xl border border-border bg-white/40 px-3 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="">Assigned intern</option>
          {interns.map((intern) => (
            <option key={intern.id} value={intern.id}>
              {intern.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={interns.length === 0}
          className="w-full rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition disabled:opacity-50"
        >
          Add member
        </button>
      </form>
    </div>
  );
}
