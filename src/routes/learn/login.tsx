import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/learn/login")({
  beforeLoad: () => {
    throw redirect({ to: "/learn" });
  },
});
