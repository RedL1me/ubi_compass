# Phase 3 Plan - Readable Intelligence Experience

## Goal

Compass should make glossary terms, KPI definitions, and publication pages easy to read, easy to trust, and easy to understand across desktop and mobile reading contexts.

## Technical Decisions

- **Reading model:** Keep GitBook as the delivery layer and improve readability through structured Markdown rather than custom UI work
- **Template-first execution:** Use consistent page patterns for glossary, KPI, and publication pages so readers know what to expect
- **Summary-first layout:** Lead with concise summaries before long-form detail, metadata, or media
- **Freshness signals:** Add visible published or updated date cues where available so readers can judge recency and authority
- **Editorial scope:** Prioritize the highest-value public pages first, then scale the pattern across the rest of the library

## Waves

### Wave 1 - Readability Standards

- Define the required page structure for glossary, KPI, and publication content
- Add freshness guidance for published or reviewed dates
- Align editorial templates and workflow notes with the Phase 3 reading model

### Wave 2 - Glossary Reading Pass (Complete)

- Normalize priority glossary pages to a summary, definition, importance, and context structure
- Reduce walls of text and ambiguous headings inherited from migration work
- Preserve related-term pathways that support continued exploration

### Wave 3 - KPI and Publication Reading Pass (Complete)

- Align KPI pages to a consistent summary-first structure with clear interpretation and why-it-matters framing
- Align publication pages to a consistent summary, publication details, highlights, and access pattern
- Improve recency and authority cues where source dates are available

### Wave 4 - Reading QA (Complete)

- Spot-check representative glossary, KPI, and publication pages in GitBook
- Verify pages remain legible on desktop and mobile
- Update planning state and capture any remaining readability gaps before Phase 4

## Acceptance Mapping

- `CONT-01`: Glossary terms read clearly and provide practical context
- `CONT-02`: KPI pages explain what the metric means and why it matters
- `CONT-03`: Publication pages expose summary information and the primary destination for the report
- `CONT-04`: Freshness indicators are visible where source dates or review dates are available
- `IA-02`: The reading experience remains legible and usable across desktop and mobile

## Expected Output

- Editorial standards clearly define what a readable Compass page looks like
- Templates and workflow guidance support consistent execution across content types
- Priority glossary, KPI, and publication pages are easier to scan and understand
- Phase 3 can be validated through a focused GitBook reading QA pass instead of ad hoc review

## Progress Notes

- Readability standards and template alignment completed on 2026-03-29
- Priority glossary normalization is underway on 2026-03-29 with completed updates for `Mentor`, `Business Accelerator`, `Innovation Ecosystem`, `Venture Capital`, `ESG Strategy`, `Business Incubator`, `Advisor`, `Coach`, `Startup Ecosystem`, and `Pre-Accelerator`
- Remaining migration-style ESG glossary pages were normalized on 2026-03-29, including the ESG overview page and the ESG requirement, admissions, funding, goals, monitoring, training, and network-affiliation entries
- Remaining migration-style core-concepts pages were normalized on 2026-03-29, including cluster, ecosystem, alliance, lifecycle, and partnership concepts
- Wave 3 started on 2026-03-29 with readability updates to `Sales Revenue`, `Client Startups Accepted`, `World Benchmark Report 2021 - 2022`, `Activating Entrepreneurship in Pakistan - Impact Study with PEP Foundation`, `Ahead of the Curve - Impact Study with Ontario Centres of Excellence`, and `Triumph of Innovation - Impact Study with District 2020`
- Additional Phase 3 batches on 2026-03-29 covered key-player entries, selected digital-wave and innovation-practice pages, two more KPI pages, and the remaining benchmark/rankings/case-study publication pages
- The remaining migration-style glossary pages were normalized on 2026-03-29 across digital-wave, financial-term, innovation-practice, organizational-type, performance-tracking, living-lab, and innovation-hub entries, leaving Wave 2 substantially complete
- Link and formatting verification passed on 2026-03-29 for the active Phase 3 batch after resolving the final cross-page reference issues
- The remaining KPI pages were normalized on 2026-03-29, bringing all `docs/kpis/ubi-global-benchmark-kpis` detail pages onto the summary-first readability pattern and effectively completing Wave 3
- Repo-side Phase 3 QA passed on 2026-03-29: all KPI detail pages now include `Summary`, publication pages already matched the pattern, `git diff --check` passed, and local Markdown link verification passed for the active batch
- Live GitBook route-and-content checks passed on 2026-03-29 after pushing `main`: representative pages for `Mentor`, `Sales Revenue`, and `World Rankings Report 2021 - 2022` resolved under the new repo-backed paths and served the expected summary-first content
- Phase 3 is complete from a content and publishing-structure perspective; remaining GitBook-native search-snippet and visual media checks are now lightweight operational follow-up rather than a Phase 3 blocker
