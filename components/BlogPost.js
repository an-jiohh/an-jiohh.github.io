import PostCard from "./PostCard";
export default function BlogPost({ date, title, description, href }) {
  return <PostCard post={{ date, title, description, href }} />;
}
