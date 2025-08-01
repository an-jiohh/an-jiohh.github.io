import "./globals.css";
import { Inter } from "next/font/google";
import Container from "@/components/Container";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "지호의 블로그",
  description: "개발, 기술, 일상에 대한 생각을 기록하고 공유하는 공간입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <Head>
        <meta name="google-site-verification" content="LXzAKbA2-HVF1l60gXdTElFNxVVLxh1rk6qwe1V41so" />
      </Head>
      <body className={inter.className}>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
