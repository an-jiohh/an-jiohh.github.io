import Link from "next/link";
import { formatDate, getReadingTimeLabel } from "@/lib/post-utils";

export default function PostCard({ post }) {
  return (
    <Link
      href={post.href}
      className="editorial-surface group block rounded-[2rem] px-6 py-5 transition duration-200 hover:-translate-y-1"
    >
      <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[var(--color-muted)]">
        <span>{formatDate(post.lastModified || post.date)}</span>
        <span className="h-1 w-1 rounded-full bg-[var(--color-accent-strong)]/35" />
        <span>{getReadingTimeLabel(post.readingTime)}</span>
      </div>

      <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-[var(--color-foreground)] transition group-hover:text-[var(--color-accent-strong)]">
        {post.title}
      </h2>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--color-muted)]">
        {post.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
