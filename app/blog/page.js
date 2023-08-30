import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";
import { allPosts } from "contentlayer/generated";

export default function Blog() {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  return (
    <div className={`mt-10 flex flex-col`}>
      <h1 className={`text-3xl font-extrabold`}>Posts</h1>
      {posts.map((post) => (
        <BlogPost
          date={post.date}
          title={post.title}
          des={post.description}
          slug={post.slug}
          key={post._id}
        />
      ))}
    </div>
  );
}
