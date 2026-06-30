import { createFileRoute } from "@tanstack/react-router";
import { CourseDashboard } from "../../course/components/CourseDashboard";

export const Route = createFileRoute("/learn/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Axiom Research Initiative" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CourseDashboard,
});
