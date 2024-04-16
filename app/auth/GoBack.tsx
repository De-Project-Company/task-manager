"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowSquareLeft } from "iconsax-react";

const GoBack = () => {
  const router = useRouter();

  return (
    <div className="flex w-full justify-start max-[500px]:py-2 px-4 sm:px-8 xl:px-10 2xl:px-20 mb-5 md:mb-7 lg:mb-9 mx-auto">
      <div className="flex w-full justify-start">
        <button
          tabIndex={0}
          aria-label="Go Back"
          onClick={() => router.back()}
          type="button"
          className="flex font-medium items-center gap-x-1 text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/20 pr-1 pt-4"
        >
          <ArrowSquareLeft size={30} aria-hidden />
          <span>Back</span>
        </button>
      </div>
    </div>
  );
};

export { GoBack };
