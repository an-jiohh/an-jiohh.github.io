import Link from "next/link";
import { getAllTags, getTagPath } from "@/lib/content";

const SideBar = () => {
  const tags = getAllTags();

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <div key={tag}>
          <Link
            href={getTagPath(tag)}
            className="tag-link inline-flex"
          >
            <div>{tag}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
