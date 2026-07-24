import Link from "next/link";

export default function CategoryWidget({
  tags,
  title = "카테고리",
  activeTag,
  showCounts = false,
  hideHeader = false,
}) {
  return (
    <section className="editorial-surface category-widget">
      {!hideHeader ? (
        <div className="flex items-center justify-between gap-3">
          <h2 className="meta-label">
            {title}
          </h2>
          <span className="meta-label">{tags.length}개</span>
        </div>
      ) : null}

      <div className={`${hideHeader ? "" : "mt-4"} flex flex-wrap gap-2`}>
        {tags.map((tag) => {
          const active = tag.name === activeTag;

          return (
            <Link
              href={tag.canonicalPath}
              key={tag.slug}
              aria-current={active ? "page" : undefined}
              className="tag-link"
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
