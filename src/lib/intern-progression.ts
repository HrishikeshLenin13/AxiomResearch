import type { MarketingIntern } from "./marketing-interns";

export const MENTOR_RECRUIT_THRESHOLD = 20;

export type InternRole = "intern" | "mentor";

export type InternProgression = {
  role: InternRole;
  eligibleForCertificate: boolean;
  recruitsNeededForNextLevel: number;
};

export function getInternRecruitCount(intern: MarketingIntern) {
  return intern.recruitsList.length;
}

export function computeInternProgression(intern: MarketingIntern): InternProgression {
  const recruitCount = getInternRecruitCount(intern);
  const role: InternRole =
    intern.roleOverride === "mentor" || recruitCount >= MENTOR_RECRUIT_THRESHOLD ? "mentor" : "intern";
  const eligibleForCertificate =
    recruitCount >= MENTOR_RECRUIT_THRESHOLD || intern.certificateApproved === true;

  return {
    role,
    eligibleForCertificate,
    recruitsNeededForNextLevel:
      role === "mentor" ? 0 : Math.max(0, MENTOR_RECRUIT_THRESHOLD - recruitCount),
  };
}

export function formatInternRole(role: InternRole) {
  return role === "mentor" ? "Mentor" : "Intern";
}

export function formatCertificateEligibility(eligible: boolean) {
  return eligible ? "Yes" : "No";
}
