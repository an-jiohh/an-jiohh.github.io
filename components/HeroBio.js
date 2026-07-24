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
    <section className="editorial-surface hero-bio">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="page-eyebrow">개인 기술 기록</p>
          <h1 className="font-display page-heading mt-2">
            {AUTHOR_NAME}
            <span className="ml-3 text-xl font-medium text-[var(--color-muted)]">
              {AUTHOR_NAME_EN}
            </span>
          </h1>
          <p className="meta-text mt-4">{AUTHOR_ROLE}</p>
          <p className="post-description mt-5 max-w-xl">
            {AUTHOR_BIO}
          </p>
        </div>

        <div className="hero-bio-panel flex w-full max-w-sm flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {AUTHOR_FOCUS.map((focus) => (
              <span
                key={focus}
                className="tag"
              >
                {focus}
              </span>
            ))}
          </div>

          <div className="hero-bio-callout">
            <p className="post-description">
              설계 의도, 실험 결과, 운영 중 배운 점을 한 번 더 읽고 싶은 글 형태로
              정리합니다.
            </p>
          </div>

          <Link
            href={AUTHOR_GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="hero-action w-fit"
          >
            GitHub 프로필 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
