# Editorial Workflow

## Principle

GitBook is the public publishing layer. This repository is the source of truth.

## Recommended Flow

1. Draft or revise content in Google Docs if the subject-matter expert prefers that workflow.
2. Review and approve the content.
3. Convert the approved version into Markdown in `docs/`.
4. Add any publishable images to `docs/media/`.
5. Reference hosted video with a public embed URL.
6. Commit and push changes so GitBook updates.

## When To Use Google Docs

Use Google Docs for drafting, collaborative review, and comment resolution.

Do not treat Google Docs as the published canonical layer once content is approved. The approved version should be represented in Markdown here.

## Publishing Rules

- One page per concept, KPI, or publication entry
- Stable filenames once a page is public
- Prefer relative image paths
- Prefer hosted video embeds over checked-in video binaries
- Keep raw source assets in Drive if they are large or still in production
