import Link from "next/link";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Itineraries", href: "#itineraries" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Holy Land Tours
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-secondary transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Holy Land Tours. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
