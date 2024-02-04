import React from "react";
import { HeroSection } from "@/components/home/Herosection";
import { Nav } from "@/components/home/NavBar";
import Servicees from "@/components/home/Servicees";
import About from "@/components/home/About";
import Stories from "@/components/home/Stories";
import Footer from "@/components/home/Footer";

const Home = () => {
  return (
    <>
      <Nav />
      <HeroSection />
      <Servicees />
      <About />
      <Stories />
      <Footer />
    </>
  );
};

export default Home;
