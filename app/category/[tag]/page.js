import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import BlogPost from "@/components/BlogPost";
import Link from "next/link";

const tags = (props) => {
  const posts = allPosts.filter((p) => p.tags.includes(props.params.tag));
  const set = new Set();
  allPosts.map((post) => {
    post.tags.map((tag) => set.add(tag));
  });
  const tags = [...set];
  return (
    <div className={`mt-10 flex flex-col`}>
      <h1 className={`text-3xl font-extrabold`}>{props.params.tag}</h1>
      <div className={`mt-10 mb-10 flex flex-row flex-wrap`}>
        {tags.map((tag) => (
          <Link
            href={`/category/${tag}`}
            passHref
            className="m-2 px-1.5 py-0.8 hover:bg-green-300 border rounded-md bg-green-100 border-green-200"
            key={tag}
          >
            {tag}
          </Link>
        ))}
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
};

export default tags;

export async function generateStaticParams() {
  const set = new Set();
  allPosts.map((post) => {
    post.tags.map((tag) => set.add(tag));
  });
  const tags = [...set];
  return tags.map((post) => ({
    tag: post,
  }));
}
