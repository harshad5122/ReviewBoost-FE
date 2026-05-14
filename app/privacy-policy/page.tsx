import type { Metadata } from "next";

import { COMPANY_NAME, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Read how ${SITE_NAME} collects, uses, stores, and protects personal data.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white px-6 py-20">
      <article className="prose prose-slate mx-auto max-w-4xl">
        <h1>Privacy Policy</h1>
        <p>
          This Privacy Policy explains how {COMPANY_NAME} ("ReviewBoost AI", "we", "our", "us")
          collects and uses information when you use our website and SaaS platform.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We collect account details, business profile information, platform usage analytics, and
          customer support communications necessary to deliver and improve our services.
        </p>
        <h2>How We Use Information</h2>
        <p>
          We use data to operate your account, provide analytics, secure the platform, communicate
          service updates, and comply with legal obligations.
        </p>
        <h2>Data Sharing</h2>
        <p>
          We do not sell personal information. We may share data with trusted infrastructure and
          analytics providers under contractual confidentiality and security controls.
        </p>
        <h2>Data Retention</h2>
        <p>
          We retain account and operational data as long as needed to provide services, resolve
          disputes, and satisfy legal requirements.
        </p>
        <h2>Your Rights</h2>
        <p>
          Depending on your region, you may request access, correction, deletion, or export of your
          personal data. Contact us at support@reviewboost.ai to submit requests.
        </p>
        <h2>Security</h2>
        <p>
          We apply technical and organizational safeguards to protect platform data, including access
          controls, transport security, and monitoring.
        </p>
        <h2>Contact</h2>
        <p>For privacy questions, contact support@reviewboost.ai.</p>
      </article>
    </main>
  );
}
