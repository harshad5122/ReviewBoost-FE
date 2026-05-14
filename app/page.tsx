"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Zap, BarChart3, Smartphone, Lock, Globe } from "lucide-react";
import AdBanner from "@/components/ads/AdBanner";
import InArticleAd from "@/components/ads/InArticleAd";
import ResponsiveAd from "@/components/ads/ResponsiveAd";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does ReviewBoost AI help with Google reviews?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ReviewBoost AI transforms customer feedback into polished review drafts, shares review links with QR codes, and tracks conversion analytics so teams can improve review volume safely.",
        },
      },
      {
        "@type": "Question",
        name: "Is ReviewBoost AI suitable for multi-location businesses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Teams can manage multiple business profiles, generate location-specific review links, and monitor analytics from one dashboard.",
        },
      },
      {
        "@type": "Question",
        name: "Does ReviewBoost AI support SEO growth?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. ReviewBoost AI provides optimized local landing pages and insights that help businesses improve organic visibility.",
        },
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ReviewBoost AI",
    description:
      "AI-powered review and local SEO software for service businesses and multi-location teams.",
    url: "https://reviewboost.ai",
    email: "support@reviewboost.ai",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressCountry: "US",
    },
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto text-center space-y-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Badge */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-6 py-2 shadow-sm hover:shadow-md transition"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">
              Trusted by 5000+ businesses worldwide
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={item}
            className="text-6xl md:text-7xl font-bold tracking-tight leading-tight text-black"
          >
            Grow Your Google Reviews With{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              AI & QR Codes
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            AI-powered Google review generation, QR management, analytics, and SEO optimization for modern local businesses.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link
              href="/register"
              className="px-8 py-4 bg-black text-white rounded-2xl font-semibold hover:bg-gray-900 transition inline-flex items-center justify-center gap-2"
            >
              <Zap size={20} />
              Start Free
            </Link>
            <Link
              href="/best/restaurant/new-york"
              className="px-8 py-4 bg-white border-2 border-gray-300 text-black rounded-2xl font-semibold hover:border-gray-400 transition"
            >
              View Demo
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-8 justify-center pt-12 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <Lock size={16} />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} />
              Works worldwide
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} />
              4.9 rating
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Cards Animation */}
        <motion.div
          className="absolute top-1/4 right-10 w-32 h-32 bg-white rounded-2xl shadow-xl p-4 hidden lg:block"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="text-2xl mb-2">📊</div>
          <p className="text-xs text-gray-600">Analytics</p>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 left-10 w-32 h-32 bg-blue-100 rounded-2xl shadow-xl p-4 hidden lg:block"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          <div className="text-2xl mb-2">⭐</div>
          <p className="text-xs text-gray-700">AI Reviews</p>
        </motion.div>
      </section>

      <section className="bg-white px-6 py-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 p-4 md:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Sponsored
          </p>
          <ResponsiveAd adSlot="1111111111" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-black mb-4">
              Powerful Features for Local Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to grow your business reviews and local SEO
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "⚡",
                title: "AI Review Generation",
                description: "Automatically polish customer feedback into professional Google reviews",
              },
              {
                icon: "📱",
                title: "QR Code Management",
                description: "Generate, track, and share QR codes for your business instantly",
              },
              {
                icon: "📊",
                title: "Real-time Analytics",
                description: "Track QR scans, conversions, and customer engagement metrics",
              },
              {
                icon: "🔍",
                title: "SEO Optimization",
                description: "Get discovered by local customers with SEO-optimized pages",
              },
              {
                icon: "🎯",
                title: "Multi-Business Support",
                description: "Manage multiple businesses from one powerful dashboard",
              },
              {
                icon: "🛡️",
                title: "Enterprise Security",
                description: "Bank-level encryption and secure data storage for peace of mind",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="p-8 rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-6 py-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 p-4 md:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Sponsored
          </p>
          <InArticleAd adSlot="2222222222" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-4 gap-8 text-center"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { number: "50M+", label: "Reviews Generated" },
              { number: "5000+", label: "Businesses" },
              { number: "98%", label: "Conversion Rate" },
              { number: "24/7", label: "Support" },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={item}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-black mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">No hidden fees. Cancel anytime.</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Starter",
                price: "Free",
                features: ["1 Business", "Basic Analytics", "QR Codes", "Email Support"],
              },
              {
                name: "Professional",
                price: "$29/mo",
                features: ["Unlimited Businesses", "Advanced Analytics", "Priority Support", "Custom Domain"],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: ["Everything in Pro", "Dedicated Support", "API Access", "Custom Integration"],
              },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className={`rounded-2xl p-8 border-2 transition ${
                  plan.highlighted
                    ? "border-blue-600 bg-white shadow-xl scale-105"
                    : "border-gray-200 bg-white"
                }`}
              >
                <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-black mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <Star size={16} className="text-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-black hover:bg-gray-200"
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-4 md:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Sponsored
          </p>
          <AdBanner adSlot="3333333333" />
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-4xl font-bold text-black">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I use ReviewBoost AI without technical setup?",
                a: "Yes. You can create your profile, generate QR links, and start collecting review-ready feedback in minutes.",
              },
              {
                q: "Do you support agencies and franchises?",
                a: "Yes. ReviewBoost AI is designed for single-location businesses, agencies, and multi-location franchises.",
              },
              {
                q: "How quickly can I see results?",
                a: "Most teams start seeing improved review submission rates within the first few weeks of active usage.",
              },
            ].map((item, idx) => (
              <article key={idx} className="rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-black">{item.q}</h3>
                <p className="mt-2 text-gray-700">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-black text-white text-center">
        <motion.div
          className="max-w-2xl mx-auto space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold">Ready to Grow Your Reviews?</h2>
          <p className="text-xl text-gray-300">
            Join thousands of local businesses using ReviewBoost AI to boost their Google ratings.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition"
          >
            Start Free Trial
          </Link>
        </motion.div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeFaqSchema).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
