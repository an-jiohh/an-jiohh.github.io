import Link from "next/link";
import CategoryWidget from "@/components/CategoryWidget";
import PostCard from "@/components/PostCard";
import { getAllTagEntries, getFeaturedPosts } from "@/lib/content";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const posts = getFeaturedPosts();
  const tags = getAllTagEntries();

  return (
    <div className="page-stack">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display page-heading">글</h1>
          <p className="meta-text mt-2">
            새로운 글부터 차근차근 살펴보세요.
          </p>
        </div>

        <Link href="/blog/" className="section-link">
          모두 보기 →
        </Link>
      </section>

      <section className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.path} post={post} />
        ))}
      </section>

      <section className="grid gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="page-eyebrow">관심사별로</p>
            <h2 className="font-display post-card-title mt-2">카테고리</h2>
            <p className="meta-text mt-1">
              관심 있는 카테고리로 찾을 수 있어요.
            </p>
          </div>

          <Link href="/category/" className="section-link">
            전체 보기 →
          </Link>
        </div>

        <CategoryWidget tags={tags} hideHeader />
      </section>
    </div>
  );
}
