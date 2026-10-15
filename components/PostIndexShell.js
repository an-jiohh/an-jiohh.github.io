"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useTransition } from "react";
import CategoryWidget from "./CategoryWidget";
import CategoryGrid from "./CategoryGrid";
import PostCard from "./PostCard";
import PageIntro from "./PageIntro";
import SearchField from "./SearchField";
import Pagination from "./Pagination";
import { POSTS_PER_PAGE, clampPage, filterPosts, sortPosts } from "@/lib/post-utils";

export default function PostIndexShell({ posts, tags, title, description, selectedTag = null, showCategoryGrid = false }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const query = searchParams.get("q") || "";
  const deferredQuery = useDeferredValue(query);
  const sort = searchParams.get("sort") === "oldest" ? "oldest" : "newest";
  const filteredPosts = sortPosts(filterPosts(posts, deferredQuery), sort);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = clampPage(Number.parseInt(searchParams.get("page") || "1", 10), totalPages);
  const visiblePosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);
  const busy = pending || deferredQuery !== query;

  function updateParams(updates) {
    const nextParams = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key,value]) => { if (value === null || value === "" || value === undefined) nextParams.delete(key); else nextParams.set(key,String(value)); });
    const queryString = nextParams.toString();
    startTransition(() => router.push(queryString ? `${pathname}?${queryString}` : pathname));
  }
  const searching = Boolean(query.trim());
  return <div>
    <PageIntro title={searching ? "검색" : title} description={searching ? "제목, 설명, 태그에서 검색합니다." : description} compact={!searching && Boolean(selectedTag)} back={selectedTag ? { href:"/category/",label:"카테고리" } : undefined} />
    {showCategoryGrid && !selectedTag ? <section className="category-index"><CategoryGrid tags={tags} /></section> : null}
    <section className="collection" aria-label={selectedTag ? `${selectedTag} 글 목록` : "글 목록"}>
      {showCategoryGrid && !selectedTag ? <div className="section-heading"><h2>전체 글<span className="blue-period">.</span></h2></div> : null}
      <div className="collection-toolbar">
        <SearchField query={query} onSearch={q => updateParams({q,page:null})} />
        <details className="category-filter"><summary>카테고리</summary><CategoryWidget tags={tags} activeTag={selectedTag} showCounts hideHeader /></details>
        <label className="sort-label" htmlFor="collection-sort"><span>정렬</span><span className="sort-select"><select id="collection-sort" aria-label="정렬" className="sort-control" value={sort} onChange={event => updateParams({sort:event.target.value,page:null})}><option value="newest">최신순</option><option value="oldest">오래된순</option></select></span></label>
      </div>
      <div className="collection-status"><p aria-live="polite" role="status">{busy ? "검색 중입니다." : searching ? `“${deferredQuery}” 검색 결과 ${filteredPosts.length}개` : `${filteredPosts.length}개의 글`}{selectedTag ? <span> · {selectedTag} 카테고리</span> : null}</p>{searching ? <button className="text-link" type="button" onClick={() => updateParams({q:null,page:null})}>검색 초기화</button> : null}</div>
      <div className="post-list" aria-busy={busy}>{visiblePosts.length ? visiblePosts.map(post => <PostCard key={post.path} post={post} tagEntries={tags} />) : <div className="empty-state"><h2>{searching ? "검색 결과가 없습니다." : "아직 등록된 글이 없습니다."}</h2><p>{searching ? "다른 검색어를 입력하거나 카테고리를 바꿔보세요." : "새로운 글이 등록되면 이곳에 표시됩니다."}</p>{searching ? <button className="text-link" type="button" onClick={() => updateParams({q:null,page:null})}>{selectedTag ? "이 카테고리의 모든 글 보기" : "전체 글 보기"}</button> : null}</div>}</div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPage={page => updateParams({page})} />
    </section>
  </div>;
}
