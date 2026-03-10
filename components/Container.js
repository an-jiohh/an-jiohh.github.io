import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";
import { SITE_TITLE } from "@/lib/site";

const Container = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white px-4 py-4 text-slate-900">
      <header
        className="my-1 flex w-full max-w-3xl flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="로고"
            width={30}
            height={30}
            priority
            className="rounded-full object-cover"
          />
          <span className="text-lg font-semibold tracking-tight">{SITE_TITLE}</span>
        </Link>
        <Nav />
      </header>
      <main className="w-full max-w-3xl flex-1">{children}</main>
      <footer className="w-full max-w-3xl py-12 text-xs text-slate-400">
        기록을 오래 남기기 위한 정적 블로그.
      </footer>
    </div>
  );
};

export default Container;
