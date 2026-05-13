import { QrCode, Bot, BarChart3, Search } from "lucide-react";

const features = [
  {
    title: "QR Code Reviews",

    description: "Generate branded QR codes for instant Google reviews.",

    icon: QrCode,
  },

  {
    title: "AI Review Generator",

    description: "Generate professional Google reviews using AI.",

    icon: Bot,
  },

  {
    title: "Analytics Dashboard",

    description: "Track scans, reviews, and customer engagement.",

    icon: BarChart3,
  },

  {
    title: "SEO Pages",

    description: "Generate SEO-optimized local business pages automatically.",

    icon: Search,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center">Powerful Features</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white rounded-3xl p-8 shadow-sm border"
              >
                <Icon className="w-12 h-12" />

                <h3 className="text-2xl font-semibold mt-6">{feature.title}</h3>

                <p className="mt-4 text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
