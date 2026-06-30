import { loadMarketingInterns, type MarketingIntern } from "./marketing-interns";
import { isSupabaseConfigured, supabase } from "./supabase";

export type InternLeaderboardEntry = {
  internId: string;
  name: string;
  recruitCount: number;
  rank: number;
};

type MemberCountRow = {
  intern_id: string;
};

type InternNameRow = {
  id: string;
  name: string;
};

function rankLeaderboardEntries(
  entries: Omit<InternLeaderboardEntry, "rank">[],
): InternLeaderboardEntry[] {
  return [...entries]
    .sort(
      (left, right) =>
        right.recruitCount - left.recruitCount || left.name.localeCompare(right.name),
    )
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
}

export function computeInternLeaderboard(interns: MarketingIntern[]): InternLeaderboardEntry[] {
  const entries = interns.map((intern) => ({
    internId: intern.id,
    name: intern.name,
    recruitCount: intern.recruitsList.length,
  }));
  return rankLeaderboardEntries(entries);
}

export function computeInternLeaderboardFromMembers(
  members: MemberCountRow[],
  interns: InternNameRow[],
): InternLeaderboardEntry[] {
  const countsByInternId = new Map<string, number>();
  for (const member of members) {
    countsByInternId.set(member.intern_id, (countsByInternId.get(member.intern_id) ?? 0) + 1);
  }

  const internNames = new Map(interns.map((intern) => [intern.id, intern.name]));
  const internIds = new Set([...internNames.keys(), ...countsByInternId.keys()]);

  const entries = [...internIds].map((internId) => ({
    internId,
    name: internNames.get(internId) ?? "Unknown intern",
    recruitCount: countsByInternId.get(internId) ?? 0,
  }));

  return rankLeaderboardEntries(entries);
}

export async function fetchInternLeaderboardFromSupabase(): Promise<InternLeaderboardEntry[] | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  const { data: members, error: membersError } = await supabase
    .from("members")
    .select("intern_id");
  if (membersError) return null;

  const { data: interns, error: internsError } = await supabase
    .from("marketing_interns")
    .select("id, name");
  if (internsError) return null;

  return computeInternLeaderboardFromMembers(
    (members ?? []) as MemberCountRow[],
    (interns ?? []) as InternNameRow[],
  );
}

export async function loadInternLeaderboard(
  fallbackInterns?: MarketingIntern[],
): Promise<InternLeaderboardEntry[]> {
  const remote = await fetchInternLeaderboardFromSupabase();
  if (remote) return remote;
  const interns = fallbackInterns ?? loadMarketingInterns();
  return computeInternLeaderboard(interns);
}
