import { Link } from "@tanstack/react-router";
import { AxiomMark } from "./AxiomMark";

const groups = [
  {
    title: "Explore",
    links: [
      ["/about", "About"],
      ["/programs", "Programs"],
      ["/research", "Research"],
      ["/course", "Research Foundations"],
    ],
  },
  {
    title: "Take part",
    links: [
      ["/join", "Join Axiom"],
      ["/volunteer", "Volunteer"],
      ["/careers", "Open roles"],
    ],
  },
  {
    title: "Information",
    links: [
      ["/founders", "Founders"],
      ["/faq", "FAQ"],
      ["/contact", "Contact"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-wrap">
        <div className="site-footer-grid">
          <div>
            <Link to="/" className="site-brand" aria-label="Axiom home">
              <AxiomMark size={27} /> Axiom
            </Link>
            <p>A student-led nonprofit helping high school students learn how to do research.</p>
            <a className="site-email" href="mailto:axiomresearchteam@gmail.com">
              axiomresearchteam@gmail.com
            </a>
          </div>
          {groups.map(({ title, links }) => (
            <nav key={title} aria-label={`Footer: ${title}`}>
              <h2>{title}</h2>
              <ul>
                {links.map(([to, label]) => (
                  <li key={to}>
                    <Link to={to}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="site-footer-bottom">© {new Date().getFullYear()} Axiom Research Initiative</p>
      </div>
    </footer>
  );
}
