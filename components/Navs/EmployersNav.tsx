"use client";
import { Add, HambergerMenu, Notification, SearchNormal1 } from "iconsax-react";
import { useStateCtx } from "@/context/StateCtx";
import { cn, decryptString } from "@/utils";
import { useUserCtx } from "@/context/UserCtx";
import { handleMouseEnter } from "@/utils/text-effect";
import { useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const EmployersNav = () => {
  const { user } = useUserCtx();
  const { currentPath } = useStateCtx;
  const titleLen = 27;

  return (
    <header
      className={cn(
        "lg:px-9 px-3 border-b border-gray-200 dark:border-primary-light h-[50px] sm:h-[70px] md:h-[89px] flex items-center justify-between fixed md:relative max-md:top-0 max-md:left-0 max-md:z-[99] select-none bg-white/80 dark:bg-gray-900 backdrop-blur-lg w-full",
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
    </header>
  );
};

export default EmployersNav;
