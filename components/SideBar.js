import Link from "next/link";
import { allPosts } from "contentlayer/generated";

const SideBar = () => {
  const posts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  const set = new Set();
  const valied = {};
  posts.map((post) => {
    post.tags.map((tag) => {
      if (tag in valied) {
        valied[tag].push(post);
      } else {
        valied[tag] = [post];
      }
      set.add(tag);
    });
  });

  return (
    <div>
      {Object.keys(valied).map((post_key) => (
        <div key={post_key}>
          <Link
            key={post_key}
            href={`/category/${post_key}`}
            passHref
            className="mt-5 pb-5 hover:border-b-4 border-b border-green-100"
          >
            <div className={`font-medium text-sm`}>{post_key}</div>
          </Link>
          {/* 세부항목 */}
          {/* {valied[post_key].map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              passHref
              className="mt-5 pb-5 hover:border-b-4 border-b border-green-100"
            >
              <div className={`font-light text-xs`}>{post.title}</div>
            </Link>
          ))} */}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
