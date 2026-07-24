import Link from "next/link";
import { formatDate } from "@/lib/content";

const RecentPosts = ({ posts }) => {
  return (
    <section className="grid gap-4">
      <h1 className="font-display post-card-title">최근 게시물</h1>
      <div className="grid gap-3">
        {posts.slice(0, 5).map((post) => (
          <Link
            key={post.path}
            href={post.href}
            className="legacy-post-card"
          >
            <div className="meta-label">
              {formatDate(post.lastModified)}
            </div>
            <div className="font-display legacy-post-title mt-2">{post.title}</div>
            <div className="post-description mt-2">{post.description}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
