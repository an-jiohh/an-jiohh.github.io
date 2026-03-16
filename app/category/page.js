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
    <Suspense fallback={<div className="editorial-surface rounded-[2rem] px-6 py-16" />}>
      <PostIndexShell
        posts={posts}
        tags={tags}
        title="Category"
        description="주제별로 묶인 글을 한눈에 보고, 관심 있는 카테고리로 바로 이동할 수 있습니다."
        showCategoryGrid
        minimalHeader
        showSidebarCategories={false}
      />
    </Suspense>
  );
}
