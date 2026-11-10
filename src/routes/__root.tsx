import {
  Outlet,
  HeadContent,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
} from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end.</p>
        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-white/15 px-5 py-2.5 text-sm">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { title: "Axiom — Research for High School Students" },
      {
        name: "description",
        content:
          "Axiom helps high school students learn research methods and find ways to collaborate.",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const loc = useLocation();
  const hidePublicChrome =
    loc.pathname === "/admin" ||
    loc.pathname.startsWith("/admin/") ||
    loc.pathname === "/login" ||
    loc.pathname.startsWith("/learn");
  if (hidePublicChrome)
    return (
      <>
        <HeadContent />
        <Outlet />
      </>
    );

  return (
    <div className="site-root">
      <HeadContent />
      <a className="site-skip" href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
