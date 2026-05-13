import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-32 px-6 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-bold leading-tight">
          Grow Your Google Reviews With AI & QR Codes
        </h1>

        <p className="mt-8 text-xl text-gray-600">
          AI-powered review generation, QR management, analytics, and SEO
          optimization for local businesses.
        </p>

        <div className="mt-10 flex items-center justify-center gap-5">
          <Link
            href="/dashboard"
            className="bg-black text-white px-8 py-4 rounded-2xl"
          >
            Get Started
          </Link>

          <Link
            href="/best/physiotherapist/rajkot"
            className="border px-8 py-4 rounded-2xl"
          >
            Explore SEO Page
          </Link>
        </div>
      </div>
    </section>
  );
}
