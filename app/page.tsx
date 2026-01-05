"use client";

import CTA from "@/components/layout/CTA";
import Features from "@/components/layout/Features";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HowItWorks from "@/components/layout/HowItWorks";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}
