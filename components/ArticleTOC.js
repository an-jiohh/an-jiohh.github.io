"use client";

import { useEffect, useRef, useState } from "react";

export default function ArticleTOC() {
  const [headings, setHeadings] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const mobileRef = useRef(null);

  useEffect(() => {
    const body = document.getElementById("article-body");
    if (!body) return;

    let elements = [];
    let observer;
    let frame;
    const updateCurrent = () => {
      if (!elements.length) return;
      const passed = elements.filter((heading) => heading.getBoundingClientRect().top <= 72);
      setCurrentId((passed.at(-1) || elements[0]).id);
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateCurrent);
    };
    const collect = () => {
      elements = Array.from(body.querySelectorAll("h2[id], h3[id], h4[id]"))
        .filter((heading) => heading.id && heading.textContent.trim());
      setHeadings(elements.map((heading) => ({
        id: heading.id,
        text: heading.textContent.trim(),
        level: Number(heading.tagName.slice(1)),
      })));
      observer?.disconnect();
      observer = new IntersectionObserver(scheduleUpdate, { rootMargin: "-36px 0px -65% 0px" });
      elements.forEach((heading) => observer.observe(heading));
      updateCurrent();
    };

    const collectFrame = requestAnimationFrame(collect);
    const mutations = new MutationObserver(collect);
    mutations.observe(body, { childList: true, subtree: true, characterData: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(collectFrame);
      observer?.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, []);

  if (headings.length < 2) return null;

  const links = (mobile = false) => (
    <ol className="toc-links">
      {headings.map((heading, index) => (
        <li key={`${heading.id}-${index}`} className={`toc-level-${heading.level}`}>
          <a
            href={`#${encodeURIComponent(heading.id)}`}
            aria-current={currentId === heading.id ? "location" : undefined}
            onClick={mobile ? () => { mobileRef.current.open = false; } : undefined}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <aside className="article-toc">
      <nav className="toc-desktop" aria-label="목차">
        <p className="toc-label">목차</p>
        {links()}
      </nav>
      <details className="toc-mobile" ref={mobileRef}>
        <summary>목차 <span aria-hidden="true" className="toc-chevron" /></summary>
        <nav aria-label="목차">{links(true)}</nav>
      </details>
    </aside>
  );
}
