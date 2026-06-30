import type { Callout, CourseActivity, CourseReflection, VocabularyTerm } from "../data/module-types";
import { AlertTriangle, BookMarked, Lightbulb, Sparkles } from "lucide-react";

export function LessonProse({ body }: { body: string }) {
  return (
    <div className="space-y-4 text-muted-foreground leading-relaxed">
      {body.split("\n\n").map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
    </div>
  );
}

export function CalloutBox({ callout }: { callout: Callout }) {
  const styles = {
    tip: {
      icon: Lightbulb,
      label: "Research tip",
      className: "border-cyan-glow/30 bg-cyan-glow/5",
    },
    mistake: {
      icon: AlertTriangle,
      label: "Common mistake",
      className: "border-amber-500/30 bg-amber-500/5",
    },
    "did-you-know": {
      icon: Sparkles,
      label: "Did you know?",
      className: "border-violet/30 bg-violet/5",
    },
  }[callout.type];

  const Icon = styles.icon;

  return (
    <div className={`rounded-2xl border p-4 mt-4 ${styles.className}`}>
      <div className="flex items-center gap-2 text-sm font-medium">
        <Icon size={16} />
        {callout.title || styles.label}
      </div>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{callout.body}</p>
    </div>
  );
}

export function VocabularyList({ terms }: { terms: VocabularyTerm[] }) {
  return (
    <dl className="space-y-3">
      {terms.map((item) => (
        <div key={item.term} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <dt className="font-medium flex items-center gap-2">
            <BookMarked size={14} className="text-cyan-glow" />
            {item.term}
          </dt>
          <dd className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ActivityBlock({ activity }: { activity: CourseActivity }) {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground leading-relaxed">{activity.objective}</p>
      <div>
        <p className="text-sm font-medium">Instructions</p>
        <ol className="mt-2 space-y-2 text-muted-foreground list-decimal pl-5">
          {activity.instructions.map((step) => (
            <li key={step} className="leading-relaxed">
              {step}
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
        <p className="font-medium">Deliverable</p>
        <p className="text-muted-foreground mt-1 leading-relaxed">{activity.deliverable}</p>
        <p className="text-xs text-muted-foreground mt-2">Estimated time: {activity.timeEstimate}</p>
      </div>
    </div>
  );
}

export function ReflectionBlock({ reflection }: { reflection: CourseReflection }) {
  return (
    <div className="space-y-4">
      <p className="text-lg leading-relaxed">{reflection.prompt}</p>
      <div>
        <p className="text-sm font-medium">Guidelines</p>
        <ul className="mt-2 space-y-2 text-muted-foreground list-disc pl-5">
          {reflection.guidelines.map((item) => (
            <li key={item} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
        <p className="font-medium">Length: {reflection.wordCount}</p>
        <p className="font-medium mt-3">Your response should demonstrate</p>
        <ul className="mt-2 space-y-1 text-muted-foreground list-disc pl-5">
          {reflection.rubric.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
