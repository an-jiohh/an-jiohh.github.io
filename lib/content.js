import fs from "node:fs";
import path from "node:path";
import { posts as rawPosts } from "@/.velite";
import { createHeadingSlugger, stripMarkdownText } from "@/lib/headings";

const collator = new Intl.Collator("ko");
const TAG_SLUG_OVERRIDES = {
  "2023 관광분야 GEN AI 해커톤": "2023-tourism-gen-ai-hackathon",
  "가상 면접 사례로 배우는 대규모 시스템 설계 기초 스터디":
    "large-scale-system-design-study",
  부하테스트: "load-test",
  "우테코 오픈미션": "wooteco-open-mission",
  "캐시 스탬피드": "cache-stampede",
  핫키: "hot-key",
};

function slugifySegment(value) {
  return String(value)
    .trim()
    .replace(/([a-zA-Z])([0-9])/g, "$1-$2")
    .replace(/([0-9])([a-zA-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function withoutExtension(value) {
  return value.replace(/\.[^/.]+$/, "");
}

function normalizeRouteParam(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function hashString(value) {
  let hash = 0;

  for (const char of String(value)) {
    hash = (hash * 31 + char.codePointAt(0)) >>> 0;
  }

  return hash.toString(36);
}

function readPostSource(postPath) {
  const sourcePath = path.join(process.cwd(), "posts", `${postPath}.mdx`);

  return fs.readFileSync(sourcePath, "utf8");
}

function extractHeadings(postPath) {
  const headingSlugger = createHeadingSlugger();
  const headings = [];
  let insideFence = false;

  for (const line of readPostSource(postPath).split(/\r?\n/)) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      insideFence = !insideFence;
      continue;
    }

    if (insideFence) {
      continue;
    }

    const match = trimmed.match(/^(#{2,4})\s+(.+?)\s*#*\s*$/);

    if (!match) {
      continue;
    }

    const text = stripMarkdownText(match[2]);

    if (!text) {
      continue;
    }

    headings.push({
      depth: match[1].length,
      text,
      id: headingSlugger(text),
    });
  }

  return headings;
}

function createTagSlug(tag, usedSlugs) {
  let slug =
    TAG_SLUG_OVERRIDES[tag] ||
    slugifySegment(tag) ||
    `tag-${hashString(tag)}`;

  if (usedSlugs.has(slug)) {
    slug = `${slug}-${hashString(tag)}`;
  }

  usedSlugs.add(slug);
  return slug;
}

function getPathParts(postPath) {
  const normalized = withoutExtension(postPath).replace(/\\/g, "/");
  return normalized.split("/").filter(Boolean);
}

function normalizePost(post) {
  const pathParts = getPathParts(post.path);
  const [sectionSource = "blog", ...restParts] = pathParts;
  const fileStem = restParts.at(-1) || sectionSource;
  const section = slugifySegment(sectionSource);
  const nestedSegments = restParts
    .slice(0, -1)
    .map(slugifySegment)
    .filter(Boolean);
  const leafSlug = slugifySegment(post.slug || fileStem);
  const canonicalSegments =
    section === "blog"
      ? [...nestedSegments, leafSlug]
      : [section, ...nestedSegments, leafSlug];
  const canonicalPath = `/blog/${canonicalSegments.join("/")}/`;
  const oldFlatAlias = withoutExtension(post.path).replace(/\//g, "");
  const legacyAliases = Array.from(
    new Set([oldFlatAlias, ...(post.legacySlugs || [])].filter(Boolean))
  ).filter((alias) => alias !== canonicalSegments.join("/"));

  return {
    ...post,
    section,
    sourceLabel: sectionSource,
    slug: leafSlug,
    canonicalSegments,
    canonicalPath,
    href: canonicalPath,
    legacyAliases,
    lastModified: post.updatedAt || post.date,
    readingTime: post.metadata?.readingTime,
    headings: extractHeadings(post.path),
  };
}

const normalizedPosts = rawPosts
  .filter((post) => !post.draft)
  .map(normalizePost)
  .sort(
    (a, b) =>
      Number(new Date(b.lastModified || b.date)) -
      Number(new Date(a.lastModified || a.date))
  );

const postByCanonical = new Map(
  normalizedPosts.map((post) => [post.canonicalSegments.join("/"), post])
);

const postByAlias = new Map(
  normalizedPosts.flatMap((post) =>
    post.legacyAliases.map((alias) => [alias, post])
  )
);

const usedTagSlugs = new Set();
const normalizedTagEntries = Array.from(
  new Set(normalizedPosts.flatMap((post) => post.tags || []))
)
  .sort(collator.compare)
  .map((name) => {
    const count = normalizedPosts.filter((post) => post.tags?.includes(name)).length;
    const slug = createTagSlug(name, usedTagSlugs);
    const canonicalPath = `/category/${slug}/`;
    const legacyParams = slug === name ? [] : [name];

    return {
      name,
      count,
      slug,
      canonicalPath,
      legacyParams,
    };
  });

const tagByName = new Map(normalizedTagEntries.map((tag) => [tag.name, tag]));
const tagBySlug = new Map(normalizedTagEntries.map((tag) => [tag.slug, tag]));
const tagByLegacyParam = new Map(
  normalizedTagEntries.flatMap((tag) =>
    tag.legacyParams.map((param) => [param, tag])
  )
);

export function getAllPosts() {
  return normalizedPosts;
}

export function getFeaturedPosts(limit = 5) {
  return normalizedPosts.slice(0, limit);
}

export function getPostByAlias(alias) {
  return postByAlias.get(alias) || null;
}

export function getPostBySlugSegments(segments) {
  const slugSegments = Array.isArray(segments) ? segments : [segments];
  const canonicalMatch = postByCanonical.get(slugSegments.join("/"));

  if (canonicalMatch) {
    return canonicalMatch;
  }

  if (slugSegments.length === 1) {
    return getPostByAlias(slugSegments[0]);
  }

  return null;
}

export function isCanonicalSegments(post, segments) {
  return (
    post.canonicalSegments.length === segments.length &&
    post.canonicalSegments.every((segment, index) => segment === segments[index])
  );
}

export function getAllPostRouteParams() {
  return normalizedPosts.flatMap((post) => [
    post.canonicalSegments,
    ...post.legacyAliases.map((alias) => [alias]),
  ]);
}

export function getAllTags() {
  return normalizedTagEntries.map((tag) => tag.name);
}

export function getAllTagEntries() {
  return normalizedTagEntries;
}

export function getTagByParam(param) {
  const normalizedParam = normalizeRouteParam(param);

  return (
    tagBySlug.get(normalizedParam) ||
    tagByLegacyParam.get(normalizedParam) ||
    tagByName.get(normalizedParam) ||
    null
  );
}

export function getAllTagRouteParams() {
  return normalizedTagEntries.flatMap((tag) => [tag.slug, ...tag.legacyParams]);
}

export function isCanonicalTagParam(param, tagEntry) {
  return normalizeRouteParam(param) === tagEntry.slug;
}

export function getPostsByTag(tag) {
  return normalizedPosts.filter((post) => post.tags?.includes(tag));
}

export function getAdjacentPosts(post) {
  const index = normalizedPosts.findIndex(
    (entry) => entry.canonicalPath === post.canonicalPath
  );

  if (index === -1) {
    return {
      previousPost: null,
      nextPost: null,
    };
  }

  return {
    previousPost: normalizedPosts[index - 1] || null,
    nextPost: normalizedPosts[index + 1] || null,
  };
}

export function getTagPath(tag) {
  const tagEntry = getTagByParam(tag) || tagByName.get(tag);

  if (tagEntry) {
    return tagEntry.canonicalPath;
  }

  return `/category/${encodeURIComponent(tag)}/`;
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
