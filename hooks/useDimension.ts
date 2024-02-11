"use client";
import { useState, useEffect } from "react";
const useWindowHeight = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setScrollY(window.scrollY);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // console.log(scrollY);

  return scrollY;
};

export default useWindowHeight;
