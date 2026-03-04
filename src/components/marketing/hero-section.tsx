import Link from "next/link";
import Image from "next/image";
import { holyLandImages } from "@/data/images";

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
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={holyLandImages.heroLanding.url}
        alt="Jerusalem panorama at golden hour"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
            AI-Powered Tourism Platform
          </p>

          {/* Display heading */}
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Experience the Holy Land
            <br />
            Like Never Before
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
            A seamless digital platform connecting tour operators, group
            leaders, and travelers into one unified ecosystem for
            unforgettable Israel experiences.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Get Started
            </Link>
            <Link
              href="#itineraries"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-8 py-3 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10"
            >
              View Itineraries
            </Link>
          </div>

          {/* Decorative divider */}
          <div className="mt-20 w-full max-w-3xl">
            <div className="mb-8 h-px w-full bg-white/20" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
              {locations.map((location) => (
                <div
                  key={location}
                  className="text-center text-xs font-medium uppercase tracking-[0.15em] text-white/50"
                >
                  {location}
                </div>
              ))}
            </div>
            <div className="mt-8 h-px w-full bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
