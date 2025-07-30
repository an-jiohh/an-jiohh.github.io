import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

export async function generateMetadata({ params }) {
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

const Post = (props) => {
  const post = allPosts.find((p) => p.slug === props.params.slug);
  const MDXComponent = useMDXComponent(post.body.code);
  return (
    <div className="mt-10 prose">
      <h1 className="">{post.title}</h1>
      <MDXComponent />
    </div>
  );
};

export default Post;

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}
