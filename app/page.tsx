import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { HumanDecisionBanner } from "@/components/shared/human-decision-banner";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <section className="max-w-4xl mx-auto px-6 py-24">
        <HumanDecisionBanner />
      </section>
      <footer className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-soft">
          <span className="font-display text-teal-950">DoorReady</span>
          <span>Hack-Nation Global AI Hackathon · RealDoor Track · July 2026</span>
        </div>
      </footer>
    </>
  );
}
