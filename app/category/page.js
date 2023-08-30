import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";
import { allPosts } from "contentlayer/generated";
import Link from "next/link";

export default function Category() {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  const set = new Set();
  posts.map((post) => {post.tags.map((tag)=>set.add(tag))});
  const tags = [...set]; 
  return (
    <div className={`mt-10 flex flex-col`}>
      <h1 className={`text-3xl font-extrabold`}>Category</h1>
      <div className={`mt-10 mb-10 flex flex-row flex-wrap`}>
        {
            tags.map((tag)=>(
              <Link
              href={`/category/${tag}`}
              passHref
              className="m-2 px-1.5 py-0.8 hover:bg-green-300 border rounded-md bg-green-100 border-green-100"
              key={tag}
            >
                {tag}
                </Link>
            ))
            
        }
        </div>
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
