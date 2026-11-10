import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { AxiomMark } from "./AxiomMark";

const groups = {
  About: [
    { to: "/about", label: "Mission and approach" },
    { to: "/founders", label: "Meet the founders" },
    { to: "/faq", label: "Frequently asked questions" },
  ],
  "Get involved": [
    { to: "/join", label: "Join as a student" },
    { to: "/volunteer", label: "Volunteer" },
    { to: "/careers", label: "Careers and open roles" },
  ],
} as const;

type Group = keyof typeof groups;

export function Navbar() {
  const { pathname } = useLocation();
  const [group, setGroup] = useState<Group | null>(null);
  const [mobile, setMobile] = useState(false);
  const header = useRef<HTMLElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const groupTriggers = useRef<Partial<Record<Group, HTMLButtonElement | null>>>({});

  useEffect(() => {
    setGroup(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    if (!group && !mobile) return;

    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setGroup(null);
        setMobile(false);
      }
    }

    function dismiss(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (group) {
        setGroup(null);
        groupTriggers.current[group]?.focus();
      } else {
        setMobile(false);
        mobileTrigger.current?.focus();
      }
    }

    window.addEventListener("pointerdown", closeOutside);
    window.addEventListener("keydown", dismiss);
    return () => {
      window.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("keydown", dismiss);
    };
  }, [group, mobile]);

  function linksFor(name: Group) {
    return groups[name].map(({ to, label }) => (
      <Link key={to} to={to} activeOptions={{ exact: true }} onClick={close}>
        {label}
      </Link>
    ));
  }

  function close() {
    setGroup(null);
    setMobile(false);
  }

  function disclosure(name: Group, id: string) {
    return (
      <div className="site-nav-group">
        <button
          ref={(node) => {
            groupTriggers.current[name] = node;
          }}
          type="button"
          aria-expanded={group === name}
          aria-controls={id}
          data-current={groups[name].some(({ to }) => pathname === to)}
          onClick={() => setGroup((current) => (current === name ? null : name))}
        >
          {name} <ChevronDown size={14} aria-hidden="true" />
        </button>
        <div className="site-nav-dropdown" id={id} hidden={group !== name}>
          {linksFor(name)}
        </div>
      </div>
    );
  }

  return (
    <header className="site-header" ref={header}>
      <div className="site-wrap site-header-inner">
        <Link to="/" className="site-brand" aria-label="Axiom home" onClick={close}>
          <AxiomMark size={27} /> Axiom
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {disclosure("About", "site-about")}
          <Link to="/programs" onClick={close}>
            Programs
          </Link>
          <Link to="/research" onClick={close}>
            Research
          </Link>
          <Link to="/course" onClick={close}>
            Learn
          </Link>
          {disclosure("Get involved", "site-involved")}
        </nav>
        <div className="site-header-actions">
          <Link to="/contact" className="site-contact" onClick={close}>
            Contact
          </Link>
          <Link to="/join" className="site-button site-button-small" onClick={close}>
            Join Axiom
          </Link>
          <button
            type="button"
            ref={mobileTrigger}
            className="site-mobile-trigger"
            onClick={() => setMobile((value) => !value)}
            aria-expanded={mobile}
            aria-controls="site-mobile-nav"
            aria-label={mobile ? "Close navigation" : "Open navigation"}
          >
            {mobile ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        className="site-mobile-nav site-wrap"
        id="site-mobile-nav"
        hidden={!mobile}
        aria-label="Mobile primary"
      >
        <div className="site-mobile-group">
          <p>Explore Axiom</p>
          {linksFor("About")}
          <Link to="/programs" onClick={close}>
            Programs
          </Link>
          <Link to="/research" onClick={close}>
            Research
          </Link>
          <Link to="/course" onClick={close}>
            Research Foundations course
          </Link>
        </div>
        <div className="site-mobile-group">
          <p>Get involved</p>
          {linksFor("Get involved")}
          <Link to="/contact" onClick={close}>
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
