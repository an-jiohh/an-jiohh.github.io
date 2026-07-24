import { notFound } from "next/navigation";
import Link from "next/link";
import MDXContent from "@/components/MDXContent";
import PostNavigation from "@/components/PostNavigation";
import {
  getAdjacentPosts,
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
    <div className="page-stack">
      <section className="editorial-surface post-hero">
        <nav aria-label="현재 위치" className="meta-text flex flex-wrap items-center gap-2">
          <Link href="/" className="text-link">
            홈
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/blog/" className="text-link">
            글
          </Link>
          {primaryTag ? (
            <>
              <span aria-hidden="true">/</span>
              <Link href={getTagPath(primaryTag)} className="text-link">
                {primaryTag}
              </Link>
            </>
          ) : null}
        </nav>

        <p className="meta-label mt-6">
          수정일 · {formatDate(post.lastModified || post.date)}
        </p>
        <h1 className="font-display page-heading mt-2">
          {post.title}
        </h1>
        <p className="post-description mt-4 max-w-3xl">
          {post.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2" aria-label="글 정보">
          {(post.tags || []).map((tag) => (
            <Link
              href={getTagPath(tag)}
              key={tag}
              className="tag-link"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      <div className="post-reading-layout">
        <article className="editorial-surface post-article">
          <div className="editorial-prose prose prose-slate">
            <MDXContent code={post.code} />
          </div>

          <PostNavigation previousPost={previousPost} nextPost={nextPost} />
        </article>
      </div>
    </div>
  );
}
