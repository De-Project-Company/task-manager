"use client";

import Image from "next/image";
import React from "react";
import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";

const SwipeIndicator = () => {
  const { swipeIndicator, setSwipeIndicator } = useStateCtx();

  return (
    <div
      className={cn(
        "flex flex-col w-full max-w-[150px] min-[540px]:max-w-[170px] pb-2  z-[9999] items-center justify-center fixed top-1/2 right-0 min-[540px]:left-1/2  min-[540px]:-translate-x-1/2 -translate-y-1/2 transition-all duration-300 opacity-0 swipe-indicator",
        {
          "opacity-100 delay-500": swipeIndicator,
          "pointer-events-none": !swipeIndicator,
        }
      )}
      aria-hidden
    >
      <Image
        src="/swipe.gif"
        priority
        loading="eager"
        width={150}
        height={150}
        alt="swipe"
        className="invert"
      />

      <p className="animate-pulse text-white font-medium text-xs uppercase flex w-full flex-col items-center">
        <span>You can Swipe left</span>
        <span>to close</span>
      </p>
      <button
        type="button"
        className="text-white bg-gray-950 dark:border-success/60 border-soft-light border px-3 py-1 rounded-md mt-1 font-medium uppercase active:scale-75 transition-all duration-300"
        onClick={() => {
          setSwipeIndicator(false);
          window?.localStorage?.setItem("swiped", "true");
        }}
      >
        Ok
      </button>
    </div>
  );
};

export default SwipeIndicator;
