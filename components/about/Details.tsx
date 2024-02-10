"use client";

import { useState } from "react";
import { ArrowRight2 } from "iconsax-react";
import { cn } from "@/utils";

type obj = {
  questions: string;
  answer: string;
};
const Details = ({ questions, answer }: obj) => {
  const [isOpen, setIsOpen] = useState(false);
  function handleOpen() {
    if (answer) {
      setIsOpen(!isOpen);
    }
  }
  return (
    <details>
      <summary
        className="flex text-base font-semibold md:text-lg items-center cursor-pointer justify-between gap-8"
        onClick={handleOpen}
      >
        {questions}
        <button
          type="button"
          className={cn(
            "text-primary text-lg sm:text-[28px] font-medium select-none outline-none cursor-pointer sm:h-12 sm:max-w-[50px] sm:w-full flex items-center justify-center transition-all duration-500 relative z-20  rounded-full focus:mt-1",
            isOpen ? "[&>svg]:-rotate-90 " : ""
          )}
        >
          <ArrowRight2 />
        </button>
      </summary>

      <p
        className={cn(
          "ml-2 lg:max-w-[960px] transition-all text-base duration-700",
          isOpen ? "h-full opacity-100" : "h-0 opacity-0 absolute -z-10"
        )}
      >
        {answer}
      </p>
    </details>
  );
};

export default Details;
