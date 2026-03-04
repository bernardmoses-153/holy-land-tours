import { Building, UserCheck, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Building,
    title: "Tour Operators",
    description:
      "Manage your entire portfolio from one dashboard. Track groups, revenue, commissions, and itineraries with AI-powered insights.",
  },
  {
    icon: UserCheck,
    title: "Group Leaders",
    description:
      "Recruit travelers, track readiness, and lead tours with real-time tools. Earn commissions on every booking.",
  },
  {
    icon: Compass,
    title: "Tourists",
    description:
      "Book your dream pilgrimage, upload documents, and follow your personalized itinerary with AI tour guidance.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="about" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Built for Everyone
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            One Platform, Three Perspectives
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-body text-secondary">
            Whether you organize tours, lead groups, or travel the world,
            Holy Land Tours gives you the tools you need.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  "group rounded-xl border border-border bg-background p-8 transition-all",
                  "hover:border-border-hover hover:shadow-sm"
                )}
              >
                <div className="mb-6 inline-flex rounded-lg border border-border p-3">
                  <Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-relaxed text-secondary">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
