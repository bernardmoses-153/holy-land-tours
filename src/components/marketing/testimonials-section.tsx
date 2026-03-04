import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "This platform transformed how we organize group trips. The AI insights are incredible.",
    name: "Pastor David Chen",
    role: "Grace Community Church",
  },
  {
    quote:
      "Managing 30 tourists used to take weeks of emails. Now everything is in one place.",
    name: "Minister Sarah Johnson",
    role: "Faith Fellowship",
  },
  {
    quote:
      "The itinerary app made our Holy Land experience magical. Every detail was perfect.",
    name: "Rachel Adams",
    role: "Traveler",
  },
];

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-foreground text-foreground"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by Leaders Worldwide
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-xl border border-border bg-background p-8"
            >
              <StarRating />
              <blockquote className="mt-6 leading-relaxed text-body text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-6 border-t border-border pt-6">
                <p className="text-sm font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-muted">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
