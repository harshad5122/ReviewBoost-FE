import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Learn how ${SITE_NAME} uses cookies and related technologies.`,
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-white px-6 py-20">
      <article className="prose prose-slate mx-auto max-w-4xl">
        <h1>Cookie Policy</h1>
        <p>
          This Cookie Policy explains how ReviewBoost AI uses cookies and similar technologies on our
          website and platform.
        </p>
        <h2>What Cookies We Use</h2>
        <p>
          We use essential cookies for authentication and session continuity, performance cookies for
          service reliability, and analytics cookies to understand product usage trends.
        </p>
        <h2>Advertising and Measurement</h2>
        <p>
          We may use advertising-related cookies from trusted partners, including Google AdSense, to
          show and measure relevant sponsored content in policy-compliant placements.
        </p>
        <h2>Your Choices</h2>
        <p>
          You can control cookies via browser settings. Blocking some categories may affect feature
          availability and account experience.
        </p>
        <h2>Updates</h2>
        <p>
          We may update this policy to reflect legal, technical, or product changes. The latest version
          is published on this page.
        </p>
      </article>
    </main>
  );
}
