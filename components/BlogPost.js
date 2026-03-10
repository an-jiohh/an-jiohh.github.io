import Link from "next/link";
import { formatDate } from "@/lib/content";

const BlogPost = ({ date, title, description, href }) => {
  return (
    <Link
      href={href}
      className="group my-3 block w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
    >
      <div className="text-xs font-medium text-slate-400">{formatDate(date)}</div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
        {title}
      </div>
      <div className="mt-2 text-base font-medium text-slate-600 transition group-hover:text-slate-700">
        {description}
      </div>
    </Link>
  );
};

export default BlogPost;
