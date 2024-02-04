import React from "react";
import { HeroSection } from "@/components/home/Herosection";
import Servicees from "@/components/home/Servicees";
import About from "@/components/home/About";
import Stories from "@/components/home/Stories";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Servicees />
      <About />
      <Stories />

    </>
  );
};

export default Home;
