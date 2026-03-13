"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useDeferredValue } from "react";
import CategoryGrid from "@/components/CategoryGrid";
import CategoryWidget from "@/components/CategoryWidget";
import PostCard from "@/components/PostCard";
import {
  POSTS_PER_PAGE,
  clampPage,
  filterPosts,
  sortPosts,
} from "@/lib/post-utils";

export default function PostIndexShell({
  posts,
  tags,
  title,
  description,
  selectedTag = null,
  showCategoryGrid = false,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const deferredQuery = useDeferredValue(query);
  const sort = searchParams.get("sort") === "oldest" ? "oldest" : "newest";
  const parsedPage = Number.parseInt(searchParams.get("page") || "1", 10);

  const filteredPosts = sortPosts(filterPosts(posts, deferredQuery), sort);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = clampPage(parsedPage, totalPages);
  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  function updateParams(updates) {
    const nextParams = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
        nextParams.delete(key);
        return;
      }

      nextParams.set(key, String(value));
    });

    const queryString = nextParams.toString();

    startTransition(() => {
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    });
  }

  return (
    <div className="space-y-6">
      <section className="editorial-surface rounded-[2rem] px-6 py-7 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent-strong)]">
            Browse Articles
          </p>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
            {description}
          </p>
        </div>

        {showCategoryGrid ? (
          <div className="mt-8">
            <CategoryGrid tags={tags} activeTag={selectedTag} />
          </div>
        ) : null}
      </section>

      <div className="editorial-grid">
        <section className="space-y-5">
          <div className="editorial-surface rounded-[2rem] px-6 py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--color-accent-strong)]">
                  {selectedTag ? `${selectedTag} 카테고리` : "전체 게시물"}
                </p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  {deferredQuery
                    ? `"${deferredQuery}" 검색 결과 ${filteredPosts.length}개`
                    : `${filteredPosts.length}개의 글`}
                </p>
              </div>

              <label className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                <span>정렬</span>
                <select
                  value={sort}
                  onChange={(event) => updateParams({ sort: event.target.value, page: null })}
                  className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-foreground)] outline-none"
                >
                  <option value="newest">최신순</option>
                  <option value="oldest">오래된순</option>
                </select>
              </label>
            </div>
          </div>

          {visiblePosts.length ? (
            visiblePosts.map((post) => <PostCard key={post.path} post={post} />)
          ) : (
            <div className="editorial-surface rounded-[2rem] px-6 py-12 text-center">
              <p className="font-display text-2xl text-[var(--color-foreground)]">
                검색 결과가 없습니다.
              </p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">
                다른 검색어를 입력하거나 카테고리를 바꿔보세요.
              </p>
            </div>
          )}

          {totalPages > 1 ? (
            <nav className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => updateParams({ page: currentPage > 1 ? currentPage - 1 : 1 })}
                disabled={currentPage === 1}
                className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-muted)] disabled:cursor-not-allowed disabled:opacity-45"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => updateParams({ page })}
                  className={`h-11 w-11 rounded-full border text-sm font-semibold transition ${
                    page === currentPage
                      ? "border-[var(--color-accent-strong)] bg-[var(--color-accent-strong)] text-white"
                      : "border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:border-[var(--color-accent)]"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() =>
                  updateParams({
                    page: currentPage < totalPages ? currentPage + 1 : totalPages,
                  })
                }
                disabled={currentPage === totalPages}
                className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-muted)] disabled:cursor-not-allowed disabled:opacity-45"
              >
                Next →
              </button>
            </nav>
          ) : null}
        </section>

        <aside className="space-y-5">
          <CategoryWidget
            tags={tags}
            title={selectedTag ? "모든 카테고리" : "카테고리로 보기"}
            activeTag={selectedTag}
          />

          <section className="editorial-surface rounded-[2rem] px-5 py-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
              Quick Links
            </h2>
            <div className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
              <Link
                href="/blog/"
                className="block rounded-2xl bg-[var(--color-background)] px-4 py-3 hover:text-[var(--color-accent-strong)]"
              >
                모든 글 보기
              </Link>
              <Link
                href="/category/"
                className="block rounded-2xl bg-[var(--color-background)] px-4 py-3 hover:text-[var(--color-accent-strong)]"
              >
                카테고리 탐색
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
