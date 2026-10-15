import Link from "next/link";
import Icon from "./Icon";
export default function PostNavigation({ previousPost, nextPost }) {
  if (!previousPost && !nextPost) return null;
  return <nav aria-label="글 탐색" className="post-navigation">{previousPost ? <Link className="post-nav-link" href={previousPost.href}><span className="meta-label"><Icon name="arrow-left" size={15} />이전 글</span><span className="post-nav-title">{previousPost.title}</span>{previousPost.description ? <span className="post-description">{previousPost.description}</span> : null}</Link> : null}{nextPost ? <Link className="post-nav-link post-nav-link--next" href={nextPost.href}><span className="meta-label">다음 글<Icon name="arrow-right" size={15} /></span><span className="post-nav-title">{nextPost.title}</span>{nextPost.description ? <span className="post-description">{nextPost.description}</span> : null}</Link> : null}</nav>;
}
