import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { type FormEvent, useState } from "react";
import { PageHero } from "../components/PageShell";
import { registerMemberReferral } from "../lib/marketing-interns";
import { AXIOM_APPLICATION_URL } from "../lib/public-programs";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "How to Join Axiom" },
      { name: "description", content: "Find the Axiom application and learn how to get involved." },
    ],
  }),
  component: JoinPage,
});

function ReferralForm({ referral }: { referral: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [assignedIntern, setAssignedIntern] = useState<string | null>(null);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Enter your name and email address.");
      return;
    }

    try {
      const result = registerMemberReferral(name, email, referral);
      if (!result.assigned || !result.internName) {
        setError(
          "We couldn’t match this referral. Check your link or use the Axiom application without a referral.",
        );
        return;
      }
      setAssignedIntern(result.internName);
    } catch {
      setError("We couldn’t record your referral. Try again or use the Axiom application.");
    }
  }

  return (
    <section className="join-referral" aria-labelledby="join-referral-title">
      <h2 id="join-referral-title">Record your referral</h2>
      {assignedIntern ? (
        <p role="status">
          Referral credited to {assignedIntern}. Use the Axiom application to finish applying.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>
            Referred by <strong>{referral}</strong>. This form records the referral; it does not
            submit an application.
          </p>
          <label htmlFor="join-name">Name</label>
          <input
            id="join-name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <label htmlFor="join-email">Email</label>
          <input
            id="join-email"
            autoComplete="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          {error && (
            <p role="alert" className="join-error">
              {error}
            </p>
          )}
          <button type="submit" className="site-button">
            Record referral
          </button>
        </form>
      )}
    </section>
  );
}

function JoinPage() {
  const referral = new URLSearchParams(window.location.search).get("ref")?.trim();

  return (
    <>
      <PageHero
        eyebrow="Join"
        title="Join Axiom"
        sub="If you’re a high school student interested in research, you can apply to get involved. No prior research experience is needed for Research Foundations."
      />
      <div className="site-wrap site-page-body join-content">
        {referral && <ReferralForm key={referral} referral={referral} />}
        <section className="join-application" aria-labelledby="join-application-title">
          <h2 className="site-subheading" id="join-application-title">
            Complete the Axiom application
          </h2>
          <p>
            Use the application to tell Axiom how you’d like to participate. The application is
            hosted on Tally. Applying is separate from course access and does not guarantee a mentor
            placement.
          </p>
          <a href={AXIOM_APPLICATION_URL} className="site-button">
            Open Axiom application <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <div className="join-support">
            <Link to="/programs" className="site-text-link">
              Compare programs first <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="site-text-link">
              Ask the team a question <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
