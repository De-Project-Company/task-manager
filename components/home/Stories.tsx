import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const Stories = () => {
  return (
    <section className="bg-[#ECEBFF] py-14 md:px-16 px-5 md:py-28 dark:bg-primary/60">
      <div className="text-center">
        <header className="text-sm md:text-base pb-4 font-semibold dark:text-neutraly ">
          Customer Stories
        </header>
        <h2 className="text-3xl md:text-5xl font-bold pb-14 md:pb-20 dark:text-white">
          Don&apos;t just take our word for it
        </h2>
      </div>
      <div className="lg:flex items-center gap-16">
        <Image
          src="/assets/testimonial.png"
          alt="testimonial"
          width={616}
          height={640}
        />
        <div>
          {/* <Image
            src="/assets/Stars.svg"
            alt="stars"
            className="py-6 dark:text-white text-red-600"
            width={150}
            height={150}
          /> */}
          <div className="mb-5 flex space-x-2">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="">
                <FaStar className=" text-lg md:text-xl text-yellow-500" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-lg text-purple-950 md:text-2xl font-bold dark:text-white">
              &quot;A testimonial that shares a customer&apos;s positive
              experience with your company and answers potential customer
              doubts. Showcase testimonials from a similar demographic to your
              customers.&quot;
            </p>
            <div>
              <h5 className="text-black text-sm font-semibold md:text-base  dark:text-neutraly">
                Jackson Jackson
              </h5>
              <p className="text-black text-sm font-normal md:text-base dark:text-neutraly">
                Starter House Co.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stories;
