"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";
import navlinks from "@/data/navlinks";
import { SITE_TITLE } from "@/lib/site";

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function isActiveLink(pathname, link) {
  if (link === "/") {
    return pathname === "/";
  }

  const normalizedLink = normalizePathname(link);
  return pathname === normalizedLink || pathname.startsWith(`${normalizedLink}/`);
}

export default function SiteHeader() {
  const pathname = normalizePathname(usePathname());
  const searchParams = useSearchParams();
  const router = useRouter();
  const isCollectionPage =
    pathname === "/blog" || pathname === "/category" || pathname.startsWith("/category/");
  const initialQuery = searchParams.get("q") || "";

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const nextParams = new URLSearchParams(
      isCollectionPage ? searchParams.toString() : ""
    );
    const trimmed = String(formData.get("q") || "").trim();

    if (trimmed) {
      nextParams.set("q", trimmed);
    } else {
      nextParams.delete("q");
    }

    nextParams.delete("page");

    if (!isCollectionPage) {
      nextParams.delete("sort");
    }

    const targetPath = isCollectionPage ? pathname : "/blog";
    const queryString = nextParams.toString();

    startTransition(() => {
      router.push(queryString ? `${targetPath}?${queryString}` : targetPath);
    });
  }

  return (
    <header className="editorial-surface site-header">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
          <Link href="/" className="site-brand flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="지호의 블로그 로고"
              width={40}
              height={40}
              priority
              className="site-logo object-cover"
            />
            <div className="flex flex-col">
              <span className="font-display text-xl leading-7">
                {SITE_TITLE}
              </span>
              {/* <span className="text-xs text-[var(--color-muted)]">
                Editorial notes on systems and engineering
              </span> */}
            </div>
          </Link>

          <nav aria-label="주요 메뉴" className="flex flex-wrap items-center gap-2">
            {navlinks.map((nav) => {
              const active = isActiveLink(pathname, nav.link);

              return (
                <Link
                  href={nav.link}
                  key={nav.title}
                  aria-current={active ? "page" : undefined}
                  className="site-nav-link"
                >
                  {nav.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <form
          onSubmit={handleSubmit}
          key={`${pathname}:${initialQuery}`}
          className="site-search flex items-center gap-2 lg:min-w-[248px]"
        >
          <button type="submit" className="search-submit" aria-label="검색">
            ⌕
          </button>
          <label className="sr-only" htmlFor="site-search">
            검색
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            defaultValue={initialQuery}
            placeholder="검색"
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-muted)] sm:w-[220px]"
          />
        </form>
      </div>
    </header>
  );
}
