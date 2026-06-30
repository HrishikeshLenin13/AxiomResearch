import { FormEvent, useEffect, useState } from "react";
import { useInternLeaderboard } from "../../hooks/useInternLeaderboard";
import {
  computeInternProgression,
  formatCertificateEligibility,
  formatInternRole,
} from "../../lib/intern-progression";
import {
  addRecruitToIntern,
  createMarketingIntern,
  loadMarketingInterns,
  saveMarketingInterns,
  type MarketingIntern,
} from "../../lib/marketing-interns";
import { adminGhostButtonClass, adminInputClass } from "./constants";
import { AdminSectionPanel } from "./AdminSectionPanel";

export function MarketingInternsSection() {
  const [interns, setInterns] = useState<MarketingIntern[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
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

  function handleToggleIntern(internId: string) {
    setSelectedInternId((current) => (current === internId ? null : internId));
  }

  const selectedIntern = interns.find((intern) => intern.id === selectedInternId) ?? null;
  const selectedProgression = selectedIntern ? computeInternProgression(selectedIntern) : null;
  const leaderboard = useInternLeaderboard(interns);

  return (
    <AdminSectionPanel
      id="marketing-interns"
      title="Marketing Interns"
      description="Track intern recruits and member assignments."
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{interns.length} intern(s) tracked</p>
          <button
            type="button"
            onClick={() => setShowLeaderboard((current) => !current)}
            className={adminGhostButtonClass}
          >
            {showLeaderboard ? "Show list view" : "Show leaderboard"}
          </button>
        </div>

        {showLeaderboard ? (
          <div className="space-y-3 rounded-2xl border border-border bg-white/20 p-4">
            <div>
              <p className="text-sm font-medium">Recruit leaderboard</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Ranked by total members recruited (from members table).
              </p>
            </div>
            {leaderboard.length > 0 ? (
              <ol className="space-y-2">
                {leaderboard.map((entry) => (
                  <li
                    key={entry.internId}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-white/40 px-4 py-3 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        #{entry.rank}
                      </span>
                      <span className="font-medium">{entry.name}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {entry.recruitCount} recruit{entry.recruitCount === 1 ? "" : "s"}
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">No leaderboard data yet.</p>
            )}
          </div>
        ) : (
          <>
        <form onSubmit={handleAddIntern} className="flex gap-2">
          <input
            value={internName}
            onChange={(event) => setInternName(event.target.value)}
            placeholder="Intern name"
            className={`${adminInputClass} flex-1`}
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
          >
            Add
          </button>
        </form>

        <div className="space-y-3">
          {interns.length > 0 ? (
            <ul className="space-y-2">
              {interns.map((intern) => {
                const progression = computeInternProgression(intern);
                return (
                <li key={intern.id} className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleToggleIntern(intern.id)}
                    aria-expanded={selectedInternId === intern.id}
                    className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      selectedInternId === intern.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-white/40"
                    }`}
                  >
                    <span className="font-medium">
                      {intern.name} — {intern.recruits} recruits
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {formatInternRole(progression.role)} · Eligible for Certificate:{" "}
                      {formatCertificateEligibility(progression.eligibleForCertificate)}
                    </span>
                  </button>

                  {selectedInternId === intern.id && selectedIntern && (
                    <div className="rounded-2xl border border-border bg-white/30 p-4">
                      <h3 className="font-semibold">{selectedIntern.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {selectedIntern.recruits} recruited member(s)
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Role: {selectedProgression ? formatInternRole(selectedProgression.role) : "Intern"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Eligible for Certificate:{" "}
                        {selectedProgression
                          ? formatCertificateEligibility(selectedProgression.eligibleForCertificate)
                          : "No"}
                      </p>
                      {selectedProgression && selectedProgression.recruitsNeededForNextLevel > 0 && (
                        <p className="text-xs text-muted-foreground">
                          {selectedProgression.recruitsNeededForNextLevel} more recruit(s) to reach Mentor
                        </p>
                      )}
                      {selectedIntern.recruitsList.length > 0 ? (
                        <ul className="mt-3 space-y-2 text-sm">
                          {selectedIntern.recruitsList.map((recruit, index) => (
                            <li
                              key={`${recruit.email}-${index}`}
                              className="rounded-xl border border-border/60 bg-white/40 px-3 py-2"
                            >
                              <div className="font-medium">{recruit.name}</div>
                              <div className="text-muted-foreground">{recruit.email}</div>
                              <div className="text-xs text-muted-foreground">
                                Joined {recruit.joinDate}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-3 text-sm text-muted-foreground">
                          No recruits assigned yet.
                        </p>
                      )}
                    </div>
                  )}
                </li>
              );
              })}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No marketing interns yet.</p>
          )}
        </div>

        <form
          onSubmit={handleAddMember}
          className="space-y-3 rounded-2xl border border-border bg-white/20 p-4"
        >
          <p className="text-sm font-medium">Register member</p>
          <input
            value={memberName}
            onChange={(event) => setMemberName(event.target.value)}
            placeholder="Member name"
            className={adminInputClass}
          />
          <input
            value={memberEmail}
            onChange={(event) => setMemberEmail(event.target.value)}
            placeholder="Member email"
            type="email"
            className={adminInputClass}
          />
          <select
            value={assignedInternId}
            onChange={(event) => setAssignedInternId(event.target.value)}
            className={adminInputClass}
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
            className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition disabled:opacity-50"
          >
            Add member
          </button>
        </form>
          </>
        )}
      </div>
    </AdminSectionPanel>
  );
}
