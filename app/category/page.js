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
        {
            tags.map((tag)=>(
              <Link
              href={`/category/${tag}`}
              passHref
              className="w-full my-7 hover:-translate-x-1.5"
              key={tag}
            >
                <h1 key={tag}>{tag}</h1>
                </Link>
            ))
            
        }
      {posts.map((post) => (
        <BlogPost
          date={post.date}
          title={post.title}
          des={post.description}
          slug={post._raw.flattenedPath}
          key={post._id}
        />
      ))}
    </div>
  );
}
