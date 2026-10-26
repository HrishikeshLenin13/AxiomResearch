# Troubleshooting AxiomResearch

Use the smallest reproducible fixture before changing production data or configuration. Run commands from the repository root.

## A summary contains fewer modules than saved progress

Only modules known to the current course are exported. Stale or unknown IDs are not treated as course content.

## Time appears lost on reload

Inspect accumulated milliseconds and active start together. Use pauseCourseTimer when ending a session rather than clearing the start before accumulating it.

## A spreadsheet title starts with an apostrophe

Formula-like text is neutralized intentionally. Do not remove that guard from untrusted course titles.

## Reproduce and report

1. Record the exact command or UI action, runtime version, expected result, and actual result.
2. Run the regression command below on the same checkout and keep its first failure, not only the final summary.
3. Reduce the issue to a deterministic fixture without personal data or credentials.
4. Include the affected source path from the [feature guide](RECENT_IMPROVEMENTS.md) and whether it reproduces on a clean checkout.

```sh
npm test && npm run typecheck
```

## Recovery

Keep a copy of input data before experimenting. Revert the individual source change with Git and rerun the same fixture; a source revert does not automatically reverse browser storage, downloaded files, or external service state. Do not delete a lockfile or weaken a validation gate to make a failure disappear.
