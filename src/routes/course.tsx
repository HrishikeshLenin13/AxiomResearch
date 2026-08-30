import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowUpRight, BookOpen, Clock, GraduationCap } from "lucide-react";
import { CmsPageHero } from "../components/CmsPageHero";
import { Reveal } from "../components/Reveal";
import { COURSE_MODULES } from "../course/data/modules";
import { getCourseEntryUrl, isExternalCourseUrl } from "../lib/course-entry";

export const Route = createFileRoute("/course")({
  head: () => ({
    meta: [
      { title: "Course — Axiom" },
      {
        name: "description",
        content: "Research Foundations is Axiom's eight-unit course on how to do real research.",
      },
    ],
  }),
  component: CoursePreviewPage,
});

function CourseCta({ className, children }: { className: string; children: ReactNode }) {
  const href = getCourseEntryUrl();
  if (isExternalCourseUrl()) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to="/learn" className={className}>
      {children}
    </Link>
  );
}

function CoursePreviewPage() {
  return (
    <>
      <CmsPageHero
        pageKey="course"
        eyebrow="Course"
        fallbackTitle="Research Foundations"
        fallbackTitleText="Research Foundations"
        fallbackSub="A separate training site for student researchers. Preview the syllabus here, then enter the course."
      />
      <section className="relative pb-28 md:pb-32 px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="glass-strong rounded-3xl p-6 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">Enter the course</h2>
                <p className="text-muted-foreground mt-2 max-w-xl leading-relaxed">
                  The course lives on its own pages, separate from this website. Open it to read
                  full lessons and take timed multiple-choice quizzes.
                </p>
              </div>
              <CourseCta className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shrink-0">
                Go to course
                <ArrowUpRight size={16} />
              </CourseCta>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5 mt-8">
            {[
              {
                icon: BookOpen,
                title: "Eight units",
                body: "From what research is to using AI honestly, taught for high school students.",
              },
              {
                icon: Clock,
                title: "Self-paced",
                body: "Pass each unit quiz at 80% to unlock the next one, then submit the course with a final exam.",
              },
              {
                icon: GraduationCap,
                title: "Built for volunteers",
                body: "Complete this training before joining an Axiom research project.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="glass rounded-3xl p-6 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet/20 to-cyan-glow/15 border border-white/10 grid place-items-center mb-5">
                    <item.icon size={20} className="text-cyan-glow" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 glass rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-5">Syllabus preview</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {COURSE_MODULES.map((module) => (
                  <div key={module.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs text-muted-foreground">Unit {module.number}</p>
                    <p className="font-medium mt-1">{module.title}</p>
                    <p className="text-sm text-muted-foreground italic mt-1">{module.tagline}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <CourseCta className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium">
                  Open Research Foundations
                  <ArrowUpRight size={16} />
                </CourseCta>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
