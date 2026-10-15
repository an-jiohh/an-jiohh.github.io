import PostCard from "./PostCard";
export default function RecentPosts({ posts, tagEntries = [] }) {
  return <section className="content-section"><div className="section-heading"><h2>최근 게시물</h2></div><div className="post-list">{posts.slice(0,5).map(post => <PostCard key={post.path} post={post} tagEntries={tagEntries} />)}</div></section>;
}
