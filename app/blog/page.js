import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";

export default function Blog() {
  return (
    <div className={`mt-10 flex flex-col`}>
      <BlogPost />
      <BlogPost />
      <BlogPost />
    </div>
  );
}
