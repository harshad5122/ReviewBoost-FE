import type { Metadata } from "next";

import { SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact ReviewBoost AI for product support, partnership opportunities, and onboarding assistance.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: `Contact ${SITE_NAME}`,
    description: "Reach the ReviewBoost AI team for SaaS support and business inquiries.",
    url: `${SITE_URL}/contact-us`,
  },
};

export default function ContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contact Us", item: `${SITE_URL}/contact-us` },
    ],
  };

  return (
    <main className="bg-white px-6 py-20">
      <article className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-black md:text-5xl">Contact ReviewBoost AI</h1>
          <p className="mx-auto max-w-3xl text-lg text-gray-700">
            We respond to product, account, and partnership inquiries. Share your use case and our
            team will guide you with the right onboarding path.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-gray-200 p-6">
            <h2 className="mb-2 text-lg font-semibold text-black">Support</h2>
            <p className="text-gray-700">{SUPPORT_EMAIL}</p>
          </article>
          <article className="rounded-2xl border border-gray-200 p-6">
            <h2 className="mb-2 text-lg font-semibold text-black">Business Hours</h2>
            <p className="text-gray-700">Monday to Friday, 9:00 AM - 6:00 PM (PT)</p>
          </article>
          <article className="rounded-2xl border border-gray-200 p-6">
            <h2 className="mb-2 text-lg font-semibold text-black">Headquarters</h2>
            <p className="text-gray-700">San Francisco, California, United States</p>
          </article>
        </section>

        <section className="rounded-2xl border border-gray-200 p-8">
          <h2 className="mb-4 text-2xl font-semibold text-black">Contact Form</h2>
          <form className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="block text-sm font-medium text-black">Full Name</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="Your name"
              />
            </label>
            <label className="space-y-2">
              <span className="block text-sm font-medium text-black">Business Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="you@company.com"
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="block text-sm font-medium text-black">Message</span>
              <textarea
                name="message"
                rows={5}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                placeholder="Tell us what you want to achieve with ReviewBoost AI."
              />
            </label>
            <button
              type="submit"
              className="md:col-span-2 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-900"
            >
              Send Message
            </button>
          </form>
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
