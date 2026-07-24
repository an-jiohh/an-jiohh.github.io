import Link from "next/link";
import { formatDate } from "@/lib/content";

const BlogPost = ({ date, title, description, href }) => {
  return (
    <Link
      href={href}
      className="legacy-post-card group w-full"
    >
      <div className="meta-label">{formatDate(date)}</div>
      <div className="font-display legacy-post-title mt-2">
        {title}
      </div>
      <div className="post-description mt-2">
        {description}
      </div>
    </Link>
  );
};

export default BlogPost;
