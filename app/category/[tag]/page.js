import { Suspense } from "react";
import { notFound } from "next/navigation";
import PostIndexShell from "@/components/PostIndexShell";
import {
  getAllTagEntries,
  getAllTagRouteParams,
  getPostsByTag,
  getTagByParam,
  getTagPath,
  isCanonicalTagParam,
} from "@/lib/content";

export async function generateMetadata({ params }) {
  const { tag } = await params;
  const tagEntry = getTagByParam(tag);

  if (!tagEntry) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: tagEntry.name,
    alternates: {
      canonical: getTagPath(tagEntry.slug),
    },
    robots: isCanonicalTagParam(tag, tagEntry)
      ? undefined
      : {
          index: false,
          follow: true,
        },
  };
}

export default async function TagsPage({ params }) {
  const { tag } = await params;
  const tagEntry = getTagByParam(tag);

  if (!tagEntry) {
    notFound();
  }

  const posts = getPostsByTag(tagEntry.name);
  const tags = getAllTagEntries();

  return (
    <Suspense fallback={<div className="editorial-surface rounded-[2rem] px-6 py-16" />}>
      <PostIndexShell
        posts={posts}
        tags={tags}
        title={tagEntry.name}
        description={`${tagEntry.name}와 관련된 글만 모아보는 카테고리 페이지입니다.`}
        selectedTag={tagEntry.name}
        showCategoryGrid
        minimalHeader
        showSidebarCategories={false}
      />
    </Suspense>
  );
}

export function generateStaticParams() {
  return getAllTagRouteParams().map((tag) => ({
    tag,
  }));
}
