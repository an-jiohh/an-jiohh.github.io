import Link from "next/link";
import Icon from "./Icon";

export default function PageIntro({ title, description, back, children, compact = false }) {
  return (
    <section className={`page-intro${compact ? " page-intro--article" : ""}`}>
      {back ? <nav className="intro-breadcrumb" aria-label="현재 위치"><Link className="back-link" href={back.href}><Icon name="arrow-left" size={15} />{back.label}</Link>{back.trail ? <><span aria-hidden="true">/</span><Link className="back-link" href={back.trail.href}>{back.trail.label}</Link></> : null}</nav> : null}
      <h1 className={compact ? "article-title" : "page-heading"}>{title}<span className="blue-period">.</span></h1>
      {description ? <p className="intro-description">{description}</p> : null}
      {children}
    </section>
  );
}
