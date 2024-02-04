"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";
import { usePathname } from "next/navigation";

interface StateContextProps {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

const StateCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const t = "%c  Made By \ud83d\udc9a  - Satrters House ",
      n = [
        "font-size: 12px",
        "color: #fffce1",
        "font-family: monospace",
        "background: #0e100f",
        "display: inline-block",
        "padding: 1rem 3rem",
        "border: 1px solid #0ff",
        "border-radius: 4px;",
      ].join(";");
    console.log(t, n);
  }, []);

  useEffect(() => {
    if (pathname === "/") return;
    let timeoutId: any;

    const showScrollbar = () => {
      document.documentElement.setAttribute("scrollbar", "");
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        hideScrollbar();
      }, 2000);
    };

    const hideScrollbar = () => {
      document.documentElement.removeAttribute("scrollbar");
    };

    window.addEventListener("scroll", showScrollbar);

    return () => {
      window.removeEventListener("scroll", showScrollbar);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  const value = useMemo(() => ({ openSidebar, setOpenSidebar }), [openSidebar]);

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateCtxProvider;

export function useStateCtx() {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error("useStateContext must be used within an CtxProvider");
  }

  return context;
}
