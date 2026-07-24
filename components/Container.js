import { Suspense } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

function HeaderFallback() {
  return (
    <header className="editorial-surface site-header" role="status" aria-live="polite">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="h-[50px] w-64 rounded-[var(--radius-control)] bg-[var(--color-surface)]" />
        <div className="h-[50px] w-full rounded-[var(--radius-control)] bg-[var(--color-surface)] sm:w-[280px]" />
      </div>
      <span className="sr-only">헤더를 불러오는 중이에요.</span>
    </header>
  );
}

const Container = ({ children }) => {
  return (
    <div className="site-shell">
      <Suspense fallback={<HeaderFallback />}>
        <SiteHeader />
      </Suspense>
      <main id="main-content" className="site-main">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
};

export default Container;
