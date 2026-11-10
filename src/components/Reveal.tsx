import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
