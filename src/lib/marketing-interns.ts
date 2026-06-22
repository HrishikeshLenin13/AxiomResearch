export type MarketingRecruit = {
  name: string;
  email: string;
  joinDate: string;
  referredBy?: string;
};

export type MarketingIntern = {
  id: string;
  name: string;
  recruits: number;
  recruitsList: MarketingRecruit[];
};

export const MARKETING_INTERNS_KEY = "axiom-marketing-interns";

export function loadMarketingInterns(): MarketingIntern[] {
  try {
    const raw = localStorage.getItem(MARKETING_INTERNS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as MarketingIntern[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMarketingInterns(interns: MarketingIntern[]) {
  localStorage.setItem(MARKETING_INTERNS_KEY, JSON.stringify(interns));
}

export function createMarketingIntern(name: string): MarketingIntern {
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    recruits: 0,
    recruitsList: [],
  };
}

export function addRecruitToIntern(
  interns: MarketingIntern[],
  internId: string,
  recruit: Omit<MarketingRecruit, "joinDate">,
): MarketingIntern[] {
  const joinDate = new Date().toISOString().slice(0, 10);
  return interns.map((intern) => {
    if (intern.id !== internId) return intern;
    const entry: MarketingRecruit = { ...recruit, joinDate };
    const recruitsList = [...intern.recruitsList, entry];
    return {
      ...intern,
      recruits: recruitsList.length,
      recruitsList,
    };
  });
}

export function findInternByReferral(
  interns: MarketingIntern[],
  referredBy: string,
): MarketingIntern | undefined {
  const normalized = referredBy.trim().toLowerCase();
  if (!normalized) return undefined;
  return interns.find(
    (intern) =>
      intern.id === referredBy ||
      intern.id.toLowerCase() === normalized ||
      intern.name.trim().toLowerCase() === normalized,
  );
}

export function registerMemberReferral(
  name: string,
  email: string,
  referredBy: string | null,
): { assigned: boolean; internName?: string } {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  if (!trimmedName || !trimmedEmail) return { assigned: false };

  const interns = loadMarketingInterns();
  if (!referredBy) return { assigned: false };

  const intern = findInternByReferral(interns, referredBy);
  if (!intern) return { assigned: false };

  const next = addRecruitToIntern(interns, intern.id, {
    name: trimmedName,
    email: trimmedEmail,
    referredBy,
  });
  saveMarketingInterns(next);
  return { assigned: true, internName: intern.name };
}
