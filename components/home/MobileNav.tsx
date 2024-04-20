/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import React, { useEffect, useState } from "react";
import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";
import Link from "next/link";
import { CloseSquare } from "iconsax-react";
import { useSearchParams } from "next/navigation";
import { BsX } from "react-icons/bs";
import NAVLINKS from "@/constants";

const MobileNav = () => {
  const { landingMobileMenu, setLandingMobileMenu } = useStateCtx();
  const [isActive, setIsActive] = useState("");
  const searchParams = useSearchParams().get("path");

  useEffect(() => {
    if (searchParams) {
      setIsActive(searchParams);
      return;
    }
  }, [searchParams]);

  useEffect(() => {
    if (landingMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLandingMobileMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [landingMobileMenu]);
  return (
    <>
      <div
        className={cn(
          "lg:hidden fixed min-h-screen w-full bg-black/50 top-0 left-0 z-20 transition-all duration-300",
          landingMobileMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setLandingMobileMenu(false)}
      />
      <nav
        className={cn(
          "pt-20 lg:hidden  px-4 sm:px-8 xl:px-16 2xl:px-24 flex w-full max-w-[300px] sm:max-w-[60%] md:max-w-[50%] justify-between items-center bg-white/90 dark:bg-primary/90 backdrop-blur-lg fixed right-0 top-0 z-50 h-screen transition-all opacity-0",
          landingMobileMenu
            ? "translate-x-0 duration-1000 opacity-100"
            : "translate-x-full duration-300"
        )}
      >
        <button
          autoFocus
          aria-label="close menu"
          type="button"
          className="outline-none dark:text-gray-100 text-primary text-2xl sm:text-4xl absolute top-2 right-2 h-12 w-12 rounded-full  focus:border-2 focus-visible:border-primary  flex justify-center items-center"
          onClick={() => setLandingMobileMenu(false)}
          tabIndex={0}
        >
          <CloseSquare size="32" variant="Broken" />
        </button>

        <div className="flex flex-col  items-start h-full gap-y-10 ">
          {NAVLINKS.map((link) => (
            <Link
              tabIndex={0}
              aria-label={link.title}
              href={link.link}
              key={link.title}
              onClick={() => setLandingMobileMenu(false)}
              className={cn(
                "focus-visible:rounded-md focus-visible:border-2 outline-none focus-visible:p-1 focus-visible:border-primary   text-black dark:text-gray-300  flex justify-center capitalize relative font-medium  before:bg-primary/50 dark:before:bg-white before:w-[0%] before:h-1 before:absolute before:-bottom-2 before:left-0 before:transition-all before:duration-500 text-lg",
                isActive === link.link ? "before:w-full text-primary/50" : ""
              )}
            >
              {link.title}
            </Link>
          ))}
          <Link
            onClick={() => setLandingMobileMenu(false)}
            href="/auth/signin"
            className="rounded-lg shadow shadow-xs bg-purple-900 dark:bg-white dark:text-primary dark:font-semibold text-white px-5 py-3"
          >
            Sign In
          </Link>
          <Link
            onClick={() => setLandingMobileMenu(false)}
            href="/auth/signup"
            className="rounded-lg shadow shadow-xs bg-purple-900 dark:bg-white dark:text-primary dark:font-semibold text-white px-5 py-3"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
