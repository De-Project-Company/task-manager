import { useThemeContext } from "@/context/ThemeCtx";
import { cn } from "@/utils";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeButtons = () => {
  const { theme, setTheme } = useThemeContext();
  const TOGGLE_CLASSES =
    "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";
  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        type="button"
        title="Light Theme"
        className={cn(
          TOGGLE_CLASSES,
          theme === "light" ? "text-white" : "text-slate-300"
        )}
        onClick={() => setTheme("light")}
      >
        <FiMoon className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Light</span>
      </button>

      <button
        type="button"
        title="Dark Theme"
        className={cn(
          TOGGLE_CLASSES,
          theme === "dark" ? "text-white" : "text-slate-800"
        )}
        onClick={() => setTheme("dark")}
      >
        <FiSun className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Dark</span>
      </button>
      <div
        className={cn(
          "absolute inset-0 z-0 flex",
          theme === "dark" ? "justify-end" : "justify-start"
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default ThemeButtons;
