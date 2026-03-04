import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-foreground py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-background sm:text-4xl">
            Ready to Lead Your Next Holy Land Journey?
          </h2>
          <p className="mt-4 max-w-xl text-lg text-background/60">
            Join thousands of tour operators and group leaders who trust our
            platform to deliver seamless, unforgettable experiences.
          </p>
          <Link
            href="/register"
            className="mt-10 inline-flex items-center justify-center rounded-lg bg-background px-8 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
          >
            Create Your Account
          </Link>
        </div>
      </div>
    </section>
  );
}
