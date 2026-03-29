import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const DOCS_ROOT = path.join(ROOT, "docs");
const SITEMAP_URL = "https://openlibrary.gitbook.io/compass/sitemap-pages.xml";

const SECTION_MAP = {
  "glossary-of-terms": "glossary",
  "kpis-and-metrics": "kpis",
  "publications-and-reports": "publications",
};

const STOP_PATTERNS = [
  /^Was this article helpful/i,
  /^Last updated/i,
  /^Glossary \/ Collections/i,
  /^Browse all posts inside Compass/i,
];

const KEEP_PAGE_AT_DIR = new Set([
  "industry-benchmark",
  "kpis",
  "ubi-global-benchmark-kpis",
]);

function decodeEntities(value) {
  return value
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ");
}

function cleanText(value) {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/chevron-(right|left|down|up)/g, " ")
    .replace(/hashtag/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toTitleCase(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseSitemap(xml) {
  return [...xml.matchAll(/<url>\s*<loc>(.*?)<\/loc>(?:\s*<priority>.*?<\/priority>)?(?:\s*<lastmod>(.*?)<\/lastmod>)?/gs)].map(
    (match) => ({
      url: match[1],
      lastmod: match[2] ?? null,
    }),
  );
}

function classifyPage(url) {
  const relative = url.replace("https://openlibrary.gitbook.io/compass", "").replace(/^\//, "");
  if (!relative) {
    return { kind: "root", sourceParts: [], targetSection: null };
  }

  const [sourceSection, ...sourceParts] = relative.split("/");
  const targetSection = SECTION_MAP[sourceSection];
  if (!targetSection) {
    return null;
  }

  if (
    targetSection === "publications" &&
    sourceParts[0]?.startsWith("best-practices-at-top-university-linked-business-incubators")
  ) {
    return {
      kind: "page",
      targetSection,
      sourceParts,
      targetParts: ["best-practices", sourceParts[0]],
    };
  }

  return {
    kind: "page",
    targetSection,
    sourceParts,
    targetParts: sourceParts,
  };
}

function shouldIgnorePage(page) {
  const lastPart = page.targetParts.at(-1);
  return lastPart === "article";
}

async function fetchBlocks(url) {
  const html = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } }).then((response) =>
    response.text(),
  );
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html;
  const rawBlocks = [...main.matchAll(/<(h1|h2|h3|p|li)[^>]*>([\s\S]*?)<\/\1>/g)].map(([, tag, inner]) => ({
    tag,
    text: cleanText(inner),
  }));

  const h1Index = rawBlocks.findIndex((block) => block.tag === "h1");
  const sliced = h1Index >= 0 ? rawBlocks.slice(h1Index) : rawBlocks;
  const deduped = sliced.filter((block, index, array) => {
    if (!block.text || block.text === "👍" || block.text === "👎" || block.text === "👍 👎") {
      return false;
    }
    if (STOP_PATTERNS.some((pattern) => pattern.test(block.text))) {
      return false;
    }
    return block.text !== array[index - 1]?.text;
  });

  return deduped;
}

function hasChildren(page, pages) {
  const prefix = page.targetParts.join("/");
  return pages.some(
    (candidate) =>
      candidate !== page &&
      candidate.targetSection === page.targetSection &&
      candidate.targetParts.join("/").startsWith(`${prefix}/`),
  );
}

function outputPathForPage(page, pages) {
  if (page.kind === "root") {
    return path.join(DOCS_ROOT, "README.md");
  }

  const baseDir = path.join(DOCS_ROOT, page.targetSection, ...page.targetParts);
  const directDir = page.targetParts.length === 1 && KEEP_PAGE_AT_DIR.has(page.targetParts[0]);

  if (hasChildren(page, pages) || directDir) {
    return path.join(baseDir, "README.md");
  }

  return path.join(DOCS_ROOT, page.targetSection, ...page.targetParts.slice(0, -1), `${page.targetParts.at(-1)}.md`);
}

function directChildrenOf(page, pages) {
  const prefix = page.targetParts.join("/");
  const depth = page.targetParts.length + 1;
  return pages.filter((candidate) => {
    if (candidate.kind !== "page" || candidate === page || candidate.targetSection !== page.targetSection) {
      return false;
    }
    if (!candidate.targetParts.join("/").startsWith(`${prefix}/`)) {
      return false;
    }
    return candidate.targetParts.length === depth;
  });
}

function pageLink(fromFile, toFile) {
  const fromDir = path.dirname(fromFile);
  return path.relative(fromDir, toFile).replace(/\\/g, "/");
}

function markdownFromBlocks(blocks) {
  const body = [];
  let listBuffer = [];

  function flushList() {
    if (listBuffer.length) {
      body.push(listBuffer.map((item) => `- ${item}`).join("\n"));
      listBuffer = [];
    }
  }

  for (const block of blocks.slice(1)) {
    if (block.tag === "li") {
      listBuffer.push(block.text);
      continue;
    }

    flushList();

    if (block.tag === "h2") {
      body.push(`## ${block.text}`);
    } else if (block.tag === "h3") {
      body.push(`### ${block.text}`);
    } else if (block.tag === "p") {
      body.push(block.text);
    }
  }

  flushList();
  return body;
}

