"use client";

import { useParams } from "next/navigation";

export default function SEOPage() {
  const params = useParams();
  const category = params?.category as string;
  const city = params?.city as string;

  const title = `Best ${category?.replace(/[-_]/g, " ")} in ${city?.replace(/[-_]/g, " ")}`;
  const description = `Find the best ${category} businesses in ${city} with verified reviews and ratings.`;

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-black">{title}</h1>
          <p className="text-xl text-gray-600">{description}</p>
        </div>

        {/* Table of Contents */}
        <nav className="bg-gray-50 rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-black">Quick Links</h2>
          <ul className="space-y-2 text-blue-600">
            <li>
              <a href="#what-is" className="hover:underline">
                What is {category}?
              </a>
            </li>
            <li>
              <a href="#how-to-choose" className="hover:underline">
                How to Choose
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:underline">
                Frequently Asked Questions
              </a>
            </li>
          </ul>
        </nav>

        {/* Content Sections */}
        <section id="what-is" className="space-y-4">
          <h2 className="text-3xl font-bold text-black">What is {category}?</h2>
          <p className="text-gray-700 leading-relaxed">
            Learn about {category} services and what to expect when choosing a provider in {city}.
          </p>
        </section>

        <section id="how-to-choose" className="space-y-4">
          <h2 className="text-3xl font-bold text-black">How to Choose the Best {category}</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Check ratings and reviews from verified customers</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Compare services and pricing</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Read detailed customer experiences</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Make your decision based on your needs</span>
            </li>
          </ul>
        </section>

        {/* AdSense Placeholder */}
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-600">
          [AdSense Ad Placement]
        </div>

        {/* FAQ Section */}
        <section id="faq" className="space-y-6">
          <h2 className="text-3xl font-bold text-black">
            Frequently Asked Questions
          </h2>

          {[
            {
              q: "How do I find the best service provider?",
              a: "Look for providers with high ratings, verified reviews, and years of experience in the field.",
            },
            {
              q: "Are reviews genuine?",
              a: "All reviews on our platform are from verified customers who have used the service.",
            },
            {
              q: "How can I leave a review?",
              a: "Scan the QR code from any service provider or visit their profile to leave a review.",
            },
          ].map((item, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-black mb-2">{item.q}</h3>
              <p className="text-gray-700">{item.a}</p>
            </div>
          ))}
        </section>

        {/* CTA Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-2">
            Are you a business owner?
          </h2>
          <p className="text-gray-700 mb-4">
            Share your verified reviews and improve your Google ratings
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Get Started Free
          </button>
        </div>
      </article>
    </main>
  );
}
