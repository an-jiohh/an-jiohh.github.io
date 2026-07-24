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
            aria-current={active ? "page" : undefined}
            className="category-card p-5"
          >
            <div className="font-display category-card-title">
              {tag.name}
            </div>
            <p className="meta-text mt-2">글 {tag.count}개</p>
          </Link>
        );
      })}
    </div>
  );
}
