# November implementation improvements

`studyReviewQueue(progress, modules, {limit: 10, minimumScore: 0.8})` returns pending units first, then completed units below the selected recorded-score threshold. It is deterministic, bounded, nonmutating and excludes unknown/account records. It is a library API addition; no new dashboard UI or certification claim is made.
