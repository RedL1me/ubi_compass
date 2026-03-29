# Phase 1 Plan - Public Foundation

## Goal

Compass has a stable GitBook publishing foundation with clear information architecture, structured Markdown content, and an editorial workflow that supports images and embedded video.

## Technical Decisions

- **Publishing layer:** GitBook remains the public-facing delivery platform
- **Canonical source:** Repository Markdown is the source of truth for approved content
- **Drafting workflow:** Google Docs or Drive may be used for drafting, but approved content must land in the repo before publishing
- **Media strategy:** Images live alongside publishable content in the docs tree, while video is typically embedded from a stable public host

## Waves

### Wave 1 - Repository Foundation

- Configure GitBook to publish from `docs/`
- Establish the repository structure for public content and internal editorial guidance
- Remove the separate app scaffold

### Wave 2 - Information Architecture

- Create top-level public sections for glossary, KPIs/metrics, and publications
- Define the GitBook-friendly page hierarchy and folder layout
- Make the public structure obvious to editors and readers

### Wave 3 - Editorial Workflow

- Add internal templates for glossary terms, KPI pages, and publication entries
- Document the repo-first workflow for text, images, and embedded video
- Define a predictable media storage pattern

### Wave 4 - Verification and State Updates

- Confirm the repository reflects the GitBook publishing model
- Update roadmap, requirements, and state documents to mark Phase 1 complete
- Set Phase 2 as the next focus

## Acceptance Mapping

- `PLAT-01`: GitBook remains fully public with no member gating for core Compass content
- `PLAT-02`: The repo supports structured glossary, KPI/metric, and publication content
- `PLAT-04`: Editors have a documented pattern for publishable images and embedded video
- `IA-01`: The docs tree exposes a clear top-level structure for the three core public sections

## Execution Outcome

- Completed on 2026-03-29
- Replaced the app prototype with a GitBook-ready repository structure
- Added `.gitbook.yaml` to publish from `docs/`
- Added internal workflow and media guidance under `editorial/`
