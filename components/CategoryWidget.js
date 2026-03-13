import Link from "next/link";

export default function CategoryWidget({
  tags,
  title = "카테고리",
  activeTag,
  showCounts = false,
}) {
  return (
    <section className="editorial-surface rounded-[2rem] px-5 py-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
          {title}
        </h2>
        <span className="text-xs text-[var(--color-muted)]">{tags.length}개</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => {
          const active = tag.name === activeTag;

          return (
            <Link
              href={tag.canonicalPath}
              key={tag.slug}
              className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                active
                  ? "border-[var(--color-accent-strong)] bg-[var(--color-accent)]/75 text-[var(--color-accent-strong)]"
                  : "border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)]"
              }`}
            >
              {tag.name}
              {showCounts ? ` · ${tag.count}` : ""}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
