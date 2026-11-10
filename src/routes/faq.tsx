import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { CmsPageHero } from "../components/CmsPageHero";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Axiom" },
      {
        name: "description",
        content:
          "Common questions about Axiom programs, volunteer hours, publishing, and membership.",
      },
    ],
  }),
  component: FaqPage,
});

const groups = [
  {
    title: "Getting started",
    items: [
      {
        q: "What is Axiom?",
        a: "Axiom is a student-led nonprofit helping high school students learn academic research through structured programs, mentorship, and open publishing.",
      },
      {
        q: "Can beginners join?",
        a: "Yes. The Research Foundations program is built for students with zero prior research experience.",
      },
      {
        q: "Is this free?",
        a: "Yes. All core Axiom programs are free for participating students.",
      },
    ],
  },
  {
    title: "Programs & publishing",
    items: [
      {
        q: "Do students actually publish papers?",
        a: "Axiom is developing an open archive. Papers will be listed after submissions are received, reviewed, and approved. Publication is not guaranteed.",
      },
      {
        q: "How does peer review work?",
        a: "Trained student reviewers and mentors evaluate submissions for rigor, originality, and clarity before publication.",
      },
      {
        q: "Are mentors guaranteed?",
        a: "No. Mentored Research is application-based. Contact Axiom to check availability before planning around a placement.",
      },
    ],
  },
  {
    title: "Volunteering & hours",
    items: [
      {
        q: "How are volunteer hours awarded?",
        a: "Hours are awarded for program completion, reviewer work, leadership roles, and research contributions.",
      },
      {
        q: "How can I volunteer?",
        a: "Visit Volunteer or Careers to apply for a reviewer, ambassador, mentor, or operations role.",
      },
    ],
  },
];

function FaqPage() {
  return (
    <>
      <CmsPageHero
        pageKey="faq"
        eyebrow="FAQ"
        fallbackTitle={
          <>
            Everything you need <span className="text-gradient-brand">to know.</span>
          </>
        }
        fallbackTitleText="Everything you need to know."
        fallbackSub="Still curious? Reach out — we read every message."
      />
      <section className="site-wrap site-page-body">
        <div className="site-editorial-list">
          {groups.map(({ title, items }) => (
            <article key={title}>
              <h2>{title}</h2>
              <div className="home-questions">
                {items.map(({ q, a }) => (
                  <details key={q}>
                    <summary>
                      {q}
                      <ChevronDown size={17} aria-hidden="true" />
                    </summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
