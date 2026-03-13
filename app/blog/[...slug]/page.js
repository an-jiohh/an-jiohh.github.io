import { notFound } from "next/navigation";
import Link from "next/link";
import CategoryWidget from "@/components/CategoryWidget";
import MDXContent from "@/components/MDXContent";
import PostNavigation from "@/components/PostNavigation";
import TableOfContents, { MobileTableOfContents } from "@/components/TableOfContents";
import {
  getAdjacentPosts,
  getAllPostRouteParams,
  getPostBySlugSegments,
  getTagPath,
  isCanonicalSegments,
} from "@/lib/content";
import { formatDate, getReadingTimeLabel } from "@/lib/post-utils";

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
  const relatedTags = (post.tags || []).map((tag) => ({
    name: tag,
    slug: tag,
    canonicalPath: getTagPath(tag),
    count: 0,
  }));
  const { previousPost, nextPost } = getAdjacentPosts(post);

  return (
    <div className="space-y-6">
      <section className="editorial-surface rounded-[2rem] px-6 py-7 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-muted)]">
          <Link href="/" className="hover:text-[var(--color-accent-strong)]">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog/" className="hover:text-[var(--color-accent-strong)]">
            Blog
          </Link>
          {primaryTag ? (
            <>
              <span>/</span>
              <Link
                href={getTagPath(primaryTag)}
                className="hover:text-[var(--color-accent-strong)]"
              >
                {primaryTag}
              </Link>
            </>
          ) : null}
        </div>

        <p className="mt-6 text-sm text-[var(--color-muted)]">
          {formatDate(post.lastModified || post.date)}
        </p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
          {post.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {(post.tags || []).map((tag) => (
            <Link
              href={getTagPath(tag)}
              key={tag}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 text-sm font-medium text-[var(--color-muted)] transition hover:text-[var(--color-accent-strong)]"
            >
              {tag}
            </Link>
          ))}
          <span className="rounded-full bg-[var(--color-accent)]/55 px-3 py-1.5 text-sm font-medium text-[var(--color-accent-strong)]">
            {getReadingTimeLabel(post.readingTime)}
          </span>
        </div>
      </section>

      <MobileTableOfContents headings={post.headings} />

      <div className="editorial-grid">
        <article className="editorial-surface rounded-[2rem] px-6 py-8 sm:px-8 lg:px-10">
          <div className="editorial-prose prose prose-slate max-w-none">
            <MDXContent code={post.code} />
          </div>

          <PostNavigation previousPost={previousPost} nextPost={nextPost} />
        </article>

        <aside className="space-y-5">
          <TableOfContents headings={post.headings} />
          <CategoryWidget tags={relatedTags} title="관련 태그" />
        </aside>
      </div>
    </div>
  );
}
