import { useEffect, useState } from "react";

const SECTIONS = [
  { heading: "Abstract", body: "High school students often struggle to distinguish credible research from popular summaries online. This review examines how structured source evaluation training affects students' ability to identify peer-reviewed evidence." },
  { heading: "Methods", body: "Forty-two students completed a four-week research methods module. Pre- and post-surveys measured source selection accuracy using a mixed set of primary papers, news articles, and opinion posts." },
  { heading: "Results", body: "Post-training scores improved by 34% on average. Students most often corrected errors related to authorship checks and peer-review status." },
  { heading: "Discussion", body: "Early exposure to research literacy may reduce reliance on unverified online claims and improve science fair and independent project quality." },
];

const FULL_TEXT = SECTIONS.map((s) => `${s.heading}\n\n${s.body}`).join("\n\n");

type TypewriterPaperProps = {
  className?: string;
};

export function TypewriterPaper({ className = "" }: TypewriterPaperProps) {
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex >= FULL_TEXT.length) {
      const reset = window.setTimeout(() => setCharIndex(0), 4500);
      return () => window.clearTimeout(reset);
    }
    const ch = FULL_TEXT[charIndex];
    const delay = ch === "\n" ? 100 : 16 + Math.random() * 20;
    const timer = window.setTimeout(() => setCharIndex((v) => v + 1), delay);
    return () => window.clearTimeout(timer);
  }, [charIndex]);

  const visible = FULL_TEXT.slice(0, charIndex);
  const parts = visible.split("\n\n");

  return (
    <div className={`course-card p-6 md:p-8 ${className}`}>
      <p className="course-kicker mb-3">Live draft preview</p>
      <div className="course-typewriter text-base md:text-lg min-h-[280px]">
        {parts.map((part, index) => {
          const lines = part.split("\n");
          const heading = lines[0];
          const body = lines.slice(1).join("\n");
          const isLast = index === parts.length - 1;
          return (
            <div key={`${heading}-${index}`} className={index > 0 ? "mt-4" : ""}>
              <p className="font-semibold text-[var(--course-accent-deep)]">{heading}</p>
              {body ? <p className="mt-2 whitespace-pre-wrap">{body}</p> : null}
              {isLast ? <span className="course-typewriter-cursor" /> : null}
            </div>
          );
        })}
        {charIndex === 0 ? <span className="course-typewriter-cursor" /> : null}
      </div>
    </div>
  );
}
