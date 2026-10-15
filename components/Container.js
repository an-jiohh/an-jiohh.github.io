import { Suspense } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { SITE_TITLE } from "@/lib/site";
export default function Container({ children }) {
  return <div className="site-shell">
    <Suspense fallback={<header className="site-header wrap"><span className="wordmark">{SITE_TITLE}<span className="blue-period">.</span></span></header>}><SiteHeader /></Suspense>
    <main id="main-content" className="site-main wrap">{children}</main>
    <SiteFooter />
  </div>;
}
