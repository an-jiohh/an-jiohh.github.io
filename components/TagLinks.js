import Link from "next/link";

export default function TagLinks({ tags = [], tagEntries = [], activeTag }) {
  if (!tags.length) return null;
  return <div className="tag-links" aria-label="글 카테고리">{tags.map(tag => <Link key={tag} href={tagEntries.find(entry => entry.name === tag)?.canonicalPath || `/category/${encodeURIComponent(tag)}/`} className="tag-link" aria-current={tag === activeTag ? "page" : undefined}>{tag}</Link>)}</div>;
}
