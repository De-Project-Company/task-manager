import React from "react";
import { cn } from "@/utils";

const WordCounter = ({ word, length }: { word?: string; length: number }) => {
  return (
    <div
      className={cn(
        "flex w-full h-[18px]  justify-end items-center text-primary  dark:text-white gap-x-1 transition-opacity duration-500",
        word!.length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <span className={word!.length === length ? "font-medium" : ""}>
        {word!.length}
      </span>
      <span className="dark:text-gray-200 font-medium">/</span>
      <span className="text-black  dark:text-gray-400 font-medium">
        {length}
      </span>
    </div>
  );
};

export default WordCounter;
