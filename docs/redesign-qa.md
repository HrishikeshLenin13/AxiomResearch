# Redesign QA

Tested on the built Vite preview using isolated Chromium contexts, local fixture identities, and no live service credentials. Requests to origins outside the local preview were blocked.

## Repository checks

| Command                  | Baseline                            | Redesign                                            |
| ------------------------ | ----------------------------------- | --------------------------------------------------- |
| `npm test`               | 138 passed, exit 0                  | 138 passed, exit 0                                  |
| `npm run typecheck`      | Exit 0                              | Exit 0                                              |
| `npm run build`          | Exit 0, existing chunk-size warning | Exit 0, existing chunk-size warning                 |
| `npm run lint`           | Exit 1: 900 findings                | Exit 1: 681 existing findings outside edited TS/TSX |
| ESLint on changed TS/TSX | —                                   | Exit 0                                              |

## Browser checks

- Opened 16 route shells at 320, 390, 768 and 1440px. Each had one primary heading and no horizontal overflow. The unauthenticated admin route retained its login redirect.
- Verified desktop skip-link focus, keyboard disclosure, Escape focus return, mobile navigation, a homepage section link, route titles, FAQ disclosure, course entry, contact URL and local referral signup.
- Exercised the course with the real local access middleware: rejected an invalid code, created a local volunteer, opened a lesson, tested mobile unit navigation, verified locked units and final access, took all eight unit quizzes and the final exam, submitted the course, reloaded progress, exported CSV and resumed with the original Volunteer ID.
- Verified the timed quiz updates, requires answers before submission and confirms before abandoning an active attempt.
- Automated axe WCAG A/AA checks passed on desktop and mobile home, mobile course access and dashboard, desktop lesson and desktop quiz. These checks do not replace testing with assistive technologies.
- Impeccable detector reported no source findings for the public routes or course components. An independent visual review flagged placeholder contrast, mobile export density and ambiguous lesson timing; all three were addressed.

Captured desktop and mobile homepage, mobile access and dashboard, desktop and mobile lesson, desktop quiz and a completed dashboard. Screenshots are review artifacts; no browser-generated binaries are checked into the application.

Not tested against live Firebase, Supabase, Tally or Sheets; no real signups, course progress or external submissions were sent. The review branch has Vercel auto-deployment disabled by branch name. No production deployment or merge is part of this change.

## Content-first follow-up

- Replaced the slogan and sample notebook with four program summaries, eligibility and cost, and a course-access note. All four program rows are fully visible at 1440×900, 1280×800, 768×900, and 390×844. At 320×720 the first two fit; the rest continue in normal scroll order. The homepage lists all eight actual course units.
- Rechecked Home, Programs, Course, Join, and Contact at all five widths. Verified program deep links, the course access gate, and that CMS overrides do not hide the program directory.
- Verified direct Join links to the existing Axiom Application on Tally (HTTP 200 and page metadata). No application was submitted. A local fixture confirmed that an invalid referral no longer shows false success and that a valid referral still records credit.
- Follow-up checks: 138 tests, TypeScript, production build, lint on edited TypeScript, and three browser axe A/AA scans (desktop home, mobile home, and direct Join).
