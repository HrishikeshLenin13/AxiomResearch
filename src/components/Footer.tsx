import { Link } from "@tanstack/react-router";
import { Globe, AtSign, MessageCircle, Send, ArrowUpRight } from "lucide-react";
import { AxiomMark } from "./AxiomMark";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-2.5">
              <AxiomMark size={40} className="text-foreground" />
              <span className="font-display font-semibold text-xl">Axiom</span>
            </Link>
            <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
              A nonprofit initiative helping high school students learn research, collaborate, and share thoughtful academic work.
            </p>
            <form className="mt-7 flex max-w-sm flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-white/40 border border-border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-violet"
              />
              <button className="rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition">
                Subscribe
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8">
            <FCol title="Explore" links={[
              { to: "/about", label: "About Us" },
              { to: "/programs", label: "Programs" },
              { to: "/course", label: "Course" },
              { to: "/research", label: "Research" },
              { to: "/faq", label: "FAQ" },
            ]} />
            <FCol title="Get Involved" links={[
              { to: "/volunteer", label: "Volunteer" },
              { to: "/careers", label: "Careers" },
              { to: "/contact", label: "Contact" },
            ]} />
            <div>
              <div className="text-sm font-medium mb-4">Connect</div>
              <div className="flex gap-3">
                {[Send, AtSign, MessageCircle, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 grid place-items-center rounded-full glass hover:bg-white/10 transition">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">axiomresearchteam@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Axiom Research Initiative · Nonprofit 501(c)(3)</p>
          <p className="flex items-center gap-1">Built by students, for students <ArrowUpRight size={12} /></p>
        </div>
      </div>
    </footer>
  );
}

function FCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <div className="text-sm font-medium mb-4">{title}</div>
      <ul className="space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
