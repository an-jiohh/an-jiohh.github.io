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
    <div className="space-y-8">
      <section className="flex flex-col gap-3 px-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
            Posts
          </h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            새로운 글부터 차근차근 살펴보세요.
          </p>
        </div>

        <Link
          href="/blog/"
          className="text-sm font-medium text-[var(--color-accent-strong)] transition hover:opacity-75"
        >
          모두 보기 →
        </Link>
      </section>

      <section className="space-y-5">
        {posts.map((post) => (
          <PostCard key={post.path} post={post} />
        ))}
      </section>

      <section className="space-y-4 pt-2">
        <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-3xl">
              Category
            </h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              관심 있는 주제로 찾을 수 있어요.
            </p>
          </div>

          <Link
            href="/category/"
            className="text-sm font-medium text-[var(--color-accent-strong)] transition hover:opacity-75"
          >
            전체 보기 →
          </Link>
        </div>

        <CategoryWidget tags={tags} hideHeader />
      </section>
    </div>
  );
}
