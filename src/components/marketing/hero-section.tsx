import Link from "next/link";
import { cn } from "@/lib/utils";

const locations = [
  "Jerusalem",
  "Galilee",
  "Bethlehem",
  "Dead Sea",
  "Nazareth",
  "Masada",
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            AI-Powered Tourism Platform
          </p>

          {/* Display heading */}
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Experience the Holy Land
            <br />
            Like Never Before
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary sm:text-xl">
            A seamless digital platform connecting tour operators, group
            leaders, and travelers into one unified ecosystem for
            unforgettable Israel experiences.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Get Started
            </Link>
            <Link
              href="#itineraries"
              className="inline-flex items-center justify-center rounded-lg border border-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:border-border-hover hover:bg-elevated"
            >
              View Itineraries
            </Link>
          </div>

          {/* Decorative divider */}
          <div className="mt-20 w-full max-w-3xl">
            <div className="mb-8 h-px w-full bg-border" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {locations.map((location) => (
                <div
                  key={location}
                  className="text-center text-xs font-medium uppercase tracking-[0.15em] text-muted"
                >
                  {location}
                </div>
              ))}
            </div>
            <div className="mt-8 h-px w-full bg-border" />
          </div>
        </div>
      </div>
    </section>
  );
}
