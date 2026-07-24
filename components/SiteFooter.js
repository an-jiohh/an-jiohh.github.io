import Link from "next/link";
import { AUTHOR_GITHUB_URL, AUTHOR_NAME, SITE_TITLE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="editorial-surface site-footer">
      <div className="flex flex-col gap-4 text-sm text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-[var(--color-foreground)]">
            기록을 오래 남기기 위한 블로그
          </p>
          <p className="mt-1 text-xs">
            © {new Date().getFullYear()} {AUTHOR_NAME} · {SITE_TITLE}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={AUTHOR_GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="footer-link inline-flex min-h-11 items-center px-4"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
