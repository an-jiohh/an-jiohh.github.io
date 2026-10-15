"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import navlinks from "@/data/navlinks";
import { SITE_TITLE, AUTHOR_GITHUB_URL } from "@/lib/site";
import ThemeSwitcher from "./ThemeSwitcher";
import Icon from "./Icon";

export default function SiteHeader() {
  const pathname = usePathname();
  const menuRef = useRef(null);
  function closeMenu(restoreFocus = false) {
    const menu = menuRef.current;
    if (!menu?.open) return;
    if (restoreFocus) menu.querySelector("summary")?.focus({ preventScroll: true });
    menu.open = false;
  }
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu?.open) return;
    const focusIsInsideMenu = menu.querySelector("nav")?.contains(document.activeElement);
    if (focusIsInsideMenu) menu.querySelector("summary")?.focus({ preventScroll: true });
    menu.open = false;
  }, [pathname]);
  function handleMobileNavigation(event) {
    closeMenu(event.detail === 0);
  }
  function links(mobile = false) {
    return <>{navlinks.map(nav => <Link key={nav.link} href={nav.link} className="site-nav-link" onClick={mobile ? handleMobileNavigation : undefined} aria-current={nav.link === "/" ? pathname === "/" ? "page" : undefined : pathname.replace(/\/$/, "").startsWith(nav.link.replace(/\/$/, "")) ? "page" : undefined}>{nav.title}</Link>)}<a href={AUTHOR_GITHUB_URL} target="_blank" rel="noopener noreferrer" className="site-nav-link header-github">GitHub<Icon name="arrow-up-right" size={16} /><span className="sr-only">(새 탭)</span></a></>;
  }
  return <header className="site-header wrap">
    <Link href="/" className="wordmark" aria-label={`${SITE_TITLE} 홈`}>{SITE_TITLE}<span className="blue-period">.</span></Link>
    <nav className="desktop-nav" aria-label="주요 메뉴">{links()}</nav>
    <ThemeSwitcher />
    <details ref={menuRef} className="nav-menu" onKeyDown={event => { if (event.key === "Escape" && menuRef.current?.open) { event.preventDefault(); closeMenu(true); } }}><summary aria-label="메뉴"><span className="nav-toggle-icon" aria-hidden="true" /></summary><nav aria-label="모바일 주요 메뉴">{links(true)}</nav></details>
  </header>;
}
