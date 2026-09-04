import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import {
  AllVolunteersSection,
  RecentlyDeletedVolunteersSection,
  VolunteerSummarySection,
} from "../components/admin/VolunteerCourseSection";
import { isAdminSessionActive, signOutAdmin } from "../lib/admin-session";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    if (!isAdminSessionActive()) {
      throw redirect({ to: "/login", search: { redirect: "/admin" } });
    }
  },
  head: () => ({
    meta: [
      { title: "Admin — Axiom" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();

  function handleLogout() {
    signOutAdmin();
    navigate({ to: "/login" });
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-2xl border border-border bg-white/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Admin</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold">Volunteer course dashboard</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Track volunteer signups, progress, and completions from Firestore. Google Sheets syncs
              automatically when configured.
            </p>
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

        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          <AdminSidebar />

          <div className="flex-1 rounded-2xl border border-border bg-white/30 p-5 md:p-6 space-y-10">
            <VolunteerSummarySection />
            <AllVolunteersSection />
            <RecentlyDeletedVolunteersSection />
          </div>
        </div>
      </div>
    </main>
  );
}
