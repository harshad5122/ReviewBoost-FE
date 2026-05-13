"use client";

export default function AboutPage() {
  return (
    <main className="bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-black">About ReviewBoost AI</h1>
          <p className="text-xl text-gray-600">
            Empowering local businesses to grow their online presence through AI-powered reviews
          </p>
        </div>

        {/* Mission */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold text-black">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe every local business deserves access to enterprise-grade tools to manage their online reputation and grow their customer base. ReviewBoost AI makes it simple, affordable, and effective for local businesses to generate and manage Google reviews.
          </p>
        </section>

        {/* Values */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-black">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Simplicity",
                description: "We make complex tools easy to use for everyone",
              },
              {
                title: "Transparency",
                description: "No hidden fees or tricks. Clear pricing, always.",
              },
              {
                title: "Impact",
                description: "We measure success by your business growth",
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-black mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-black">Our Team</h2>
          <p className="text-gray-700">
            ReviewBoost AI is built by a team of experts in SaaS, AI, and local business growth. We're passionate about helping businesses succeed online.
          </p>
        </section>
      </div>
    </main>
  );
}
