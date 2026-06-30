import { useEffect, useState } from "react";
import {
  computeInternLeaderboard,
  loadInternLeaderboard,
  type InternLeaderboardEntry,
} from "../lib/intern-leaderboard";
import { loadMarketingInterns, type MarketingIntern } from "../lib/marketing-interns";
import { MARKETING_INTERNS_CHANGED_EVENT } from "../lib/sync-events";

export function useInternLeaderboard(sourceInterns?: MarketingIntern[]) {
  const [entries, setEntries] = useState<InternLeaderboardEntry[]>(() =>
    computeInternLeaderboard(sourceInterns ?? loadMarketingInterns()),
  );

  useEffect(() => {
    let active = true;

    async function refresh() {
      const interns = sourceInterns ?? loadMarketingInterns();
      const next = await loadInternLeaderboard(interns);
      if (active) setEntries(next);
    }

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    window.addEventListener(MARKETING_INTERNS_CHANGED_EVENT, refresh);
    return () => {
      active = false;
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
      window.removeEventListener(MARKETING_INTERNS_CHANGED_EVENT, refresh);
    };
  }, [sourceInterns]);

  return entries;
}
