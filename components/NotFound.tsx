"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="px-3 flex items-center justify-center h-screen">
      <div className="wrap text-center relative md:w-[70%] lg:mx-auto lg:flex lg:flex-col lg:justify-center lg:items-center">
        <Image
          src="/assets/404.svg"
          alt="floating_vector"
          height={100}
          width={100}
          priority={true}
          className="h-full w-full mb-12 lg:h-1/2 lg:w-1/2"
        />
        <div className="div mb-4">
          <h1 className=" text-2xl lg:text-[36px] text-[#1B0354]  font-bold w-full mb-2">
            Sorry, Page not Found
          </h1>

          <p className="text-xs md:text-sm lg:text-md lg:text-[15px] text-[#6B7B8F]  mb-4 lg:mb-4 w-[70%] mx-auto md:w-full ">
            What you requested for can notbe found, kindly try again soon.
          </p>
        </div>
        <Link
          href="/"
          className="bg-[#33059F] mt-1 w-full p-2 lg:p-3 text-white font-bold  rounded-md lg:w-[50%] lg:mx-auto"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
