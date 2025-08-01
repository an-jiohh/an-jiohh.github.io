import "./globals.css";
import { Inter } from "next/font/google";
import Container from "@/components/Container";
import Head from "next/head";
import GoogleTagManager from "@/components/GoogleTagManager";
import GoogleTagManagerNoScript from "@/components/GoogleTagManagerNoScript";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "지호의 블로그",
  description: "개발, 기술, 일상에 대한 생각을 기록하고 공유하는 공간입니다.",
  verification: {
    google: "LXzAKbA2-HVF1l60gXdTElFNxVVLxh1rk6qwe1V41so",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <Head>
        <GoogleTagManager />
      </Head>
      <body className={inter.className}>
        <GoogleTagManagerNoScript />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
