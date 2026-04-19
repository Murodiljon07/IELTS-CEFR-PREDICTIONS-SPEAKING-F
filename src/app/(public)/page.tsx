"use client";

import { Hero } from "@/components/page/home/Hero";
import { Features } from "@/components/page/home/Features";
import { Categories } from "@/components/page/home/Categories";
import { Materials } from "@/components/page/home/Materials";
import { Testimonials } from "@/components/page/home/Testimonials";
import { CTASection } from "@/components/page/home/CTASection";
import { Stats } from "@/components/page/home/Stats";
import { HowItWorks } from "@/components/page/home/HowItWorks";
import { Partners } from "@/components/page/home/Partners";

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
