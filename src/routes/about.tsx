import { createFileRoute, Link } from "@tanstack/react-router";
import { CmsPageHero } from "../components/CmsPageHero";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Axiom" },
      {
        name: "description",
        content:
          "The story, mission, and vision behind Axiom — a student-led nonprofit democratizing research.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <CmsPageHero
        pageKey="about"
        eyebrow="About Axiom"
        fallbackTitle="Built by students. For students."
        fallbackTitleText="Built by students. For students."
        fallbackSub="Axiom started with a question: why does doing research feel out of reach to so many high school students?"
      />
      <section className="site-wrap site-page-body home-split" aria-labelledby="our-story">
        <h2 className="site-subheading" id="our-story">
          The program we wanted as students.
        </h2>
        <div className="site-copy">
          <p>
            A group of high school students wanted to do research, but finding a way in often
            depended on the right school, the right city, or knowing the right person. They started
            helping one another read papers and form hypotheses.
          </p>
          <p>
            That work became Axiom: a student-led nonprofit that teaches research methods and helps
            students find ways to collaborate and share their work.
          </p>
          <Link to="/founders" className="site-text-link">
            Meet the founders <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section className="home-section home-ways">
        <div className="site-wrap">
          <h2>Make research easier to start.</h2>
          <div className="home-ways-grid">
            <article>
              <h3>Open the door</h3>
              <p>
                Teach the methods and habits that make research less intimidating for beginners.
              </p>
            </article>
            <article>
              <h3>Work together</h3>
              <p>
                Give students ways to share questions, compare approaches, and learn from peer
                feedback.
              </p>
            </article>
            <article>
              <h3>Share what holds up</h3>
              <p>Build an archive for student work that has been reviewed and approved.</p>
            </article>
          </div>
          <div className="site-actions">
            <Link to="/programs" className="site-button">
              Explore the programs <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
