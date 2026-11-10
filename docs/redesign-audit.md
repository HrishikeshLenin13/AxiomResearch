# Redesign audit

Baseline: `d09a3b0` (remote `main`). This is one Vite/React/TypeScript SPA with TanStack Router file routes, Tailwind v4, shared components, an in-repository course, and an admin area. No migration or new app is needed.

| Surface       | Existing routes                                                                                                    | Preserve                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Organization  | `/`, `/about`, `/founders`, `/programs`, `/research`, `/faq`                                                       | URLs, descriptions, approved organizational information, CMS hero overrides                                                           |
| Participation | `/volunteer`, `/careers`, `/contact`, `/join`                                                                      | Tally destinations, referral query and signup logic, contact address                                                                  |
| Learning      | `/course`, `/learn`, `/learn/login`, `/learn/dashboard`, `/learn/modules/$moduleId`, per-unit quiz, `/learn/final` | Configurable entry URL, volunteer access and identity, existing content, lock and quiz rules, persisted progress and final assessment |
| Operations    | `/login`, `/admin`, admin volunteer routes                                                                         | Existing authorization, dashboards, version history, CMS, intern/referral workflows                                                   |

The course has eight source-controlled modules and timed assessments. Course state involves Firebase and local storage, with a Google Sheets synchronization bridge; Supabase covers the website CMS and other operational stores. The volunteer access route has a local Vite middleware and Vercel API implementation. Integrations, configuration files, SQL, rules, IDs and progress formats are out of scope for visual changes. There is no production data in the test plan.

The incumbent public design uses warm gradients, glass panels, animated particles, repeated cards and a flat navigation bar. Some headings only become visible after animation. The footer newsletter has no submission handler and the social placeholders lead nowhere. The landing page can teach the research process without making claims about guaranteed placement, enrollment or publication. The README calls the archive an in-development project; describe it accordingly. The shared HTML provides base metadata and the routes supply route-specific metadata; preserve existing discovery URLs.

Implementation sequence: shared tokens and public shell, homepage and program/course discovery, course shell and reading ergonomics, visual and behavior QA. Do not verify live form submissions using student data or turn on a production deployment.
