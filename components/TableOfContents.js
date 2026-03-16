"use client";

import { useEffect, useState } from "react";

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
    <section className="editorial-surface rounded-[1.75rem] px-4 py-4 sm:px-5">
      <nav className="space-y-1">
        {headings.map((heading) => {
          const active = heading.id === activeId;

          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block rounded-xl px-3 py-1.5 text-sm leading-6 transition ${
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
    </section>
  );
}
