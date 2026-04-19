"use client";

import { Hero } from "@/src/components/sections/Hero";
import { Features } from "@/src/components/sections/Features";
import { Categories } from "@/src/components/sections/Categories";
import { Materials } from "@/src/components/sections/Materials";
import { Testimonials } from "@/src/components/sections/Testimonials";
import { CTASection } from "@/src/components/sections/CTASection";
import { Stats } from "@/src/components/sections/Stats";
import { HowItWorks } from "@/src/components/sections/HowItWorks";
import { Partners } from "@/src/components/sections/Partners";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Categories />
      <HowItWorks />
      <Materials />
      <Testimonials />
      <Partners />
      <CTASection />
    </>
  );
}
