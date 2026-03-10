import { notFound } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import Link from "next/link";
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
    <div className="mt-10 flex flex-col">
      <h1 className="text-3xl font-extrabold">{tagEntry.name}</h1>
      <div className="mb-10 mt-10 flex flex-row flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            href={getTagPath(tag.slug)}
            key={tag.slug}
            className="rounded-full border border-green-200 bg-green-100 px-3 py-1 text-sm text-green-900 transition hover:bg-green-200"
          >
            {tag.name}
          </Link>
        ))}
      </div>
      {posts.map((post) => (
        <BlogPost
          date={post.lastModified}
          title={post.title}
          description={post.description}
          href={post.href}
          key={post.path}
        />
      ))}
    </div>
  );
}

export function generateStaticParams() {
  return getAllTagRouteParams().map((tag) => ({
    tag,
  }));
}
