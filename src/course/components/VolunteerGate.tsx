import type { ReactNode } from "react";
import { useCourse } from "../context/CourseProvider";
import { VolunteerAccessScreen } from "./VolunteerAccessScreen";
import { VolunteerIdentifyScreen } from "./VolunteerIdentifyScreen";

export function VolunteerGate({ children }: { children: ReactNode }) {
  const { accessGranted, volunteer, loading, progress } = useCourse();

  if (!accessGranted) {
    return <VolunteerAccessScreen />;
  }

  if (!volunteer) {
    return <VolunteerIdentifyScreen />;
  }

  if (loading || !progress) {
    return (
      <div className="min-h-screen grid place-items-center text-[var(--course-ink-soft)]">
        Loading your course...
      </div>
    );
  }

  return <>{children}</>;
}
