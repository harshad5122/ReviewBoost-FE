const stats = [
  {
    title: "10K+",
    subtitle: "Businesses",
  },

  {
    title: "1M+",
    subtitle: "Reviews Generated",
  },

  {
    title: "4.9★",
    subtitle: "Average Rating",
  },

  {
    title: "89K",
    subtitle: "SEO Visitors",
  },
];

export default function StatsSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.title} className="text-center">
              <h2 className="text-6xl font-bold tracking-tight">
                {stat.title}
              </h2>

              <p className="text-gray-600 mt-4 text-lg">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
