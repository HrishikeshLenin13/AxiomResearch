import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getModuleById } from "../../../../course/data/modules";

export const Route = createFileRoute("/learn/modules/$moduleId")({
  beforeLoad: ({ params }) => {
    const module = getModuleById(params.moduleId);
    if (!module) {
      throw redirect({ to: "/learn/dashboard" });
    }
  },
  component: ModuleLayout,
});

function ModuleLayout() {
  return <Outlet />;
}
