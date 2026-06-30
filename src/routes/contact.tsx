import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CmsPageHero } from "../components/CmsPageHero";
import { Reveal } from "../components/Reveal";
import { Mail, MapPin, Sparkles, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Axiom" },
      { name: "description", content: "Get in touch with the Axiom team — partnerships, press, volunteering, or student questions." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <CmsPageHero
        pageKey="contact"
        eyebrow="Contact"
        fallbackTitle={<>Let's <span className="text-gradient-brand">talk.</span></>}
        fallbackTitleText="Let's talk."
        fallbackSub="Partnerships, press, volunteer interest, or general questions — send us a note and the team will follow up."
      />
      <section className="relative pb-28 md:pb-32 px-6">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-3">
            <div className="glass-strong rounded-3xl p-8 md:p-10 relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-violet/20 blur-3xl" />
              <div className="relative text-center">
                <h3 className="text-2xl font-display font-semibold mb-3">Reach out to us</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Use the short contact form and we'll get back to you as soon as possible.
                </p>
                <motion.a
                  href="https://tally.so/r/gDJLWP"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-medium"
                >
                  Open Contact Form <ExternalLink size={16} />
                </motion.a>
                <p className="mt-6 text-xs text-muted-foreground">We typically reply within 48 hours.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2 space-y-4">
            <InfoCard icon={Mail} title="Email" body="axiomresearchteam@gmail.com" />
            <InfoCard icon={Sparkles} title="Press" body="axiomresearchteam@gmail.com" />
            <InfoCard icon={MapPin} title="Team" body="Remote student-led organization" />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoCard({ icon: Icon, title, body }: { icon: any; title: string; body: string }) {
  return (
    <div className="glass rounded-3xl p-6 md:p-7 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet/40 to-cyan-glow/20 border border-white/10 grid place-items-center">
        <Icon size={18} className="text-cyan-glow" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</div>
        <div className="font-medium mt-0.5">{body}</div>
      </div>
    </div>
  );
}
