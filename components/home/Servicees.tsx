import React from "react";
import Image from "next/image";
import { RevolutionData1, RevolutionData2 } from "@/constants";

const Servicees = () => {
  return (
    <section className="lg:flex py-14 md:px-16 px-5 md:py-28 justify-between ">
      <div>
        <header className="text-black text-base font-bold pb-4 dark:text-white">
          Services
        </header>
        <h2 className="text-3xl md:text-[52px] md:leading-[60px] font-bold text-purple-950 pb-6 lg:w-[380px] dark:text-white">
          Revolutionize Your Workflow with Traverse Time Tracking
        </h2>
        <p className="text-neutraly text-balance text-sm md:text-base">
          At Traverse, we go beyond traditional time tracking. We&lsquo;re your
          dedicated partner in maximizing productivity, ensuring accurate time
          management, and providing valuable insights to elevate your workflow.
        </p>
      </div>
      <div className="md:flex lg:pl-10 lg:gap-5">
        <div className="flex flex-col gap-14">
          {RevolutionData1.map((items) => (
            <div key={items.title}>
              <Image
                src="/assets/strongbox.svg"
                alt="link icon"
                width={40}
                height={40}
                className="dark:invert"
              />
              <h1 className="text-xl md:text-2xl text-purple-950 py-4 font-bold dark:text-white">
                {items.title}
              </h1>
              <p className="text-balance text-neutraly text-sm md:text-base">
                {items.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-20">
          {RevolutionData2.map((items) => (
            <div key={items.title}>
              <Image
                src="/assets/strongbox.svg"
                alt="link icon"
                width={40}
                height={40}
              />
              <h1 className="text-xl md:text-2xl text-purple-950 py-4 font-bold dark:text-white">
                {items.title}
              </h1>
              <p className="text-balance text-neutraly text-sm md:text-base">
                {items.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicees;
