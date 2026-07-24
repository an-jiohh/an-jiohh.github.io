import { Suspense } from "react";
import PostIndexShell from "@/components/PostIndexShell";
import { getAllPosts, getAllTagEntries } from "@/lib/content";

export const metadata = {
  title: "Posts",
  alternates: {
    canonical: "/blog/",
  },
};

export default function Blog() {
  const posts = getAllPosts();
  const tags = getAllTagEntries();

  return (
    <Suspense
      fallback={
        <div className="editorial-surface empty-state" role="status">
          글 목록을 불러오는 중이에요.
        </div>
      }
    >
      <PostIndexShell
        posts={posts}
        tags={tags}
        title="글"
        description="검색, 정렬, 페이지네이션으로 글을 빠르게 훑어볼 수 있는 메인 아카이브입니다."
        minimalHeader
      />
    </Suspense>
  );
}
