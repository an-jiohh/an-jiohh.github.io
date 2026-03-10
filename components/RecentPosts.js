import Link from "next/link";
import { formatDate } from "@/lib/content";

const RecentPosts = ({ posts }) => {
  return (
    <section className="mt-10">
      <h1 className="pb-5 text-3xl font-extrabold tracking-tight">최근 게시물</h1>
      <div className="flex flex-col">
        {posts.slice(0, 5).map((post) => (
          <Link
            key={post.path}
            href={post.href}
            className="mt-5 rounded-2xl border border-slate-200 px-5 py-4 transition hover:border-slate-300 hover:shadow-sm"
          >
            <div className="text-xs font-medium text-slate-400">
              {formatDate(post.lastModified)}
            </div>
            <div className="mt-2 text-xl font-bold tracking-tight">{post.title}</div>
            <div className="mt-2 font-light text-slate-600">{post.description}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
