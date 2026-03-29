# GitBook Verification Checklist

## Goal

Verify that the rebuilt Compass repository publishes cleanly in GitBook and that the baseline discovery experience works across glossary, KPI, and publication content.

## Pre-Check

- Confirm GitBook is connected to `ubiglobalse/ubi_compass`
- Confirm the publishing branch is the intended branch
- Confirm `.gitbook.yaml` is present and GitBook is publishing from `docs/`

## Navigation Checks

- Confirm the home page resolves from `docs/README.md`
- Confirm the sidebar follows `docs/SUMMARY.md`
- Confirm the top-level sections are Glossary of Terms, KPIs & Metrics, and Publications & Reports
- Confirm category landing pages appear for glossary themes and publication/report types
- Confirm no duplicate legacy sections or unexpected orphan pages appear in the sidebar

## Search Checks

Run a few native GitBook searches and verify that results appear from more than one content type when relevant.

- Search `mentor`
  Expected: glossary content appears clearly
- Search `jobs created`
  Expected: KPI content appears clearly
- Search `world rankings`
  Expected: publication content appears clearly
- Search `esg`
  Expected: glossary and KPI-adjacent content both appear
- Search `benchmark`
  Expected: KPI framework and publication content both appear

For each result set, check that:

- The page title is recognizable and uses canonical language
- The opening snippet gives enough context to distinguish glossary, KPI, and publication pages
- The destination page matches the expected content type

## Page Spot Checks

- Open one glossary term and confirm the page starts with a clear definition and context
- Open one KPI page and confirm the page starts with a concise summary before longer detail sections
- Open one publication page with an image and confirm the media renders correctly
- Open one publication page with embedded video and confirm the embed works in the expected GitBook experience
- Follow at least one related link from a KPI or publication page and confirm cross-content discovery feels intact

## If Search Snippets Are Weak

- Improve the first one to three paragraphs of the affected page
- Tighten the H1 title and opening summary before changing structure
- Prefer fixing canonical repo Markdown before exploring any custom search solution

## Record The Outcome

- Note whether Git Sync worked without GitBook creating replacement files
- Note any sidebar mismatches versus `docs/SUMMARY.md`
- Note any searches that failed to surface the intended content type
- Feed the findings back into `.planning/STATE.md` before starting the next phase

## Suggested QA Log Template

Copy this block into the session note or planning log after verification:

```md
### GitBook Verification Result - YYYY-MM-DD

- Sync status:
- Publishing branch:
- Docs root confirmed:
- Sidebar matches `docs/SUMMARY.md`:
- Duplicate or orphan pages found:

#### Search checks

- `mentor`:
- `jobs created`:
- `world rankings`:
- `esg`:
- `benchmark`:

#### Page checks

- Glossary page checked:
- KPI page checked:
- Image-backed publication checked:
- Video-backed publication checked:
- Related-link journey checked:

#### Follow-up actions

- 
```

## Latest Attempt

### GitBook Verification Result - 2026-03-29

- Sync status: Repo-backed live paths resolved after pushing `main`
- Publishing branch: `main` appears to be the effective live branch based on the published route updates
- Docs root confirmed: `.gitbook.yaml` continues to point publishing at `docs/`
- Sidebar matches `docs/SUMMARY.md`: repo-backed route structure is now live; full sidebar-by-sidebar comparison remains a useful follow-up
- Duplicate or orphan pages found: not observed during representative direct-page checks, but not exhaustively audited in the live sidebar

#### Search checks

- `mentor`: not checked via native GitBook search UI in this terminal session
- `jobs created`: not checked via native GitBook search UI in this terminal session
- `world rankings`: not checked via native GitBook search UI in this terminal session
- `esg`: not checked via native GitBook search UI in this terminal session
- `benchmark`: not checked via native GitBook search UI in this terminal session

#### Page checks

- Glossary page checked: `glossary/key-players/mentor` resolved and served the expected summary-first content
- KPI page checked: `kpis/ubi-global-benchmark-kpis/sales-revenue` resolved and served the expected KPI structure, including `Summary`, `Interpretation`, and related links
- Image-backed publication checked: representative rankings-report route resolved; image rendering itself was not visually inspected from the terminal
- Video-backed publication checked: not visually inspected from the terminal
- Related-link journey checked: live markdown responses included canonical repo-backed related links; in-browser click-path QA remains a useful follow-up

#### Follow-up actions

- Run a lightweight in-browser follow-up for native search snippets, sidebar parity, image rendering, and video embeds
- Treat the repo-backed route alignment as verified for Phase 3 closure
