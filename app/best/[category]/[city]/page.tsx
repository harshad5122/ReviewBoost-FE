import type { Metadata } from "next";
import Link from "next/link";

import AdBanner from "@/components/ads/AdBanner";
import InArticleAd from "@/components/ads/InArticleAd";
import ResponsiveAd from "@/components/ads/ResponsiveAd";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Params = { category: string; city: string };

const formatLabel = (value: string) =>
  decodeURIComponent(value).replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category, city } = await params;
  const categoryLabel = formatLabel(category);
  const cityLabel = formatLabel(city);
  const path = `/best/${category}/${city}`;

  return {
    title: `Best ${categoryLabel} in ${cityLabel}`,
    description: `Compare top-rated ${categoryLabel} providers in ${cityLabel}. See reviews, selection criteria, and local buying guidance.`,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `Best ${categoryLabel} in ${cityLabel} | ${SITE_NAME}`,
      description: `Discover trusted ${categoryLabel} businesses in ${cityLabel} with verified local ratings.`,
      url: `${SITE_URL}${path}`,
      type: "article",
    },
  };
}

export default async function SEOPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category, city } = await params;
  const categoryLabel = formatLabel(category);
  const cityLabel = formatLabel(city);
  const title = `Best ${categoryLabel} in ${cityLabel}`;
  const description = `Find the best ${categoryLabel} businesses in ${cityLabel} with verified reviews, local reputation signals, and practical selection tips.`;
  const canonicalPath = `/best/${category}/${city}`;

  const faqItems = [
    {
      q: `How do I evaluate ${categoryLabel} providers in ${cityLabel}?`,
      a: `Start with reputation signals like recent reviews, response quality, and specialization. Then validate pricing transparency and communication quality before booking.`,
    },
    {
      q: "Are online ratings enough to make a decision?",
      a: "Ratings are a useful signal, but pair them with service details, portfolio quality, and direct communication to ensure a good fit.",
    },
    {
      q: `Can I compare multiple ${categoryLabel} options quickly?`,
      a: "Yes. Shortlist 3-5 providers, compare review quality, turnaround times, and pricing scope, then choose based on your goals.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Best", item: `${SITE_URL}/best` },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabel,
        item: `${SITE_URL}/best/${category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: cityLabel,
        item: `${SITE_URL}${canonicalPath}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <article className="mx-auto max-w-4xl space-y-8 px-6 py-16">
        <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{title}</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-black md:text-5xl">{title}</h1>
          <p className="text-lg text-gray-700">{description}</p>
        </header>

        <section className="rounded-lg border border-gray-200 p-4 md:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Sponsored
          </p>
          <ResponsiveAd adSlot="4444444444" />
        </section>

        <nav className="space-y-3 rounded-lg bg-gray-50 p-6">
          <h2 className="font-semibold text-black">Quick Links</h2>
          <ul className="space-y-2 text-blue-600">
            <li>
              <a href="#what-to-check" className="hover:underline">
                What to check first
              </a>
            </li>
            <li>
              <a href="#how-to-choose" className="hover:underline">
                How to choose confidently
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:underline">
                Frequently asked questions
              </a>
            </li>
          </ul>
        </nav>

        <section id="what-to-check" className="space-y-4">
          <h2 className="text-3xl font-bold text-black">{`What to check before choosing ${categoryLabel}`}</h2>
          <p className="leading-relaxed text-gray-700">
            Focus on providers with recent, detailed customer feedback and a strong local track record.
            Quality businesses typically respond to reviews, keep profiles up to date, and clearly explain
            their process.
          </p>
        </section>

        <section className="rounded-lg border border-gray-200 p-4 md:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Sponsored
          </p>
          <InArticleAd adSlot="5555555555" />
        </section>

        <section id="how-to-choose" className="space-y-4">
          <h2 className="text-3xl font-bold text-black">{`How to choose the best ${categoryLabel} in ${cityLabel}`}</h2>
          <ol className="space-y-3 text-gray-700">
            <li>1. Shortlist providers with high-quality reviews and relevant experience.</li>
            <li>2. Compare deliverables, timelines, and pricing clarity.</li>
            <li>3. Ask for examples of outcomes similar to your goals.</li>
            <li>4. Choose the provider with the best quality-to-fit ratio, not only the lowest price.</li>
          </ol>
        </section>

        <section className="rounded-lg border border-gray-200 p-4 md:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Sponsored
          </p>
          <AdBanner adSlot="6666666666" />
        </section>

        <section id="faq" className="space-y-6">
          <h2 className="text-3xl font-bold text-black">Frequently Asked Questions</h2>
          {faqItems.map((item) => (
            <section key={item.q} className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-2 font-semibold text-black">{item.q}</h3>
              <p className="text-gray-700">{item.a}</p>
            </section>
          ))}
        </section>

        <section className="rounded-lg border border-gray-200 p-4 md:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Sponsored
          </p>
          <ResponsiveAd adSlot="7777777777" />
        </section>

        <section className="rounded-lg border border-blue-200 bg-blue-50 p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-black">Are you a business owner?</h2>
          <p className="mb-4 text-gray-700">
            Create your ReviewBoost AI profile and collect more high-quality reviews with better local SEO.
          </p>
          <Link
            href="/register"
            className="inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Start Free
          </Link>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
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
