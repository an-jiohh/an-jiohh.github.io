import { Children, isValidElement } from "react";

function hashString(value) {
  let hash = 0;

  for (const char of String(value)) {
    hash = (hash * 31 + char.codePointAt(0)) >>> 0;
  }

  return hash.toString(36);
}

export function slugifyHeadingText(value) {
  const normalized = String(value)
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, " ")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || `section-${hashString(value)}`;
}

export function stripMarkdownText(value) {
  return String(value)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function createHeadingSlugger() {
  const counts = new Map();

  return (value) => {
    const base = slugifyHeadingText(value);
    const nextCount = (counts.get(base) || 0) + 1;

    counts.set(base, nextCount);
    return nextCount === 1 ? base : `${base}-${nextCount}`;
  };
}

export function extractTextContent(children) {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }

      if (Array.isArray(child)) {
        return extractTextContent(child);
      }

      if (isValidElement(child)) {
        return extractTextContent(child.props.children);
      }

      return "";
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}
