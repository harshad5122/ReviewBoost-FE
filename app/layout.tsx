import "./globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdsenseScript from "@/components/ads/AdsenseScript";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2712880469048850" crossorigin="anonymous"></script>
        <Navbar />

        {children}

        <Footer />
        <AdsenseScript />

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
