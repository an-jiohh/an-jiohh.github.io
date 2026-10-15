import Link from "next/link";
import { formatDate } from "@/lib/post-utils";
import TagLinks from "./TagLinks";

export default function PostCard({ post, tagEntries = [] }) {
  return (
    <article className="post-row">
      <div className="post-row-meta"><span className="meta-label">수정일</span><time dateTime={post.lastModified || post.date}>{formatDate(post.lastModified || post.date)}</time></div>
      <div className="post-row-copy">
        <h2 className="post-card-title"><Link href={post.href}>{post.title}</Link></h2>
        {post.description ? <p className="post-description">{post.description}</p> : null}
        <TagLinks tags={post.tags} tagEntries={tagEntries} />
      </div>
    </article>
  );
}
