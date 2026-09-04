import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  createVolunteerId,
  createVolunteerIdBatch,
  listVolunteerIdRecords,
  type VolunteerIdRecord,
} from "../../course/lib/volunteer-ids";
import {
  adminBlockCardClass,
  adminGhostButtonClass,
  adminInputClass,
  adminPrimaryButtonClass,
  adminSecondaryButtonClass,
} from "./constants";
import { AdminSectionPanel } from "./AdminSectionPanel";

function statusLabel(status: VolunteerIdRecord["status"]) {
  switch (status) {
    case "unused":
      return "Unused";
    case "assigned":
      return "Assigned";
    case "active":
      return "Active";
    case "completed":
      return "Completed";
    default:
      return status;
  }
}

function VolunteerIdsTable({ rows }: { rows: VolunteerIdRecord[] }) {
  if (rows.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-white/30 px-4 py-8 text-center text-sm text-muted-foreground">
        No volunteer IDs yet. Generate one below.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="py-2 pr-3 font-medium">Volunteer ID</th>
            <th className="py-2 pr-3 font-medium">Name</th>
            <th className="py-2 pr-3 font-medium">Status</th>
            <th className="py-2 pr-3 font-medium">Created</th>
            <th className="py-2 pr-3 font-medium">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border/70">
              <td className="py-3 pr-3 font-mono text-xs">{row.id}</td>
              <td className="py-3 pr-3">
                {[row.firstName, row.lastName].filter(Boolean).join(" ") || "—"}
              </td>
              <td className="py-3 pr-3">{statusLabel(row.status)}</td>
              <td className="py-3 pr-3">{new Date(row.createdAt).toLocaleDateString()}</td>
              <td className="py-3 pr-3 text-muted-foreground">{row.notes || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function useVolunteerIdRecords() {
  const [records, setRecords] = useState<VolunteerIdRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = async () => {
    setLoading(true);
    setError("");
    try {
      setRecords(await listVolunteerIdRecords());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load volunteer IDs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void reload();
  }, []);

  const unused = useMemo(() => records.filter((row) => row.status === "unused"), [records]);
  const assigned = useMemo(
    () => records.filter((row) => row.status === "assigned" || row.status === "active"),
    [records],
  );

  return { records, unused, assigned, loading, error, reload };
}

export function VolunteerIdsSection() {
  const { records, unused, loading, error, reload } = useVolunteerIdRecords();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [notes, setNotes] = useState("");
  const [batchCount, setBatchCount] = useState("5");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleGenerate() {
    setBusy(true);
    setMessage("");
    try {
      const created = await createVolunteerId({
        firstName,
        lastName,
        notes,
      });
      setMessage(`Created ${created.id}${created.firstName ? ` for ${created.firstName} ${created.lastName}` : ""}.`);
      setFirstName("");
      setLastName("");
      setNotes("");
      await reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not create volunteer ID.");
    } finally {
      setBusy(false);
    }
  }

  async function handleBatchGenerate() {
    const count = Math.min(50, Math.max(1, Number(batchCount) || 1));
    setBusy(true);
    setMessage("");
    try {
      const created = await createVolunteerIdBatch(count);
      setMessage(`Generated ${created.length} IDs: ${created.map((row) => row.id).join(", ")}`);
      await reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not generate volunteer IDs.");
    } finally {
      setBusy(false);
    }
  }

  async function copyUnusedIds() {
    const text = unused.map((row) => row.id).join("\n");
    if (!text) {
      setMessage("No unused IDs to copy.");
      return;
    }
    await navigator.clipboard.writeText(text);
    setMessage(`Copied ${unused.length} unused ID(s) to clipboard.`);
  }

  return (
    <AdminSectionPanel
      id="volunteer-ids"
      title="Volunteer IDs"
      description="Generate AX-YYYY-NNNN IDs for volunteers. They enter this ID (not their birthday) at course login."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className={adminBlockCardClass}>
          <h3 className="font-medium">Generate next ID</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Optionally pre-assign a name. Leave names blank for unused IDs to hand out later.
          </p>
          <div className="mt-4 space-y-3">
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="First name (optional)"
              className={adminInputClass}
            />
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Last name (optional)"
              className={adminInputClass}
            />
            <input
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Notes (optional)"
              className={adminInputClass}
            />
            <button
              type="button"
              disabled={busy}
              onClick={() => void handleGenerate()}
              className={adminPrimaryButtonClass}
            >
              {busy ? "Working..." : "Generate next ID"}
            </button>
          </div>
        </div>

        <div className={adminBlockCardClass}>
          <h3 className="font-medium">Batch generate</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Create several unused IDs at once for onboarding events.
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[120px]">
              <label htmlFor="batch-count" className="text-sm text-muted-foreground">
                Count
              </label>
              <input
                id="batch-count"
                value={batchCount}
                onChange={(event) => setBatchCount(event.target.value)}
                className={`${adminInputClass} mt-1`}
              />
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() => void handleBatchGenerate()}
              className={adminSecondaryButtonClass}
            >
              Generate batch
            </button>
            <button type="button" onClick={() => void copyUnusedIds()} className={adminGhostButtonClass}>
              Copy unused IDs
            </button>
          </div>
        </div>
      </div>

      {message ? <p className="mt-4 text-sm text-foreground">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading volunteer IDs...</p>
        ) : (
          <VolunteerIdsTable rows={records.slice(0, 12)} />
        )}
      </div>

      <div className="mt-4">
        <Link to="/admin/volunteers/ids" className="text-sm text-primary hover:underline">
          Open full ID manager
        </Link>
      </div>
    </AdminSectionPanel>
  );
}
