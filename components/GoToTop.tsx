"use client";

import { useStateCtx } from "@/context/StateCtx";
import useWindowHeight from "@/hooks/useDimension";
import { cn } from "@/utils";
import React, { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";

const GotoTop = () => {
  const scrollY = useWindowHeight();
  const {} = useStateCtx();

  const [hideToTop, setHideToTop] = useState(false);

  useEffect(() => {
    let prevScrollpos = window.scrollY;
    window.onscroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollpos >= currentScrollPos) {
        setHideToTop(false);
      } else {
        setHideToTop(true);
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  const handleTop = () => {
    if (!window) return;
    window && window.scroll({ top: 0, behavior: "smooth" });
  };

  return hideToTop ? null : (
    <div
      role="button"
      className={cn(
        "max-[400px]:scale-75 text-xl   sm:text-4xl rounded  fixed bottom-12 right-2 sm:bottom-10 sm:right-5 z-[9999] select-none flex flex-col items-center bg-primary text-white transition-all duration-1000 cursor-pointer active:scale-75 active:duration-300 max-[400px]:py-1 max-[400px]:bottom-16",
        scrollY > 1000
          ? "opacity-100 translate-x-0 shadow-[0_0_40px_0_rgba(0,0,0,0.16)]"
          : "opacity-0 translate-x-20"
      )}
      onClick={handleTop}
    >
      <FiChevronUp />
    </div>
  );
};

export default GotoTop;
