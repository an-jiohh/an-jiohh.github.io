import Link from "next/link";
import HeroBio from "@/components/HeroBio";
import PostCard from "@/components/PostCard";
import CategoryGrid from "@/components/CategoryGrid";
import { getAllTagEntries, getFeaturedPosts } from "@/lib/content";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  const posts = getFeaturedPosts();
  const tags = getAllTagEntries();
  return <div><HeroBio /><section className="content-section"><div className="section-heading"><h2>최신 글</h2><Link className="text-link" href="/blog/">모두 보기 →</Link></div><div className="post-list">{posts.length ? posts.map(post => <PostCard key={post.path} post={post} tagEntries={tags} />) : <p className="empty-state">아직 등록된 글이 없습니다.</p>}</div></section><section className="content-section"><div className="section-heading"><h2>카테고리</h2><Link className="text-link" href="/category/">전체 보기 →</Link></div><CategoryGrid tags={tags} /></section></div>;
}
