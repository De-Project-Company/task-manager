import { useThemeContext } from "@/context/ThemeCtx";
import { cn } from "@/utils";
import React from "react";

const ThemeButtons = () => {
  const { theme, setTheme } = useThemeContext();
  return (
    <div
      className={cn(
        "flex flex-col gap-y-4 p-2 items-center  rounded-full w-[46px] h-[92px] justify-between bg-white dark:bg-[#3a3f51] transition-all duration-700 relative before:content-[''] before:absolute before:h-[30px] before:w-[30px] before:bg-[#463EE3] before:rounded-full  ",
        theme === "light" ? "light-theme" : "dark-theme"
      )}
    >
      <button
        type="button"
        title="Light Theme"
        className={cn(
          "w-[30px] h-[30px] text-[#B2ABAB] relative z-10",
          theme === "light" &&
            " py-[6.563px] px-[7px] transition-all duration-700  text-gray-100  rounded-full "
        )}
        onClick={() => setTheme("light")}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z" stroke="none" />
          <path
            d="M11 4V2q.1-.9 1-1 1.2 0 1 1v2q0 1-1 1c-1 0-1-.4-1-1m7.4 3 1.4-1.4a1 1 0 1 0-1.4-1.4L17 5.6a1 1 0 1 0 1.4 1.5zm3.6 4h-2q-.9.1-1 1c-.1.9.5 1 1 1h2q1 0 1-1c0-1-.4-1-1-1m-10 8a1 1 0 0 0-1 1v2q.1 1 1 1 1.2 0 1-1v-2q0-.9-1-1M5.6 7 4.2 5.7a1 1 0 1 1 1.4-1.4L7 5.6a1 1 0 0 1-1.4 1.5zM17 17a1 1 0 0 0 0 1.4l1.4 1.4q.7.6 1.4 0a1 1 0 0 0 0-1.4L18.4 17a1 1 0 0 0-1.4 0M2 13h2q1 0 1-1c0-1-.4-1-1-1H2q-.9.1-1 1 0 1.2 1 1m3.6 6.8 1.5-1.4A1 1 0 1 0 5.6 17l-1.4 1.4a1 1 0 0 0 0 1.4q.7.6 1.4 0M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12"
            stroke="none"
          />
        </svg>
      </button>

      <button
        type="button"
        title="Dark Theme"
        className={cn(
          "w-[30px] h-[30px]  relative z-10 text-[#B2ABAB]",
          theme === "dark" &&
            " py-[6.563px] px-[7px] transition-all duration-700  dark:text-gray-100  rounded-full "
        )}
        onClick={() => setTheme("dark")}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
        >
          <path
            d="M15 4.7a1 1 0 0 0 1-1v-.9a1 1 0 0 0-2 0v1a1 1 0 0 0 1 .9m0 20.6a1 1 0 0 0-1 1v.9a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-.9M27.2 14h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2M3.8 14h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2M23 5.7l-.7.7a1 1 0 1 0 1.3 1.3l.7-.7A1 1 0 0 0 23 5.7M6.4 22.3l-.7.7A1 1 0 1 0 7 24.3l.7-.7a1 1 0 1 0-1.3-1.3m17.2 0a1 1 0 0 0-1.3 1.3l.7.7a1 1 0 0 0 1.3-1.3zM6.4 7.7a1 1 0 0 0 1.3-1.3L7 5.7A1 1 0 0 0 5.7 7zm16.8 8.7a1 1 0 0 0-1-.2q-1 .3-2 .3a6.7 6.7 0 0 1-6.4-8.7 1 1 0 0 0-1.1-1.2 8.6 8.6 0 1 0 10.7 10.7 1 1 0 0 0-.2-1"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};

export default ThemeButtons;
