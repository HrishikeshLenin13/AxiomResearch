import { createFileRoute, redirect } from "@tanstack/react-router";
import { CourseLanding } from "../../course/components/CourseLanding";
import { isFirebaseConfigured, waitForFirebaseUser } from "../../course/lib/firebase";

export const Route = createFileRoute("/learn/")({
  beforeLoad: async () => {
    if (!isFirebaseConfigured()) return;
    const user = await waitForFirebaseUser();
    if (user) {
      throw redirect({ to: "/learn/dashboard" });
    }
  },
  head: () => ({
    meta: [
      { title: "Axiom Research Initiative — Course" },
      {
        name: "description",
        content: "Learn research methods that actually count. Eight mastery-gated units for student researchers.",
      },
    ],
  }),
  component: CourseLanding,
});
