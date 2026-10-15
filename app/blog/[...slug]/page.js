import { notFound } from "next/navigation";
import ArticleTOC from "@/components/ArticleTOC";
import PageIntro from "@/components/PageIntro";
import TagLinks from "@/components/TagLinks";
import MDXContent from "@/components/MDXContent";
import PostNavigation from "@/components/PostNavigation";
import {
  getAdjacentPosts,
  getAllTagEntries,
  getAllPostRouteParams,
  getPostBySlugSegments,
  getTagPath,
  isCanonicalSegments,
} from "@/lib/content";
import { formatDate } from "@/lib/post-utils";

export async function generateMetadata({ params }) {
  const { slug = [] } = await params;
  const post = getPostBySlugSegments(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This post could not be found.",
    };
  }

  const isCanonical = isCanonicalSegments(post, slug);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: post.canonicalPath,
    },
    openGraph: {
      type: "article",
      url: post.canonicalPath,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.lastModified,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    robots: isCanonical
      ? undefined
      : {
          index: false,
          follow: true,
        },
  };
}

export function generateStaticParams() {
  return getAllPostRouteParams().map((slug) => ({ slug }));
}

export default async function PostPage({ params }) {
  const { slug = [] } = await params;
  const post = getPostBySlugSegments(slug);

  if (!post) {
    notFound();
  }

  const primaryTag = post.tags?.[0] || null;
  const { previousPost, nextPost } = getAdjacentPosts(post);

  return (
    <div>
      <PageIntro title={post.title} description={post.description} compact back={{ href:"/blog/", label:"글 목록", trail:primaryTag ? {href:getTagPath(primaryTag),label:primaryTag} : undefined }}>
        <div className="article-meta"><span>수정일</span><time dateTime={post.lastModified || post.date}>{formatDate(post.lastModified || post.date)}</time></div>
        <TagLinks tags={post.tags} tagEntries={getAllTagEntries()} />
      </PageIntro>
      <div className="article-layout">
        <article className="post-article">
          <div id="article-body" className="editorial-prose"><MDXContent code={post.code} /></div>
          <PostNavigation previousPost={previousPost} nextPost={nextPost} />
        </article>
        <ArticleTOC key={post.canonicalPath} />
      </div>
    </div>
  );
}
