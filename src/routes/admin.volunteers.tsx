import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { isAdminSessionActive, signOutAdmin } from "../lib/admin-session";
import { useVolunteerRecords } from "../components/admin/VolunteerCourseSection";
import {
  computeAverageQuizGrade,
  currentModuleLabel,
  formatDate,
  formatPercent,
  volunteerDisplayName,
  volunteerStatus,
} from "../course/lib/volunteer-stats";

export const Route = createFileRoute("/admin/volunteers")({
  beforeLoad: () => {
    if (!isAdminSessionActive()) {
      throw redirect({ to: "/login", search: { redirect: "/admin/volunteers" } });
    }
  },
  head: () => ({
    meta: [
      { title: "Active volunteers — Axiom Admin" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: ActiveVolunteersPage,
});

function ActiveVolunteersPage() {
  const navigate = useNavigate();
  const { active, loading, error } = useVolunteerRecords();

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-2xl border border-border bg-white/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Admin</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold">Active volunteers</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Recent activity in the last 14 days, not yet submitted.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/admin" className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-white/40">
              Admin home
            </Link>
            <Link
              to="/admin/volunteers/completed"
              className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-white/40"
            >
              Completed
            </Link>
            <button
              type="button"
              onClick={() => {
                signOutAdmin();
                navigate({ to: "/login" });
              }}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-white/40"
            >
              Log out
            </button>
          </div>
        </header>

        <section className="mt-6 rounded-2xl border border-border bg-white/45 p-5 md:p-6 overflow-x-auto">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading volunteers...</p>
          ) : error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : active.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active volunteers right now.</p>
          ) : (
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Name</th>
                  <th className="py-2 pr-3 font-medium">Volunteer ID</th>
                  <th className="py-2 pr-3 font-medium">Progress</th>
                  <th className="py-2 pr-3 font-medium">Last Active</th>
                  <th className="py-2 pr-3 font-medium">Current Module</th>
                  <th className="py-2 pr-3 font-medium">Quiz Grade</th>
                  <th className="py-2 pr-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {active.map((row) => (
                  <tr key={row.volunteerId} className="border-b border-border/70">
                    <td className="py-3 pr-3 font-medium">{volunteerDisplayName(row)}</td>
                    <td className="py-3 pr-3 font-mono text-xs">{row.volunteerId}</td>
                    <td className="py-3 pr-3">{Math.round(row.overallProgressPct)}%</td>
                    <td className="py-3 pr-3">{formatDate(row.lastActiveAt)}</td>
                    <td className="py-3 pr-3">{currentModuleLabel(row)}</td>
                    <td className="py-3 pr-3">{formatPercent(computeAverageQuizGrade(row))}</td>
                    <td className="py-3 pr-3">{volunteerStatus(row)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </main>
  );
}
