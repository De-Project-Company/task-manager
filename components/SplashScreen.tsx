import { cn } from "../utils";

const SplashScreen = () => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] grid place-content-center bg-primary transition-all duration-700"
      )}
    >
      <svg viewBox="0 0 800 260" className="w-full font-bold">
        <circle cx="100" cy="25" r="18" />
        <circle cx="60" cy="60" r="18" />
        <circle cx="20" cy="90" r="18" />
        <circle cx="60" cy="120" r="18" />
        <circle cx="100" cy="150" r="18" />
        <text
          x="45%"
          y="32%"
          dy=".32em"
          textAnchor="middle"
          className="text-body text-7xl"
        >
          Traverse
        </text>
        <text
          x="45%"
          y="32%"
          dy=".32em"
          dx="3.8em"
          textAnchor="middle"
          className="text-body text-7xl"
        >
          .
        </text>
      </svg>
    </div>
  );
};

export default SplashScreen;
