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
    <Suspense fallback={<div className="editorial-surface rounded-[2rem] px-6 py-16" />}>
      <PostIndexShell
        posts={posts}
        tags={tags}
        title="Posts"
        description="검색, 정렬, 페이지네이션으로 글을 빠르게 훑어볼 수 있는 메인 아카이브입니다."
        minimalHeader
      />
    </Suspense>
  );
}
