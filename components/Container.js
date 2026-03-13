import { Suspense } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

function HeaderFallback() {
  return (
    <header className="editorial-surface rounded-[2rem] px-5 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="h-12 w-64 rounded-full bg-[var(--color-background)]" />
        <div className="h-12 w-full rounded-full bg-[var(--color-background)] sm:w-[280px]" />
      </div>
    </header>
  );
}

const Container = ({ children }) => {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col px-4 pb-12 pt-5 sm:px-6 lg:px-8">
      <Suspense fallback={<HeaderFallback />}>
        <SiteHeader />
      </Suspense>
      <main className="flex-1 pb-10 pt-6">{children}</main>
      <SiteFooter />
    </div>
  );
};

export default Container;
