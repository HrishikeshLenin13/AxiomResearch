import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { CourseProgressDoc } from "../../course/lib/progress";
import {
  listVolunteerRecords,
  permanentlyDeleteVolunteerRecord,
  softDeleteVolunteerRecord,
  splitVolunteerRecords,
} from "../../course/lib/volunteer-records";
import {
  computeAverageQuizGrade,
  currentModuleLabel,
  formatDate,
  formatDateTime,
  formatPercent,
  isActiveVolunteer,
  volunteerDisplayName,
  volunteerStatus,
} from "../../course/lib/volunteer-stats";
import { adminGhostButtonClass } from "./constants";
import { AdminSectionPanel } from "./AdminSectionPanel";

type VolunteerTableProps = {
  rows: CourseProgressDoc[];
  empty: string;
  onDelete?: (volunteerId: string) => void;
  deleteLabel?: string;
  deletingId?: string | null;
  showDeletedAt?: boolean;
};

function VolunteerTable({
  rows,
  empty,
  onDelete,
  deleteLabel = "Delete",
  deletingId,
  showDeletedAt = false,
}: VolunteerTableProps) {
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
            {showDeletedAt ? <th className="py-2 pr-3 font-medium">Deleted</th> : null}
            {onDelete ? <th className="py-2 pr-3 font-medium">Actions</th> : null}
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
              {showDeletedAt ? (
                <td className="py-3 pr-3">{formatDateTime(row.deletedAt)}</td>
              ) : null}
              {onDelete ? (
                <td className="py-3 pr-3">
                  <button
                    type="button"
                    disabled={deletingId === row.volunteerId}
                    onClick={() => onDelete(row.volunteerId)}
                    className={`${adminGhostButtonClass} !text-destructive hover:!text-destructive disabled:opacity-50`}
                  >
                    {deletingId === row.volunteerId ? "Working..." : deleteLabel}
                  </button>
                </td>
              ) : null}
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
  const [reloadToken, setReloadToken] = useState(0);

  const reload = useCallback(() => {
    setReloadToken((value) => value + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
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
  }, [reloadToken]);

  const { active: liveRecords, deleted } = useMemo(
    () => splitVolunteerRecords(records),
    [records],
  );

  const active = useMemo(() => liveRecords.filter((row) => isActiveVolunteer(row)), [liveRecords]);
  const completed = useMemo(() => liveRecords.filter((row) => row.courseSubmitted), [liveRecords]);

  return { records: liveRecords, deleted, active, completed, loading, error, reload };
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
  const { records, loading, error, reload } = useVolunteerRecords();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  async function handleDelete(volunteerId: string) {
    const name = records.find((row) => row.volunteerId === volunteerId);
    const label = name ? volunteerDisplayName(name) : volunteerId;
    if (
      !window.confirm(
        `Move ${label} to Recently deleted? They will lose course access until you delete them forever from that section.`,
      )
    ) {
      return;
    }
    setActionError("");
    setDeletingId(volunteerId);
    try {
      await softDeleteVolunteerRecord(volunteerId);
      reload();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Could not delete volunteer.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AdminSectionPanel
      id="all-volunteers"
      title="All volunteers"
      description="Every active volunteer record. Delete moves someone to Recently deleted — they cannot resume the course until you remove them permanently or re-create them."
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading volunteers...</p>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <>
          {actionError ? <p className="mb-3 text-sm text-destructive">{actionError}</p> : null}
          <VolunteerTable
            rows={records}
            empty="No volunteers have signed up yet."
            onDelete={handleDelete}
            deleteLabel="Delete"
            deletingId={deletingId}
          />
        </>
      )}
    </AdminSectionPanel>
  );
}

export function RecentlyDeletedVolunteersSection() {
  const { deleted, loading, error, reload } = useVolunteerRecords();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  async function handlePermanentDelete(volunteerId: string) {
    const row = deleted.find((entry) => entry.volunteerId === volunteerId);
    const label = row ? volunteerDisplayName(row) : volunteerId;
    if (
      !window.confirm(
        `Permanently delete ${label} (${volunteerId})? This removes their progress and ID from Firestore and cannot be undone.`,
      )
    ) {
      return;
    }
    setActionError("");
    setDeletingId(volunteerId);
    try {
      await permanentlyDeleteVolunteerRecord(volunteerId);
      reload();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Could not permanently delete volunteer.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AdminSectionPanel
      id="recently-deleted"
      title="Recently deleted volunteers"
      description="Volunteers you removed from the active list. Delete forever erases their progress and Volunteer ID from the system."
    >
      {loading ? (
        <p className="text-sm text-muted-foreground">Loading deleted volunteers...</p>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <>
          {actionError ? <p className="mb-3 text-sm text-destructive">{actionError}</p> : null}
          <VolunteerTable
            rows={deleted}
            empty="No recently deleted volunteers."
            onDelete={handlePermanentDelete}
            deleteLabel="Delete forever"
            deletingId={deletingId}
            showDeletedAt
          />
        </>
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
