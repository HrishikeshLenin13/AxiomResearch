import { createFileRoute } from "@tanstack/react-router";
import { CourseLanding } from "../../course/components/CourseLanding";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Research Foundations — Axiom Research Initiative" },
      {
        name: "description",
        content: "Learn research methods that actually count. Eight units for student researchers.",
      },
    ],
  }),
  component: CourseLanding,
});
