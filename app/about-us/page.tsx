import type { Metadata } from "next";
import Link from "next/link";

import { COMPANY_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how ReviewBoost AI helps local businesses improve online reputation, local SEO visibility, and customer trust.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: `About ${SITE_NAME}`,
    description:
      "ReviewBoost AI is a SaaS platform focused on ethical review growth and measurable local SEO outcomes.",
    url: `${SITE_URL}/about-us`,
  },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "About Us", item: `${SITE_URL}/about-us` },
    ],
  };

  return (
    <main className="bg-white px-6 py-20">
      <article className="mx-auto max-w-4xl space-y-14">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-black md:text-5xl">About ReviewBoost AI</h1>
          <p className="text-lg text-gray-700">
            We build practical AI tools that help local businesses earn stronger reputations and
            sustainable organic growth.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">Our Mission</h2>
          <p className="leading-relaxed text-gray-700">
            ReviewBoost AI exists to make reputation growth fair, transparent, and data-driven. Small
            and mid-sized businesses should have access to modern tools that improve visibility without
            violating platform guidelines or sacrificing customer trust.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">What We Build</h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              1. AI-assisted review drafting to help customers communicate clear, authentic feedback.
            </li>
            <li>
              2. QR and link workflows that simplify review collection across in-store and digital touchpoints.
            </li>
            <li>3. Analytics to help teams understand scan-to-review conversion performance.</li>
            <li>4. Local SEO pages that improve discoverability and trust for buyers.</li>
          </ul>
        </section>

        <section className="space-y-4 rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-black">Company Information</h2>
          <p className="text-gray-700">
            <strong>{COMPANY_NAME}</strong> develops software products for review operations and local
            growth teams. We prioritize privacy, platform policy compliance, and transparent business
            practices.
          </p>
          <p className="text-gray-700">
            For legal and data handling details, visit our{" "}
            <Link href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms & Conditions
            </Link>
            .
          </p>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
          }}
        />
      </article>
    </main>
  );
}
