import { createFileRoute, Outlet } from "@tanstack/react-router";
import { redirect } from "@tanstack/react-router";
import { CourseProvider } from "../../course/context/CourseProvider";
import { isFirebaseConfigured, waitForFirebaseUser } from "../../course/lib/firebase";
import "../../course/styles/course.css";

export const Route = createFileRoute("/learn")({
  beforeLoad: async ({ location }) => {
    const path = location.pathname.replace(/\/$/, "") || "/learn";
    const isPublic = path === "/learn";
    if (isPublic) return;

    if (!isFirebaseConfigured()) {
      throw redirect({ to: "/learn" });
    }

    if (path === "/learn/login") {
      throw redirect({ to: "/learn" });
    }

    const user = await waitForFirebaseUser();
    if (!user) {
      throw redirect({ to: "/learn" });
    }
  },
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
