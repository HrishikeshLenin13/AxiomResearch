import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CourseProvider } from "../../course/context/CourseProvider";
import "../../course/styles/course.css";

export const Route = createFileRoute("/learn")({
  component: LearnLayout,
});

function LearnLayout() {
  return (
    <div className="course-site">
      <CourseProvider>
        <Outlet />
      </CourseProvider>
    </div>
  );
}
