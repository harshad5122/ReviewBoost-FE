import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />

      <div className="relative max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border rounded-full px-5 py-2 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Trusted by local businesses
          </div>

          <h1 className="text-7xl font-bold tracking-tight leading-tight mt-10">
            Grow Your Google Reviews With AI & QR Codes
          </h1>

          <p className="text-xl text-gray-600 mt-10 leading-relaxed max-w-2xl mx-auto">
            AI-powered Google review generation, QR management, analytics, and
            SEO optimization platform for modern local businesses.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-12">
            <Link
              href="/register"
              className="bg-black text-white px-8 py-4 rounded-2xl text-lg hover:opacity-90 transition"
            >
              Start Free
            </Link>

            <Link
              href="/best/physiotherapist/rajkot"
              className="border bg-white px-8 py-4 rounded-2xl text-lg"
            >
              Explore SEO Pages
            </Link>
          </div>
        </div>

        <div className="mt-24">
          <div className="bg-white border rounded-[32px] shadow-2xl overflow-hidden">
            <div className="border-b px-8 py-5 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            <div className="grid lg:grid-cols-3 gap-6 p-8 bg-gray-50">
              <div className="bg-white rounded-3xl p-6 border">
                <h3 className="font-semibold text-lg">QR Scans</h3>

                <p className="text-5xl font-bold mt-6">12.4K</p>

                <p className="text-green-600 mt-3">+24% growth</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border">
                <h3 className="font-semibold text-lg">Google Reviews</h3>

                <p className="text-5xl font-bold mt-6">4.9★</p>

                <p className="text-green-600 mt-3">Excellent rating</p>
              </div>

              <div className="bg-white rounded-3xl p-6 border">
                <h3 className="font-semibold text-lg">SEO Traffic</h3>

                <p className="text-5xl font-bold mt-6">89K</p>

                <p className="text-green-600 mt-3">Monthly visitors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
