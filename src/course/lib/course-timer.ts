type TimerProgress = { timerAccumulatedMs: number; timerSessionStartedAt: number | null };

function nonNegativeMs(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

/** A clock adjustment or malformed saved value must not create negative time. */
export function getActiveTimerMs(progress: TimerProgress, now = Date.now()) {
  const started = progress.timerSessionStartedAt;
  const sessionMs = started !== null && Number.isFinite(started) && Number.isFinite(now)
    ? Math.max(0, now - started) : 0;
  return Math.min(Number.MAX_SAFE_INTEGER, nonNegativeMs(progress.timerAccumulatedMs) + sessionMs);
}

export function formatDuration(ms: number) {
  const totalSeconds = Math.floor(nonNegativeMs(ms) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
}

/** Snapshot elapsed time once; retaining other progress fields is intentional. */
export function pauseCourseTimer<T extends TimerProgress>(progress: T, now = Date.now()) {
  return {...progress, timerAccumulatedMs:getActiveTimerMs(progress,now), timerSessionStartedAt:null};
}
export function resumeCourseTimer<T extends TimerProgress>(progress: T, now = Date.now()) {
  if (!Number.isFinite(now)) throw new RangeError("Use a finite session timestamp.");
  if (progress.timerSessionStartedAt !== null && Number.isFinite(progress.timerSessionStartedAt)) return {...progress};
  return {...progress,timerSessionStartedAt:now};
}
