import RecentPosts from "@/components/RecentPosts";
import { getFeaturedPosts } from "@/lib/content";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const posts = getFeaturedPosts();

  return (
    <div className="my-5 w-full">
      <RecentPosts posts={posts} />
    </div>
  );
}
