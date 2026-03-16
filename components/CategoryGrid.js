import Link from "next/link";

export default function CategoryGrid({ tags, activeTag }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {tags.map((tag) => {
        const active = tag.name === activeTag;

        return (
          <Link
            href={tag.canonicalPath}
            key={tag.slug}
            className={`rounded-[1.5rem] border px-5 py-4 transition ${
              active
                ? "border-[var(--color-accent-strong)] bg-[var(--color-accent)]/50"
                : "border-[var(--color-border)] bg-white hover:-translate-y-0.5 hover:border-[var(--color-accent)]"
            }`}
          >
            <div className="font-display text-xl font-semibold text-[var(--color-foreground)]">
              {tag.name}
            </div>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{tag.count} posts</p>
          </Link>
        );
      })}
    </div>
  );
}
