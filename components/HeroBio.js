import Link from "next/link";
import {
  AUTHOR_BIO,
  AUTHOR_FOCUS,
  AUTHOR_GITHUB_URL,
  AUTHOR_NAME,
  AUTHOR_NAME_EN,
  AUTHOR_ROLE,
} from "@/lib/site";

export default function HeroBio() {
  return (
    <section className="editorial-surface rounded-[2rem] px-6 py-8 sm:px-8 lg:px-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-[var(--color-accent-strong)]">
            Personal Editorial Space
          </p>
          <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
            {AUTHOR_NAME}
            <span className="ml-3 text-lg font-medium text-[var(--color-muted)] sm:text-xl">
              {AUTHOR_NAME_EN}
            </span>
          </h1>
          <p className="mt-4 text-lg text-[var(--color-accent-strong)]">{AUTHOR_ROLE}</p>
          <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-muted)]">
            {AUTHOR_BIO}
          </p>
        </div>

        <div className="flex w-full max-w-sm flex-col gap-4 rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-background)]/85 p-5">
          <div className="flex flex-wrap gap-2">
            {AUTHOR_FOCUS.map((focus) => (
              <span
                key={focus}
                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--color-muted)]"
              >
                {focus}
              </span>
            ))}
          </div>

          <div className="rounded-[1.5rem] bg-[var(--color-accent)]/55 p-4">
            <p className="text-sm leading-7 text-[var(--color-accent-strong)]">
              설계 의도, 실험 결과, 운영 중 배운 점을 한 번 더 읽고 싶은 글 형태로
              정리합니다.
            </p>
          </div>

          <Link
            href={AUTHOR_GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center rounded-full bg-[var(--color-accent-strong)] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            GitHub 프로필 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
