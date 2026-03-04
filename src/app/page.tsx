import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  HeroSection,
  FeaturesGrid,
  StatsBar,
  TestimonialsSection,
  PricingSection,
  CTASection,
} from "@/components/marketing";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <StatsBar />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}
