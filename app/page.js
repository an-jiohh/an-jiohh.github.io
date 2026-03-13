import Link from "next/link";
import CategoryWidget from "@/components/CategoryWidget";
import HeroBio from "@/components/HeroBio";
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
    <div className="space-y-6">
      <HeroBio />

      <div className="editorial-grid">
        <section className="space-y-5">
          <div className="editorial-surface rounded-[2rem] px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent-strong)]">
                  Recent Posts
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-4xl">
                  최근 게시물
                </h2>
              </div>

              <Link
                href="/blog/"
                className="text-sm font-medium text-[var(--color-accent-strong)] transition hover:opacity-75"
              >
                모두 보기 →
              </Link>
            </div>
          </div>

          {posts.map((post) => (
            <PostCard key={post.path} post={post} />
          ))}
        </section>

        <aside className="space-y-5">
          <CategoryWidget tags={tags} title="카테고리" showCounts />

          <section className="editorial-surface rounded-[2rem] px-5 py-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
              Note
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              모든 글은 정적 페이지로 빌드되고, 목록 검색과 정렬은 클라이언트에서
              빠르게 탐색할 수 있도록 구성됩니다.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
