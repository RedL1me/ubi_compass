# GitBook Sync Setup

## Goal

Connect the GitBook space to this repository so GitBook publishes the `docs/` folder as the public Compass site.

## Repository Details

- Repository: `ubiglobalse/ubi_compass`
- Branch: `main` unless you decide to publish from another branch
- Docs root: `docs/`
- Config file: `.gitbook.yaml`

## GitBook-Side Setup

1. Open the target GitBook space
2. Go to the Git Sync setup for the space
3. Choose GitHub as the provider
4. Select the repository `ubiglobalse/ubi_compass`
5. Select the branch you want GitBook to publish from
6. Confirm the sync
7. Verify that GitBook is reading `docs/` as the root via `.gitbook.yaml`
8. Check that the sidebar reflects `docs/SUMMARY.md`

## Immediate Verification Checklist

- The home page resolves from `docs/README.md`
- The sidebar follows `docs/SUMMARY.md`
- Glossary, KPIs, and Publications appear as top-level sections
- No pages are unexpectedly omitted
- GitBook is not generating replacement markdown files for pages that already exist in the repo

## Notes

- Only GitBook administrators or creators can enable Git Sync
- Git Sync is bi-directional, so decide whether editors should be allowed to edit directly in GitBook or only via the repo
- If GitBook creates new files instead of using existing ones, the table of contents and file mapping should be checked first
