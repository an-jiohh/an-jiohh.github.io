import BlogPost from "@/components/BlogPost";
import { getAllPosts, getAllTagEntries, getTagPath } from "@/lib/content";
import Link from "next/link";

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
    <div className="mt-10 flex flex-col">
      <h1 className="text-3xl font-extrabold">Category</h1>
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
