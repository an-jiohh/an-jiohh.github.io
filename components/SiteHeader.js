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
    <header className="editorial-surface rounded-[2rem] px-5 py-3 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
          <Link href="/" className="flex items-center gap-3 text-[15px] text-slate-900">
            <Image
              src="/logo.png"
              alt="지호의 블로그 로고"
              width={42}
              height={42}
              priority
              className="rounded-full border border-[var(--color-border)] bg-white object-cover p-1"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold tracking-tight">
                {SITE_TITLE}
              </span>
              {/* <span className="text-xs text-[var(--color-muted)]">
                Editorial notes on systems and engineering
              </span> */}
            </div>
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-[var(--color-muted)]">
            {navlinks.map((nav) => {
              const active = isActiveLink(pathname, nav.link);

              return (
                <Link
                  href={nav.link}
                  key={nav.title}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-[1.5rem] px-4 py-2 transition ${
                    active
                      ? "bg-[var(--color-accent)]/60 text-[var(--color-accent-strong)]"
                      : "hover:bg-white/70 hover:text-[var(--color-foreground)]"
                  }`}
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
          className="flex items-center gap-2.5 rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-background)]/85 px-3.5 py-2 my-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-sm transition focus-within:border-[var(--color-accent)] lg:min-w-[248px]"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-background)]/85 text-sm text-[var(--color-accent-strong)]"
          >
            ⌕
          </span>
          <label className="sr-only" htmlFor="site-search">
            검색
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            defaultValue={initialQuery}
            placeholder="제목, 설명, 태그 검색"
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--color-foreground)] outline-none placeholder:text-[var(--color-muted)]/80 sm:w-[220px]"
          />
        </form>
      </div>
    </header>
  );
}
