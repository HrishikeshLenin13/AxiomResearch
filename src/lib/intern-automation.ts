import {
  computeInternProgression,
  getInternRecruitCount,
  MENTOR_RECRUIT_THRESHOLD,
} from "./intern-progression";
import type { MarketingIntern } from "./marketing-interns";

export const INTERN_PROMOTED_EVENT = "axiom-intern-promoted";
export const CERTIFICATE_ISSUED_EVENT = "axiom-certificate-issued";
export const RECRUITMENT_MILESTONE_REACHED_EVENT = "axiom-recruitment-milestone-reached";

export type InternAutomationEventDetail = {
  internId: string;
  internName: string;
  recruitCount: number;
  milestone?: number;
};

function emitInternAutomationEvent(eventName: string, detail: InternAutomationEventDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(eventName, { detail }));
}

function processInternAutomationEntry(
  previous: MarketingIntern | undefined,
  intern: MarketingIntern,
): MarketingIntern {
  const previousCount = previous ? getInternRecruitCount(previous) : 0;
  const recruitCount = getInternRecruitCount(intern);
  const progression = computeInternProgression(intern);
  let updated: MarketingIntern = { ...intern };

  const crossedMentorThreshold =
    recruitCount >= MENTOR_RECRUIT_THRESHOLD && previousCount < MENTOR_RECRUIT_THRESHOLD;

  if (crossedMentorThreshold) {
    updated = {
      ...updated,
      mentorPromoted: true,
      roleOverride: "mentor",
    };
    emitInternAutomationEvent(RECRUITMENT_MILESTONE_REACHED_EVENT, {
      internId: intern.id,
      internName: intern.name,
      recruitCount,
      milestone: MENTOR_RECRUIT_THRESHOLD,
    });
    emitInternAutomationEvent(INTERN_PROMOTED_EVENT, {
      internId: intern.id,
      internName: intern.name,
      recruitCount,
    });
  }

  if (progression.eligibleForCertificate && !updated.certificateIssued) {
    updated = { ...updated, certificateIssued: true };
    if (!previous?.certificateIssued) {
      emitInternAutomationEvent(CERTIFICATE_ISSUED_EVENT, {
        internId: intern.id,
        internName: intern.name,
        recruitCount,
      });
    }
  }

  return updated;
}

export function applyInternAutomation(
  previousInterns: MarketingIntern[],
  nextInterns: MarketingIntern[],
): MarketingIntern[] {
  const previousById = new Map(previousInterns.map((intern) => [intern.id, intern]));
  return nextInterns.map((intern) =>
    processInternAutomationEntry(previousById.get(intern.id), intern),
  );
}
