const stats = [
  { value: "2,500+", label: "Tours Completed" },
  { value: "45,000+", label: "Happy Travelers" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Destinations" },
];

export function StatsBar() {
  return (
    <section className="bg-foreground py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-mono text-3xl font-bold text-background sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-background/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