function composeRootDoc() {
  return [
    "# Compass",
    "",
    "## Industry Intelligence",
    "",
    "A centralized source of authoritative terminology and intelligence for the startup business incubator industry.",
    "",
    "Welcome to Compass. UBI Global is advancing industry intelligence for global startup incubators and accelerators through a comprehensive terminology library combined with industry intelligence.",
    "",
    "Compass is intended to expand over time with glossary terms, KPI guidance, and research reports that help ecosystem actors build a shared language and act on stronger information.",
    "",
    "## Sections",
    "",
    "- [Glossary](./glossary/README.md)",
    "- [KPIs & Metrics](./kpis/README.md)",
    "- [Publications & Reports](./publications/README.md)",
    "",
    "## Repository Note",
    "",
    "GitBook is the publishing layer. This repository is the canonical Markdown source of truth for approved Compass content.",
    "",
  ].join("\n");
}

function composeSectionReadme(section, title, intro, categories) {
  return [
    `# ${title}`,
    "",
    intro,
    "",
    "## Categories",
    "",
    ...categories.map((category) => `- [${category.title}](${category.link})`),
    "",
  ].join("\n");
}

function composeSummary(contentPages) {
  const lines = ["# Table of contents", "", "* [Compass](README.md)"];

  const sectionOrder = [
    { key: "glossary", title: "Glossary of Terms" },
    { key: "kpis", title: "KPIs & Metrics" },
    { key: "publications", title: "Publications & Reports" },
  ];

  function addChildren(page, depth = 1) {
    const pageFile = outputPathForPage(page, contentPages);
    const label = page.title ?? toTitleCase(page.targetParts.at(-1));
    const relative = pageLink(path.join(DOCS_ROOT, "SUMMARY.md"), pageFile);
    lines.push(`${"  ".repeat(depth)}* [${label}](${relative})`);

    const children = directChildrenOf(page, contentPages).sort((a, b) => a.title.localeCompare(b.title));
    for (const child of children) {
      addChildren(child, depth + 1);
    }
  }

  for (const section of sectionOrder) {
    lines.push("");
    lines.push(`* [${section.title}](${section.key}/README.md)`);
    const topLevel = contentPages
      .filter((page) => page.targetSection === section.key && page.targetParts.length === 1)
      .sort((a, b) => a.title.localeCompare(b.title));
    for (const page of topLevel) {
      addChildren(page, 1);
    }
  }

  lines.push("");
  return lines.join("\n");
}

function composePageMarkdown(page, blocks, outputFile, pages) {
  const title = blocks[0]?.text ?? toTitleCase(page.targetParts.at(-1) ?? page.targetSection);
  const lines = [`# ${title}`, ""];
  const body = markdownFromBlocks(blocks);
  if (body.length) {
    lines.push(...body, "");
  }

  const children = page.kind === "page" ? directChildrenOf(page, pages) : [];
  if (children.length) {
    lines.push("## Pages", "");
    for (const child of children) {
      const childFile = outputPathForPage(child, pages);
      const childTitle = child.title ?? toTitleCase(child.targetParts.at(-1));
      lines.push(`- [${childTitle}](${pageLink(outputFile, childFile)})`);
    }
    lines.push("");
  }

  lines.push("## Source", "", `- Migrated from the current Compass GitBook page on 2026-03-29`, `- Source URL: ${page.url}`, "");
  return lines.join("\n");
}

async function main() {
  const sitemapXml = await fetch(SITEMAP_URL, { headers: { "user-agent": "Mozilla/5.0" } }).then((response) =>
    response.text(),
  );
  const rawPages = parseSitemap(sitemapXml);
  const classified = rawPages
    .map((page) => ({ ...page, ...classifyPage(page.url) }))
    .filter(Boolean);

  const contentPages = [];
  for (const page of classified) {
    if (page.kind === "root" || shouldIgnorePage(page)) {
      continue;
    }
    const blocks = await fetchBlocks(page.url);
    if (!blocks.length || (blocks.length === 1 && blocks[0].text.toLowerCase() === "article")) {
      continue;
    }
    contentPages.push({ ...page, blocks, title: blocks[0].text });
  }

  await writeFile(path.join(DOCS_ROOT, "README.md"), composeRootDoc(), "utf8");

  const sectionPages = {
    glossary: contentPages.filter((page) => page.targetSection === "glossary" && page.targetParts.length === 1),
    kpis: contentPages.filter((page) => page.targetSection === "kpis" && page.targetParts.length === 1),
    publications: contentPages.filter((page) => page.targetSection === "publications" && page.targetParts.length === 1),
  };

  const sectionConfigs = [
    {
      key: "glossary",
      title: "Glossary of Terms",
      intro:
        "This section contains terminology, concepts, actors, and operating models used across incubation and acceleration.",
    },
    {
      key: "kpis",
      title: "KPIs & Metrics",
      intro:
        "This section explains benchmark measures, metric definitions, and interpretation guidance across the current Compass library.",
    },
    {
      key: "publications",
      title: "Publications & Reports",
      intro:
        "This section catalogs reports, briefs, and other reference material relevant to the Compass audience.",
    },
  ];

  for (const config of sectionConfigs) {
    const categories = sectionPages[config.key].map((page) => ({
      title: page.title,
      link: pageLink(path.join(DOCS_ROOT, config.key, "README.md"), outputPathForPage(page, contentPages)),
    }));
    await writeFile(
      path.join(DOCS_ROOT, config.key, "README.md"),
      composeSectionReadme(config.key, config.title, config.intro, categories),
      "utf8",
    );
  }

  await writeFile(path.join(DOCS_ROOT, "SUMMARY.md"), composeSummary(contentPages), "utf8");

  for (const page of contentPages) {
    const outputFile = outputPathForPage(page, contentPages);
    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, composePageMarkdown(page, page.blocks, outputFile, contentPages), "utf8");
  }

  console.log(`Migrated ${contentPages.length} GitBook pages into ${DOCS_ROOT}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
