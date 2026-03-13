import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import Container from "@/components/Container";
import {
  AUTHOR_NAME,
  GOOGLE_SITE_VERIFICATION,
  GTM_ID,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  authors: [{ name: AUTHOR_NAME }],
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Container>{children}</Container>
        {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      </body>
    </html>
  );
}
