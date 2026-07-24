import Link from "next/link";
import navlinks from "@/data/navlinks";

const Nav = () => {
  return (
    <nav aria-label="주요 메뉴" className="flex flex-wrap items-center gap-2">
      {navlinks.map((nav) => (
        <Link
          href={nav.link}
          key={nav.title}
          className="site-nav-link"
        >
          {nav.title}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
