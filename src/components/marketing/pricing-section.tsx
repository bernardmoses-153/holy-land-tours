import Link from "next/link";
import { cn } from "@/lib/utils";

const itineraries = [
  {
    name: "Classic Holy Land",
    duration: "8 days",
    price: "$2,850",
    unit: "/person",
    highlights: ["Jerusalem", "Galilee", "Dead Sea", "Masada"],
    popular: false,
  },
  {
    name: "Adventure & Negev",
    duration: "6 days",
    price: "$2,200",
    unit: "/person",
    highlights: ["Ramon Crater", "Bedouin Camp", "Red Sea"],
    popular: true,
  },
  {
    name: "Spiritual Pilgrimage",
    duration: "10 days",
    price: "$3,400",
    unit: "/person",
    highlights: ["In-depth biblical study", "Mount Tabor"],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Itineraries
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose Your Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-body text-secondary">
            Curated itineraries designed for groups of all sizes. Every trip
            includes expert guides, premium accommodations, and AI-powered
            tour assistance.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {itineraries.map((itinerary) => (
            <div
              key={itinerary.name}
              className={cn(
                "relative rounded-xl border border-border bg-background p-8 transition-all hover:border-border-hover hover:shadow-sm",
                itinerary.popular && "border-foreground"
              )}
            >
              {/* Popular badge */}
              {itinerary.popular && (
                <div className="absolute -top-3 left-8">
                  <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                    Popular
                  </span>
                </div>
              )}

              {/* Duration */}
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
                {itinerary.duration}
              </p>

              {/* Name */}
              <h3 className="mt-3 text-xl font-semibold text-foreground">
                {itinerary.name}
              </h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-mono text-3xl font-bold text-foreground">
                  {itinerary.price}
                </span>
                <span className="text-sm text-muted">{itinerary.unit}</span>
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* Highlights */}
              <ul className="space-y-3">
                {itinerary.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-3 text-sm text-secondary"
                  >
                    <span className="h-1 w-1 rounded-full bg-foreground" />
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="#contact"
                className={cn(
                  "mt-8 inline-flex w-full items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-hover hover:bg-elevated",
                  itinerary.popular &&
                    "border-transparent bg-foreground text-background hover:bg-foreground/90 hover:border-transparent"
                )}
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
