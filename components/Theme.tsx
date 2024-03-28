"use client";

import React from "react";
import { useThemeContext } from "@/context/ThemeCtx";
import { useStateCtx } from "@/context/StateCtx";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { cn } from "@/utils";

const Theme = () => {
  const { theme, setTheme } = useThemeContext();
  const { ApprovalModal } = useStateCtx();

  return (
    <button
      className={cn(
        "border-px fixed bottom-[30px] right-[35px] !z-[99] flex h-[40px] w-[40px] items-center justify-center rounded-full border-[#6a53ff] bg-primary dark:bg-white p-0",
        ApprovalModal ? "hidden" : ""
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <div className="cursor-pointer">
        {theme === "light" ? (
          <RiSunFill className="h-6 w-6 text-white dark:text-primary" />
        ) : (
          <RiMoonFill className="h-6 w-6 text-white dark:text-primary" />
        )}
      </div>
    </button>
  );
};

export default Theme;
