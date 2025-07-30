import "./globals.css";
import { Inter } from "next/font/google";
import Container from "@/components/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "지호의 블로그",
  description: "개발, 기술, 일상에 대한 생각을 기록하고 공유하는 공간입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
