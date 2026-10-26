# Portable study summaries and durable timer transitions

This guide covers implemented behavior. It does not change deployment or account configuration.

## Usage

```ts
import {studySummaryData, studySummaryCsv} from './src/course/lib/study-summary';
import {pauseCourseTimer, resumeCourseTimer} from './src/course/lib/course-timer';
const paused = pauseCourseTimer({timerAccumulatedMs:10,timerSessionStartedAt:100},150);
const running = resumeCourseTimer(paused,200);
console.log(running.timerAccumulatedMs); // 60
console.log(studySummaryData({completedModuleIds:[],moduleScores:{}},[],60));
```

## Contracts and limits

- The dashboard downloads text, JSON, and CSV summaries from the same known-module results. JSON uses schemaVersion 1.
- Exports allowlist course progress and elapsed time. Email, volunteer ID, access codes, and unknown saved properties are not exported. CSV quotes fields and neutralizes formula-like titles.
- Timer pause commits elapsed milliseconds and clears the active start. Resume preserves accumulated time and does not restart an already running session. Both helpers return new objects.
- Elapsed time saturates at Number.MAX_SAFE_INTEGER. Malformed saved module lists/scores normalize to empty data; titles flatten line breaks for readable text exports.

## Source map

- [`src/course/lib/study-summary.ts`](../src/course/lib/study-summary.ts)
<!-- source: src/course/lib/study-summary.ts -->
- [`src/course/lib/course-timer.ts`](../src/course/lib/course-timer.ts)
<!-- source: src/course/lib/course-timer.ts -->
- [`src/course/context/CourseProvider.tsx`](../src/course/context/CourseProvider.tsx)
<!-- source: src/course/context/CourseProvider.tsx -->
- [`tests/course-round2.test.mjs`](../tests/course-round2.test.mjs)
<!-- source: tests/course-round2.test.mjs -->

## Regression command

Run from the repository root:

```sh
npm test && npm run typecheck
```

