type Props = {
  className?: string;
  size?: number;
};

/**
 * Axiom mark — asymmetric, no letters.
 * Composition: bold open C-arc + offset filled shard + diagonal bar +
 * satellite dot + inner hairline rings. Reads crisply down to 16px.
 */
export function AxiomMark({ className, size = 36 }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {/* outer thick open arc (opens upper-right) */}
      <path
        d="M 78 22 A 36 36 0 1 0 86 64"
        strokeWidth={9}
        strokeLinecap="round"
      />

      {/* inner asymmetric filled shard */}
      <path
        d="M 30 38 L 62 30 L 58 70 L 36 62 Z"
        fill="currentColor"
        stroke="none"
      />

      {/* diagonal bar slicing across */}
      <path
        d="M 18 78 L 82 38"
        strokeWidth={6}
        strokeLinecap="round"
      />

      {/* satellite dot upper-right */}
      <circle cx="84" cy="20" r="6" fill="currentColor" stroke="none" />

      {/* hairline inner ring (off-center) */}
      <circle cx="54" cy="52" r="22" strokeWidth={1.5} opacity="0.55" />

      {/* tiny accent dot lower-left */}
      <circle cx="14" cy="58" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
