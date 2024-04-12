"use client";

import NAVLINKS from "@/constants";
import traverse from "../../public/assets/traverseLogo.png";
import Link from "next/link";
import Image from "next/image";
import { useStateCtx } from "@/context/StateCtx";
import { FaBars } from "react-icons/fa";
import MobileNav from "./MobileNav";
import { cn } from "@/utils";
import useWindowHeight from "@/hooks/useDimension";

export const Nav = () => {
  const { setLandingMobileMenu } = useStateCtx();
  const scrollHeight = useWindowHeight();
  return (
    <nav
      className={cn(
        " max-[500px]:py-2 w-full justify-between items-center bg-white dark:bg-primary  transition-colors duration-500",
        scrollHeight > 200
          ? " fixed backdrop-blur-xl top-0 left-0  z-50 -translate-y-28 opacity-0 animate-slideDown bg-white/90 dark:bg-primary py-2 border-b border-gray-200 shadow-md"
          : "sm:py-6 py-4",
        {
          "bg-white/60 ": scrollHeight > 800 && scrollHeight < 4300,
        }
      )}
    >
      <header className="md:flex  justify-between items-center py-3 md:px-16 px-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="">
            <Image
              src={traverse}
              alt="traverse logo"
              width={150}
              height={150}
              className="dark:hidden block"
            />
            <Image
              src="/logo.svg"
              alt="traverse logo"
              width={150}
              height={150}
              className="dark:block hidden"
            />
          </Link>
          <div
            tabIndex={0}
            role="button"
            className="lg:hidden text-2xl cursor-pointer focus:border dark:text-white text-primary  border-primary"
            onClick={() => setLandingMobileMenu(true)}
          >
            <FaBars />
          </div>
        </div>

        <div className="md:text-base text-xs font-semibold items-center justify-between md:gap-4 hidden md:flex">
          <Link
            href="/auth/signup"
            className="rounded-lg shadow shadow-xs bg-purple-900 text-white px-5 py-3 hover:border-purple-600 hover:text-white"
          >
            Signup
          </Link>
          <Link
            href="/auth/signin"
            className="text-purple-600 bg-purple-50 px-5 py-3 hover:bg-purple-600 hover:text-purple-50 border border-[#ECEBFF] rounded-lg"
          >
            Login
          </Link>
        </div>
      </header>
      <div
        className={cn(
          "md:flex hidden flex-col md:flex-row gap-2 lg:justify-between border-t-2 py-8 md:px-16 px-5",
          scrollHeight > 200 ? "md:hidden h-0 bg-transparent" : ""
        )}
      >
        {NAVLINKS.map((item) => (
          <Link
            href={item.link}
            className={cn(
              "flex items-center gap-2 hover:bg-purple-50 px-2 py-3 rounded-lg group",
              { hidden: scrollHeight > 200 }
            )}
            key={item.title}
          >
            <Image
              src="/assets/strongbox.svg"
              alt="link icon"
              width={40}
              height={40}
            />

            <div>
              <h4 className="text-sm md:text-base font-semibold text-purple-900 dark:text-white  dark:group-hover:text-primary">
                {item.title}
              </h4>
              <p className="text-[12px] md:text-sm font-normal tracking-[-0.1px] text-[#6B7B8F] dark:text-white dark:group-hover:text-primary">
                {item.descText}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div
        className={cn(
          "bg-purple-50 dark:bg-white dark:text-primary text-center py-4",
          { hidden: scrollHeight > 200 }
        )}
      >
        <Link href="/request">Need more information? Get in touch</Link>
      </div>

      <MobileNav />
    </nav>
  );
};
