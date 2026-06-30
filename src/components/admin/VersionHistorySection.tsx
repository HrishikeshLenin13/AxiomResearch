import { useEffect, useState } from "react";
import {
  loadWebsiteVersions,
  restoreWebsiteVersion,
  WEBSITE_VERSIONS_CHANGED_EVENT,
  type WebsiteContentVersion,
} from "../../lib/website-versions";
import { adminGhostButtonClass } from "./constants";
import { AdminPlaceholderSection, AdminSectionPanel } from "./AdminSectionPanel";

function formatVersionDate(timestamp: number) {
  return new Date(timestamp).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function VersionHistorySection() {
  const [versions, setVersions] = useState<WebsiteContentVersion[]>([]);
  const [restoredLabel, setRestoredLabel] = useState<string | null>(null);

  function refreshVersions() {
    setVersions(loadWebsiteVersions());
  }

  useEffect(() => {
    refreshVersions();
    window.addEventListener("storage", refreshVersions);
    window.addEventListener("focus", refreshVersions);
    window.addEventListener(WEBSITE_VERSIONS_CHANGED_EVENT, refreshVersions);
    return () => {
      window.removeEventListener("storage", refreshVersions);
      window.removeEventListener("focus", refreshVersions);
      window.removeEventListener(WEBSITE_VERSIONS_CHANGED_EVENT, refreshVersions);
    };
  }, []);

  function handleRestore(id: string) {
    const restored = restoreWebsiteVersion(id);
    if (!restored) return;
    refreshVersions();
    setRestoredLabel(restored.label);
  }

  return (
    <AdminSectionPanel
      id="version-history"
      title="Version History"
      description="Saved CMS snapshots you can restore at any time."
    >
      {versions.length === 0 ? (
        <AdminPlaceholderSection message="No saved versions yet. Use Save Version in the Website Editor." />
      ) : (
        <div className="space-y-4">
          {restoredLabel && (
            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground">
              <span className="font-medium">{restoredLabel}</span> restored. Public pages updated.
            </div>
          )}

          <div className="hidden overflow-hidden rounded-xl border border-border md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-white/50">
                <tr>
                  <th className="px-4 py-3 font-medium">Version</th>
                  <th className="px-4 py-3 font-medium">Saved</th>
                  <th className="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {versions.map((version) => (
                  <tr key={version.id} className="border-b border-border/70 last:border-b-0">
                    <td className="px-4 py-3 font-medium">{version.label}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatVersionDate(version.timestamp)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleRestore(version.id)}
                        className={adminGhostButtonClass}
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2 md:hidden">
            {versions.map((version) => (
              <article
                key={version.id}
                className="rounded-xl border border-border bg-white/40 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{version.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatVersionDate(version.timestamp)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRestore(version.id)}
                    className={adminGhostButtonClass}
                  >
                    Restore
                  </button>
                </div>
              </article>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            {versions.length} version{versions.length === 1 ? "" : "s"} stored locally.
          </p>
        </div>
      )}
    </AdminSectionPanel>
  );
}
