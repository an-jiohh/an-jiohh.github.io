import Link from "next/link";
import { AUTHOR_GITHUB_URL, AUTHOR_NAME_EN, SITE_TITLE } from "@/lib/site";
import Icon from "./Icon";
export default function SiteFooter() {
  return <footer className="site-footer"><div className="wrap">
    <div className="footer-top"><span className="section-index">{SITE_TITLE}</span><a href={AUTHOR_GITHUB_URL} target="_blank" rel="noopener noreferrer" className="footer-contact-link">GitHub<Icon name="arrow-up-right" size={20} /><span className="sr-only">(새 탭)</span></a></div>
    <div className="footer-bottom"><Link href="/" className="wordmark">{AUTHOR_NAME_EN}<span>.</span></Link><span>© {new Date().getFullYear()} · {SITE_TITLE}</span><a href="#top">맨 위로 <span aria-hidden="true">↑</span></a></div>
  </div></footer>;
}
