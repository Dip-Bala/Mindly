"use client";

import CTA from "@/components/layout/CTA";
import Features from "@/components/layout/Features";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HowItWorks from "@/components/layout/HowItWorks";

// NEW SECTIONS
import { WhyMemoir } from "@/components/layout/WhyMemoir";
import { AISection } from "@/components/layout/AISection";
import { UseCases } from "@/components/layout/UseCases";

export default function HomePage() {
  return (
    <div className="bg-bg text-text">
      {/* Header */}
      <Header />

      {/* Hero (with grid background only here) */}
      <section className="bg-grid-fade">
        <Hero />
      </section>

      {/* Core value explanation */}
      <Features />

      {/* NEW: Differentiation */}
      <WhyMemoir />

      {/* NEW: Clear AI / RAG explanation */}
      <AISection />

      {/* NEW: Concrete use cases */}
      <UseCases />

      {/* Existing flow */}
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
