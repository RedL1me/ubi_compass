# Compass Editorial Repository

This repository is the source of truth for Compass content.

GitBook is the publishing surface, not the canonical authoring system. Content should be maintained in Markdown here and synced to GitBook through Git Sync.

## Repository Layout

- `docs/`: public content that GitBook publishes
- `editorial/`: internal workflow docs, templates, and publishing guidance

## Editorial Model

The recommended workflow is:

1. Draft in Google Docs or Google Drive if needed.
2. Convert or copy the approved content into Markdown in `docs/`.
3. Commit and push changes.
4. Let GitBook publish from this repository.

## Media Model

- Images should live in `docs/media/` and be referenced from Markdown with relative paths.
- Video should usually be hosted externally, then embedded in GitBook pages with a public URL.
- Raw production assets can stay in Drive, but publishable assets should have a stable filename and a clear owning page.

## GitBook Configuration

GitBook is configured to publish from `docs/` via [.gitbook.yaml](/Users/aliamin/Developer/projects/ubiglobalse/ubi_compass/.gitbook.yaml).

## Contributing to Compass

We actively welcome contributions from the ecosystem to help expand and refine the UBI Global Compass Library! 

Our contribution process requires all submissions to be reviewed by the UBI Global team before publication. We offer two ways to suggest an addition or fix:

1. **Quick Form (No GitHub account needed):**
   If you have a fast suggestion or want to define a new term, you can submit it via our [Contribution Feedback Form]({INSERT_FORM_LINK_HERE}).

2. **Direct GitHub Web Edits (For technical users):**
   If you prefer to edit the documentation directly, you can use the **GitHub Web Editor**. Navigate to the specific Markdown file in the `docs/` folder, click the ✏️ (pencil) icon, make your edits, and click **Propose changes** to submit a Pull Request.

Please see our detailed [Contribution Guidelines](CONTRIBUTING.md) for more information.
