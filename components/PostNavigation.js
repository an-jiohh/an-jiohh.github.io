import Link from "next/link";

function NavigationCard({ label, post, align = "left" }) {
  if (!post) {
    return <div className="post-nav-placeholder hidden min-h-full lg:block" aria-hidden="true" />;
  }

  return (
    <Link
      href={post.href}
      className={`post-nav-card ${
        align === "right" ? "text-right" : ""
      }`}
    >
      <p className="meta-label">{label}</p>
      <p className="font-display post-nav-title mt-3">{post.title}</p>
      <p className="post-description mt-2">{post.description}</p>
    </Link>
  );
}

export default function PostNavigation({ previousPost, nextPost }) {
  if (!previousPost && !nextPost) {
    return null;
  }

  return (
    <nav aria-label="글 탐색" className="post-navigation">
      <NavigationCard label="이전 글" post={previousPost} />
      <NavigationCard label="다음 글" post={nextPost} align="right" />
    </nav>
  );
}
