import "./globals.css";

import { GeistSans } from "geist/font/sans";

import Navbar from "@/components/layout/Navbar";

import Footer from "@/components/layout/Footer";

import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ReviewBoost AI",

  description: "AI-powered Google review and SEO platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
        />
      </head>

      <body className={GeistSans.className}>
        {/* <Navbar /> */}

        {children}

        {/* <Footer /> */}

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
