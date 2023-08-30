import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import BlogPost from "@/components/BlogPost";

const tags = (props) => {
  const posts = allPosts.filter((p) => p.tags.includes(props.params.tag));
  return (
    <div className={`mt-10 flex flex-col`}>
      <h1 className="w-full my-7 hover:-translate-x-1.5">{props.params.tag}</h1>
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
    allPosts.map((post) => {post.tags.map((tag)=>set.add(tag))});
    const tags = [...set]; 
  return tags.map((post) => ({
    tag: post,
  }));
}
