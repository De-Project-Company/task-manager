"use client";
import {
  Add,
  HambergerMenu,
  Notification,
  ArrowDown2,
  Profile,
  Setting4,
  LogoutCurve,
} from "iconsax-react";
import { useStateCtx } from "@/context/StateCtx";
import { cn, decryptString } from "@/utils";
import { useUserCtx } from "@/context/UserCtx";
import { handleMouseEnter } from "@/utils/text-effect";
import { useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import useVisible from "@/hooks/visibity";
import Image from "next/image";
import ThemeButtons from "../ThemeButton";
import { Input } from "../ui/Input";
import { useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";

const EmployersNav = () => {
  const { user } = useUserCtx();
  const titleLen = 27;
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const {
    ref: profileRef,
    isVisible: profileDropdown,
    setIsVisible: setProfileDropdown,
  } = useVisible();

  return (
    <header
      className={cn(
        "lg:px-9 px-3 border-b border-gray-200 dark:border-secondary h-[50px] sm:h-[70px] md:h-[89px] flex items-center justify-between fixed md:relative max-md:top-0 max-md:left-0 max-md:z-[99] select-none bg-white/80 dark:bg-secondary backdrop-blur-lg w-full",
        {
          //   "md:overflow-hidden": EmployerShowMobileMenu,
        }
      )}
    >
      {/* <button
        tabIndex={0}
        aria-haspopup
        // aria-expanded={employerShowMobileMenu}
        type="button"
        className={cn(
          "md:hidden rounded-full focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light",
          {
            "rotate-45 absolute right-1 top-1 z-[9999] text-white":
            //   employerShowMobileMenu,
          }
        )}
        // onClick={() => setAdminShowMobileMenu(!adminShowMobileMenu)}
      >
        {adminShowMobileMenu ? (
          <Add size={60} className="text-header dark:text-gray-200" />
        ) : (
          <HambergerMenu size={32} className="text-header dark:text-gray-200" />
        )}
      </button> */}
      <Input
        type="text"
        placeholder="Search..."
        className="h-[46px] w-[360px] rounded-2xl border-black text-black"
      />
      <div className="flex gap-8 justify-between items-center text-sm font-medium tracking-normal leading-5 text-slate-900">
        <div className="rotate-90 hidden md:flex">
          <ThemeButtons />
        </div>
        <button className="flex justify-center items-center">
          <Notification size="32" />
        </button>
        <button
          className="flex gap-4 items-center px-5"
          onClick={() => setProfileDropdown(true)}
        >
          <Image
            src={user?.image}
            alt="user"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <span className="text-base">{user.name}</span>
          <ArrowDown2 />
        </button>
      </div>
      {profileDropdown && (
        <div
          ref={profileRef}
          style={{
            boxShadow:
              "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)",
          }}
          className="absolute bg-white-N0 rounded-lg w-[15rem] p-3 right-8 top-[80px] z-50"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 border-b border-b-Grey-G30 pb-3 px-2">
              <div className="w-[40px] h-[40px] rounded-full">
                <Image
                  src={user?.image}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full object-contain"
                />
              </div>
              <p className="text-base">{user.name}</p>
            </div>
            <div className="space-y-2 border-b border-b-Grey-G30 pb-3">
              <Link href="/profile">
                <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-Grey-G20 rounded-lg">
                  <Profile size={18} color="#3C3C3C" />
                  <p className="text-Grey-G500 font-medium text-sm">
                    View profile
                  </p>
                </div>
              </Link>
              <Link href="/settings">
                <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-Grey-G20 rounded-lg">
                  <Setting4 size={18} color="#3C3C3C" />
                  <p className="text-Grey-G500 font-medium text-sm">Settings</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-Grey-G20 rounded-lg">
              <Link href="/">
                <div className="px-2 h-9">
                  <LogoutCurve size={18} color="#3C3C3C" />
                  <p className="text-Grey-G500 font-medium text-sm">Logout</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default EmployersNav;
