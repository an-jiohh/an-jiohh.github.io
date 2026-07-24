"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useDeferredValue } from "react";
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
  minimalHeader = false,
  showSidebarCategories = true,
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
    <div className="page-stack">
      {minimalHeader ? (
        <section>
          <h1 className="font-display page-heading">{title}</h1>
          <p className="meta-text mt-2">{description}</p>
        </section>
      ) : (
        <section className="editorial-surface post-hero">
          <div className="max-w-3xl">
            <h1 className="font-display page-heading">{title}</h1>
            <p className="meta-text mt-4">
              {description}
            </p>
          </div>
        </section>
      )}

      {showCategoryGrid ? (
        <CategoryWidget
          tags={tags}
          activeTag={selectedTag}
          showCounts
          hideHeader
        />
      ) : null}

      <div className={showSidebarCategories ? "editorial-grid" : "grid gap-4"}>
        <section className="grid gap-4">
          <div className="editorial-surface index-toolbar">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="meta-label">
                  {selectedTag ? `${selectedTag} 카테고리` : "전체 게시물"}
                </p>
                <p className="meta-text mt-1">
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
                  className="sort-control outline-none"
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
            <div className="editorial-surface empty-state text-center">
              <p className="font-display post-card-title">
                검색 결과가 없습니다.
              </p>
              <p className="meta-text mt-3">
                다른 검색어를 입력하거나 카테고리를 바꿔보세요.
              </p>
            </div>
          )}

          {totalPages > 1 ? (
            <nav aria-label="글 목록 페이지" className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => updateParams({ page: currentPage > 1 ? currentPage - 1 : 1 })}
                disabled={currentPage === 1}
                className="pagination-control"
              >
                ← 이전
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => updateParams({ page })}
                  aria-current={page === currentPage ? "page" : undefined}
                  className={`pagination-control is-number ${
                    page === currentPage ? "is-active" : ""
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
                className="pagination-control"
              >
                다음 →
              </button>
            </nav>
          ) : null}
        </section>

        {showSidebarCategories ? (
          <aside className="space-y-5">
            <CategoryWidget
              tags={tags}
              title={selectedTag ? "모든 카테고리" : "카테고리로 보기"}
              activeTag={selectedTag}
            />
          </aside>
        ) : null}
      </div>
    </div>
  );
}
