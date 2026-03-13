"use client";

import { useEffect, useState } from "react";

export function MobileTableOfContents({ headings }) {
  if (!headings.length) {
    return null;
  }

  return (
    <details className="editorial-surface rounded-[1.75rem] px-5 py-4 lg:hidden" open>
      <summary className="cursor-pointer text-sm font-semibold text-[var(--color-accent-strong)]">
        이 글의 목차
      </summary>
      <nav className="mt-4 space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className="block rounded-2xl px-3 py-2 text-sm text-[var(--color-muted)] hover:bg-[var(--color-background)]"
            style={{ paddingLeft: `${heading.depth * 0.65}rem` }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </details>
  );
}

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState(headings[0]?.id || null);

  useEffect(() => {
    if (!headings.length) {
      return undefined;
    }

    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];

        if (visibleEntry?.target?.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -60% 0px",
        threshold: [0, 1],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  return (
    <aside className="editorial-surface hidden rounded-[1.75rem] px-5 py-5 lg:sticky lg:top-6 lg:block">
      <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
        On this page
      </h2>
      <nav className="mt-4 space-y-2">
        {headings.map((heading) => {
          const active = heading.id === activeId;

          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block rounded-2xl px-3 py-2 text-sm transition ${
                active
                  ? "bg-[var(--color-accent)]/65 text-[var(--color-accent-strong)]"
                  : "text-[var(--color-muted)] hover:bg-[var(--color-background)]"
              }`}
              style={{ paddingLeft: `${heading.depth * 0.65}rem` }}
            >
              {heading.text}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
