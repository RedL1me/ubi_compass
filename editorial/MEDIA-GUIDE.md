# Media Guide

## Goal

Media needs to be easy for editors to add without creating chaos in the content tree.

## Recommended Pattern

- Store images in `docs/media/<section>/<slug>/`
- Name files predictably, for example `hero.png`, `diagram-01.png`, `chart-01.png`
- Keep page Markdown in `docs/<section>/`
- Reference images with relative paths from the page

Example:

```md
![Living Lab diagram](../media/glossary/living-lab/diagram-01.png)
```

## Video

Do not commit large raw video files into this repository unless there is a strong reason.

Preferred approach:

1. Keep raw production video in Drive
2. Publish the final video to a stable public host
3. Embed it in GitBook using the public URL

Example:

```md
{% embed url="https://www.youtube.com/watch?v=example" %}
```

## Page-Level Media Checklist

- Does the image clarify the concept, not just decorate it?
- Is the filename stable and descriptive?
- Is the video short and explanatory?
- Would a diagram communicate better than a paragraph?
- Is the media owned by a specific page and easy to find later?
