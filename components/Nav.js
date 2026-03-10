import Link from "next/link";
import navlinks from "@/data/navlinks";

const Nav = () => {
  return (
    <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
      {navlinks.map((nav) => (
        <Link
          href={nav.link}
          key={nav.title}
          className="transition hover:text-slate-950"
        >
          {nav.title}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
