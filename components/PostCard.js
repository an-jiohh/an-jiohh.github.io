import Link from "next/link";
import { formatDate } from "@/lib/post-utils";

export default function PostCard({ post }) {
  return (
    <Link
      href={post.href}
      className="post-card group"
    >
      <div className="meta-label">
        <span>{formatDate(post.lastModified || post.date)}</span>
      </div>

      <h2 className="font-display post-card-title mt-3">
        {post.title}
      </h2>
      <p className="post-description mt-3 line-clamp-3">
        {post.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="글 카테고리">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="tag"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
