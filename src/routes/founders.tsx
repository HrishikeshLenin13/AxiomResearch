import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "../components/PageShell";

export const Route = createFileRoute("/founders")({
  head: () => ({
    meta: [
      { title: "Founders — Axiom" },
      {
        name: "description",
        content: "Learn about the student-led team behind the Axiom Research Initiative.",
      },
    ],
  }),
  component: FoundersPage,
});

function FoundersPage() {
  return (
    <>
      <PageHero
        eyebrow="Founders"
        title="Meet the founders."
        sub="Founder profiles are planned for summer 2027."
      />
      <section className="site-wrap site-page-body">
        <Link to="/about" className="site-text-link">
          Read how Axiom started <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
