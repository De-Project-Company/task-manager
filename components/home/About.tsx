import React from "react";
import Image from "next/image";
import { Aboutdata } from "@/constants";

const About = () => {
  return (
    <section className="md:flex py-14 md:px-16 px-5 md:py-28">
      <div>
        <header className="text-base text-purple-950 font-semibold">
          About
        </header>
        <h1 className="text-3xl md:text-5xl text-purple-950 py-4 font-bold">
          Elevating Productivity with Traverse
        </h1>
        <p className="font-normal text-neutraly text-sm md:text-lg md:w-[80%]">
          Welcome to Traverse—your partner in maximizing every moment. We
          understand the intricate dance of managing time and tasks, and
          we&apos;re here to revolutionize your approach to time tracking.
        </p>
        <div className="flex flex-col gap-4">
          {Aboutdata.map((items) => (
            <div key={items[0]} className="flex items-center gap-2 w-[85%]">
              <Image
                src="/assets/strongbox.svg"
                alt="link icon"
                width={40}
                height={40}
              />
              <p className="text-neutraly text-sm md:text-base">{items}</p>
            </div>
          ))}
        </div>
        <button className="text-purple-600 my-11 bg-purple-50 px-5 py-3 hover:bg-purple-600 hover:text-purple-50 border border-[#ECEBFF] rounded-lg">
          Learn More
        </button>
      </div>
      <div>
        <Image
          src="/assets/aboutImage.png"
          alt="Abut image"
          width={900}
          height={640}
        />
      </div>
    </section>
  );
};

export default About;
