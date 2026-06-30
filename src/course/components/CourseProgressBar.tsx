type CourseProgressBarProps = {
  value: number;
  max: number;
  className?: string;
};

export function CourseProgressBar({ value, max, className = "" }: CourseProgressBarProps) {
  const percent = max <= 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={`course-progress-track ${className}`} role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      <div className="course-progress-fill" style={{ width: `${percent}%` }} />
    </div>
  );
}
