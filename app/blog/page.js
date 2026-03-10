import BlogPost from "@/components/BlogPost";
import { getAllPosts } from "@/lib/content";

export const metadata = {
  title: "Posts",
  alternates: {
    canonical: "/blog/",
  },
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="mt-10 flex flex-col">
      <h1 className="text-3xl font-extrabold">Posts</h1>
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
