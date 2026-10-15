import Link from "next/link";
import Icon from "./Icon";
export default function CategoryGrid({ tags, activeTag }) {
  return <div className="category-list">{tags.map(tag => <Link key={tag.slug} href={tag.canonicalPath} className="category-row" aria-current={tag.name === activeTag ? "page" : undefined}><span className="category-card-title">{tag.name}</span><span className="category-count">글 {tag.count}개</span><Icon name="arrow-right" size={18} /></Link>)}</div>;
}
