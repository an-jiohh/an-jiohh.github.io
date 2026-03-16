import Link from "next/link";

function NavigationCard({ label, post, align = "left" }) {
  if (!post) {
    return <div className="hidden min-h-full rounded-[1.75rem] border border-dashed border-[var(--color-border)] p-5 lg:block" />;
  }

  return (
    <Link
      href={post.href}
      className={`editorial-surface block rounded-[1.75rem] px-5 py-5 transition hover:-translate-y-0.5 ${
        align === "right" ? "text-right" : ""
      }`}
    >
      <p className="text-xs font-semibold text-[var(--color-muted)]">
        {label}
      </p>
      <p className="font-display mt-3 text-xl font-semibold leading-8 text-[var(--color-foreground)]">
        {post.title}
      </p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">{post.description}</p>
    </Link>
  );
}

export default function PostNavigation({ previousPost, nextPost }) {
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav className="mt-10 grid gap-4 border-t border-[var(--color-border)] pt-8 md:grid-cols-2">
      <NavigationCard label="이전 글" post={previousPost} />
      <NavigationCard label="다음 글" post={nextPost} align="right" />
    </nav>
  );
}
