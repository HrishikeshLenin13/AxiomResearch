import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AxiomMark } from "./AxiomMark";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/learn", label: "Course" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/careers", label: "Careers" },
  { to: "/research", label: "Research" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5">
        <div className={`flex items-center justify-between rounded-full px-5 transition-all duration-500 ${
          scrolled ? "glass-strong py-2.5 shadow-lg shadow-black/40" : "py-3"
        }`}>
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative text-foreground">
              <AxiomMark size={36} className="transition-transform duration-500 group-hover:rotate-[18deg]" />
              <div className="absolute inset-0 bg-gradient-to-br from-violet/40 to-cyan-glow/30 blur-xl opacity-0 group-hover:opacity-70 transition-opacity" />
            </div>
            <span className="font-display font-semibold tracking-tight text-lg">Axiom</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = loc.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-3.5 py-2 text-sm rounded-full transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/5 border border-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition"
            >
              Join Axiom
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-full glass"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden mt-3 glass-strong rounded-3xl p-4 flex flex-col"
            >
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="px-4 py-3 text-sm rounded-xl hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/volunteer" className="mt-2 text-center bg-primary text-primary-foreground rounded-xl px-4 py-3 font-medium">
                Join Axiom
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
