import Head from "next/head";
import Nav from "./Nav";
import metadata from "@/data/metadata";
import Image from "next/image";
import Link from "next/link";

const Container = (props) => {
  return (
    <div className={`w-full flex flex-col items-center p-3`}>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <header
        className={`w-full max-w-3xl flex flex-row justify-between items-center my-1`}
      >             
        <Link href={`/`} className={`flex flex-row items-center`}>
          <Image
            src={`/logo.png`}
            alt="로고"
            width={30}
            height={30}
            objectFit={`cover`}
            className={`rounded-full`}
          />
          <span className={`mx-2 font-semibold text-lg`}>
            {metadata.title}
          </span>
        </Link>
        <Nav />
      </header>
      <main className={`w-full max-w-3xl`}>{props.children}</main>
    </div>
  );
};

export default Container;
