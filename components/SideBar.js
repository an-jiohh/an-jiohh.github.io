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
            className="inline-flex rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            <div className="font-medium text-sm">{tag}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
