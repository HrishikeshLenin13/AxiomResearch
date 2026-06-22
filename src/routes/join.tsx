import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import { PageHero } from "../components/PageShell";
import { Reveal } from "../components/Reveal";
import { registerMemberReferral } from "../lib/marketing-interns";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join — Axiom" },
      { name: "description", content: "Sign up to join the Axiom community." },
    ],
  }),
  component: JoinPage,
});

function JoinPage() {
  const ref = new URLSearchParams(window.location.search).get("ref");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [assignedIntern, setAssignedIntern] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = registerMemberReferral(name, email, ref);
    setAssignedIntern(result.internName ?? null);
    setSubmitted(true);
    setName("");
    setEmail("");
  }

  return (
    <>
      <PageHero
        eyebrow="Join"
        title={<>Join the <span className="text-gradient-brand">Axiom community.</span></>}
        sub="Create your member profile to get started with programs and updates."
      />
      <section className="relative pb-28 md:pb-32 px-6">
        <div className="mx-auto max-w-lg">
          <Reveal>
            <div className="glass-strong rounded-3xl p-8 md:p-10">
              {submitted ? (
                <div className="text-center">
                  <h2 className="text-2xl font-semibold">You&apos;re signed up</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {assignedIntern
                      ? `Your signup was linked to ${assignedIntern}.`
                      : "Thanks for joining. We'll be in touch soon."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {ref && (
                    <p className="text-sm text-muted-foreground">
                      Referred by: <span className="font-medium text-foreground">{ref}</span>
                    </p>
                  )}
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="join-name">
                      Name
                    </label>
                    <input
                      id="join-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      className="w-full rounded-2xl border border-border bg-white/40 px-4 py-3 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="join-email">
                      Email
                    </label>
                    <input
                      id="join-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className="w-full rounded-2xl border border-border bg-white/40 px-4 py-3 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
                  >
                    Sign up
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
