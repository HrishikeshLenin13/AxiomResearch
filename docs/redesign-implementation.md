# Redesign implementation

The public website and Axiom Learn were redesigned in the existing React/Vite application. There are no new routes or production dependencies.

- Public: simplified navigation and real destinations; keyboard disclosures and skip link; centered homepage with an original example research notebook; program status and course access information; native FAQ disclosures; simpler contact and participation routes.
- Learning: an Axiom Learn header, continued-learning action derived from stored progress, visible curriculum and lock states, responsive lesson rail, accessible progress labels and quiz answer states. Quiz timing, grading, access, identity, persistence, and exports still use the existing implementation.
- Content: CMS overrides are retained. Unsupported public claims about publishing, guaranteed mentor placement, and response times were not repeated. The nonfunctional newsletter form and placeholder social links were removed. The original contact destination and referral flow remain.
- Metadata: route titles and descriptions are applied by the router on client navigation. The homepage has static fallback metadata and no longer advertises an unrelated generated share image.
- Operational boundary: Firebase, Supabase, Sheets synchronization, repository CI, and production deployment settings were not modified. A branch-specific Vercel rule suppresses automatic deployments of the review branch; the build command, output directory, rewrites, and deployment behavior of other branches are unchanged. Live external submission and connected production account workflows require a configured non-production environment to verify.

Future follow-up: confirm current volunteer openings, publishing policies, and mentor availability with Axiom staff; add approved research examples to the archive as they become available; review the existing large Firebase-related bundle and repo-wide legacy lint findings separately.
