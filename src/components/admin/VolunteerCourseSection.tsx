import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { CourseProgressDoc } from "../../course/lib/progress";
import { listVolunteerRecords } from "../../course/lib/volunteer-records";
import {
  computeAverageQuizGrade,
  currentModuleLabel,
  formatDate,
  formatPercent,
  isActiveVolunteer,
  volunteerDisplayName,
  volunteerStatus,
} from "../../course/lib/volunteer-stats";
import { AdminSectionPanel } from "./AdminSectionPanel";

function VolunteerTable({ rows, empty }: { rows: CourseProgressDoc[]; empty: string }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-white/30 px-4 py-8 text-center text-sm text-muted-foreground">
        {empty}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="py-2 pr-3 font-medium">Name</th>
            <th className="py-2 pr-3 font-medium">Volunteer ID</th>
            <th className="py-2 pr-3 font-medium">Progress</th>
            <th className="py-2 pr-3 font-medium">Status</th>
            <th className="py-2 pr-3 font-medium">Last active</th>
            <th className="py-2 pr-3 font-medium">Current module</th>
            <th className="py-2 pr-3 font-medium">Quiz grade</th>
            <th className="py-2 pr-3 font-medium">Final grade</th>
            <th className="py-2 pr-3 font-medium">Completed</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.volunteerId} className="border-b border-border/70">
              <td className="py-3 pr-3 font-medium">{volunteerDisplayName(row)}</td>
              <td className="py-3 pr-3 font-mono text-xs">{row.volunteerId}</td>
              <td className="py-3 pr-3">{Math.round(row.overallProgressPct)}%</td>
              <td className="py-3 pr-3">{volunteerStatus(row)}</td>
              <td className="py-3 pr-3">{formatDate(row.lastActiveAt)}</td>
              <td className="py-3 pr-3">{currentModuleLabel(row)}</td>
              <td className="py-3 pr-3">{formatPercent(computeAverageQuizGrade(row))}</td>
              <td className="py-3 pr-3">{formatPercent(row.finalGrade)}</td>
              <td className="py-3 pr-3">{formatDate(row.completedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function useVolunteerRecords() {
  const [records, setRecords] = useState<CourseProgressDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const next = await listVolunteerRecords();
        if (!cancelled) setRecords(next);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load volunteer records.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const active = useMemo(() => records.filter((row) => isActiveVolunteer(row)), [records]);
  const completed = useMemo(() => records.filter((row) => row.courseSubmitted), [records]);

  return { records, active, completed, loading, error };
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-white/50 p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

export function VolunteerSummarySection() {
  const { records, active, completed, loading, error } = useVolunteerRecords();

  const avgProgress = useMemo(() => {
    if (records.length === 0) return 0;
    const sum = records.reduce((total, row) => total + row.overallProgressPct, 0);
    return Math.round(sum / records.length);
  }, [records]);

  const avgCompletedGrade = useMemo(() => {
    if (completed.length === 0) return null;
    const grades = completed
      .map((row) => row.finalGrade)
      .filter((value): value is number => typeof value === "number");
    if (grades.length === 0) return null;
    return Math.round((grades.reduce((sum, value) => sum + value, 0) / grades.length) * 100);
  }, [completed]);

  return (
    <AdminSectionPanel
      id="volunteer-summary"
      title="Volunteer course summary"
      description="Live stats from Firestore volunteer progress. Google Sheets mirrors the same data for export."
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading summary...</p>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Total volunteers" value={String(records.length)} />
          <SummaryCard label="Active (14 days)" value={String(active.length)} />
          <SummaryCard label="Completed" value={String(completed.length)} />
          <SummaryCard label="Average progress" value={`${avgProgress}%`} />
          {avgCompletedGrade != null ? (
            <SummaryCard label="Avg final grade" value={`${avgCompletedGrade}%`} />
          ) : null}
        </div>
      )}
    </AdminSectionPanel>
  );
}

export function AllVolunteersSection() {
  const { records, loading, error } = useVolunteerRecords();

  return (
    <AdminSectionPanel
      id="all-volunteers"
      title="All volunteers"
      description="Every volunteer who signed up. IDs are auto-generated at signup — no manual pre-generation needed."
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading volunteers...</p>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <VolunteerTable rows={records} empty="No volunteers have signed up yet." />
      )}
    </AdminSectionPanel>
  );
}

export function ActiveVolunteersSection() {
  const { active, loading, error } = useVolunteerRecords();

  return (
    <AdminSectionPanel
      id="active-volunteers"
      title="Active volunteers"
      description="Volunteers with activity in the last 14 days who have not submitted the course."
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading volunteers...</p>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <VolunteerTable rows={active} empty="No active volunteers right now." />
      )}
      <div className="mt-4">
        <Link to="/admin/volunteers" className="text-sm text-primary hover:underline">
          Open full active list
        </Link>
      </div>
    </AdminSectionPanel>
  );
}

export function CompletedVolunteersSection() {
  const { completed, loading, error } = useVolunteerRecords();

  return (
    <AdminSectionPanel
      id="completed-volunteers"
      title="Completed volunteers"
      description="Volunteers who submitted Research Foundations, with final grade and completion time."
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading volunteers...</p>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <VolunteerTable rows={completed} empty="No completed volunteers yet." />
      )}
      <div className="mt-4">
        <Link to="/admin/volunteers/completed" className="text-sm text-primary hover:underline">
          Open full completed list
        </Link>
      </div>
    </AdminSectionPanel>
  );
}
