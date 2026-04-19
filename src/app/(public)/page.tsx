import Hero from "@/src/components/sections/HeroSection";
import React from "react";
import { Features } from "../../components/sections/Features";
import { Categories } from "@/src/components/sections/Categories";
import { Materials } from "@/src/components/sections/Materials";
import { Testimonials } from "@/src/components/sections/Testimonials";

const Page = () => {
  return (
    <>
      <Hero />
      <Features />
      <Categories />
      <Materials />
      <Testimonials />
    </>
  );
};

export default Page;
