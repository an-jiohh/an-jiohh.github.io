import { notFound } from "next/navigation";
import MDXContent from "@/components/MDXContent";
import {
  formatDate,
  getAllPostRouteParams,
  getPostBySlugSegments,
  isCanonicalSegments,
} from "@/lib/content";

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

  return (
    <article className="mt-10">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <p className="text-sm text-slate-500">{formatDate(post.lastModified)}</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
          {post.title}
        </h1>
        <p className="mt-3 text-lg text-slate-600">{post.description}</p>
      </header>
      <div className="prose prose-slate max-w-none">
        <MDXContent code={post.code} />
      </div>
    </article>
  );
}
