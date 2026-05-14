import type { Metadata } from "next";

import { COMPANY_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Review the Terms & Conditions governing use of ${SITE_NAME}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="bg-white px-6 py-20">
      <article className="prose prose-slate mx-auto max-w-4xl">
        <h1>Terms & Conditions</h1>
        <p>
          These Terms & Conditions govern access to and use of the services operated by{" "}
          {COMPANY_NAME}. By using ReviewBoost AI, you agree to these terms.
        </p>
        <h2>Eligibility and Accounts</h2>
        <p>
          You must provide accurate account information and keep login credentials secure. You are
          responsible for activities under your account.
        </p>
        <h2>Acceptable Use</h2>
        <p>
          You agree not to misuse the platform, interfere with service integrity, violate review
          platform policies, or use the service for unlawful activities.
        </p>
        <h2>Billing and Plans</h2>
        <p>
          Paid plans, if applicable, are billed according to published pricing. Fees are non-refundable
          except where required by law or explicitly stated.
        </p>
        <h2>Intellectual Property</h2>
        <p>
          Platform software, branding, and related materials are owned by {COMPANY_NAME} or licensors.
          You retain rights to content you submit.
        </p>
        <h2>Service Availability</h2>
        <p>
          We aim for reliable uptime but do not guarantee uninterrupted service. Maintenance and
          upgrades may affect temporary availability.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, {COMPANY_NAME} is not liable for indirect, incidental,
          or consequential damages arising from your use of the service.
        </p>
        <h2>Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Continued use after updates constitutes acceptance
          of the revised terms.
        </p>
        <h2>Contact</h2>
        <p>Questions about these terms can be sent to support@reviewboost.ai.</p>
      </article>
    </main>
  );
}
