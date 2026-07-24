import { Suspense } from "react";
import PostIndexShell from "@/components/PostIndexShell";
import { getAllPosts, getAllTagEntries } from "@/lib/content";

export const metadata = {
  title: "Category",
  alternates: {
    canonical: "/category/",
  },
};

export default function Category() {
  const posts = getAllPosts();
  const tags = getAllTagEntries();

  return (
    <Suspense
      fallback={
        <div className="editorial-surface empty-state" role="status">
          카테고리 목록을 불러오는 중이에요.
        </div>
      }
    >
      <PostIndexShell
        posts={posts}
        tags={tags}
        title="카테고리"
        description="카테고리별로 묶인 글을 한눈에 보고, 관심 있는 카테고리로 바로 이동할 수 있습니다."
        showCategoryGrid
        minimalHeader
        showSidebarCategories={false}
      />
    </Suspense>
  );
}
