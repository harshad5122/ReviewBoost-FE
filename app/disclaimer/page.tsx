import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Understand the service, legal, and informational disclaimers for ${SITE_NAME}.`,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <main className="bg-white px-6 py-20">
      <article className="prose prose-slate mx-auto max-w-4xl">
        <h1>Disclaimer</h1>
        <p>
          ReviewBoost AI provides software tools and informational resources. We do not provide legal,
          tax, or professional compliance advice.
        </p>
        <h2>No Guaranteed Outcomes</h2>
        <p>
          Business outcomes, including review volume and search visibility, depend on many factors
          outside our control. We do not guarantee specific rankings, traffic levels, or conversion
          rates.
        </p>
        <h2>Third-Party Platforms</h2>
        <p>
          Our product may interact with third-party platforms such as Google. Your use remains subject
          to those third-party terms and policies.
        </p>
        <h2>Use at Your Own Discretion</h2>
        <p>
          You are responsible for how you use the platform and for ensuring your business practices
          follow applicable laws and platform rules.
        </p>
      </article>
    </main>
  );
}
