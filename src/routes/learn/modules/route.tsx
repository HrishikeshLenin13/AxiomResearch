import { createFileRoute } from "@tanstack/react-router";
import { CourseModuleShell } from "../../../course/components/CourseModuleShell";

export const Route = createFileRoute("/learn/modules")({
  component: ModulesLayout,
});

function ModulesLayout() {
  return <CourseModuleShell />;
}
