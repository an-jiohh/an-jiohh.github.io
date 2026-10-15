import Link from "next/link";
export default function CategoryWidget({ tags, title = "카테고리", activeTag, showCounts = false, hideHeader = false }) {
  return <section className="category-widget">{!hideHeader ? <h2 className="meta-label">{title}</h2> : null}<nav className="category-links" aria-label={title}>{tags.map(tag => <Link key={tag.slug} href={tag.canonicalPath} aria-current={tag.name === activeTag ? "page" : undefined} className="tag-link">{tag.name}{showCounts ? <span className="category-count">{tag.count}</span> : null}</Link>)}</nav></section>;
}
