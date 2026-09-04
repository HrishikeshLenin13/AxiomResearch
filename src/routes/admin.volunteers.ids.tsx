import { createFileRoute, redirect } from "@tanstack/react-router";
import { isAdminSessionActive } from "../lib/admin-session";

export const Route = createFileRoute("/admin/volunteers/ids")({
  beforeLoad: () => {
    if (!isAdminSessionActive()) {
      throw redirect({ to: "/login", search: { redirect: "/admin" } });
    }
    throw redirect({ to: "/admin", hash: "all-volunteers" });
  },
});
