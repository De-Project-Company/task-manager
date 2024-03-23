"use client";
import { Add, HambergerMenu, Notification, SearchNormal1 } from "iconsax-react";
import { useStateCtx } from "@/context/StateCtx";
import { cn, decryptString } from "@/utils";
import { useSearchParams } from "next/navigation";
import ThemeButtons from "../ThemeButton";
import Image from "next/image";
import MobileSidebar from "../sidebars/MobileSidebar";
import { useUserCtx } from "@/context/UserCtx";
import NotificationDopDown from "@/app/(employer)/notification/dropDown";
import { getnotifications } from "@/actions/notification";
import { NotificationProps } from "@/app/(employer)/notification/page";
import { useState, useEffect } from "react";

const Navbar = () => {
  const {
    currentPath,
    openSidebarMain,
    setOpenSidebarMain,
    openNotification,
    setopenNotification,
  } = useStateCtx();
  const { user } = useUserCtx();
  const searchParams = useSearchParams();
  const projectTitle = searchParams.get("project_title");
  const decrptedTitle = decryptString(projectTitle ?? "");

  const fullName = user?.name;

  const [firstName] = fullName!.split(/\s+/);

  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  console.log(notifications);

  useEffect(() => {
    const fetchNotifications = async () => {
      const result = await getnotifications();

      if (result?.status === "success") {
        setNotifications(result.notifications);
      } else {
        setError(result?.error || "Unknown error");
      }
    };

    fetchNotifications();
  }, []);

  return (
    <header
      className={cn(
        "lg:px-9 px-3 border-b border-gray-200 h-[50px] sm:h-[70px] md:h-[89px] flex items-center justify-between fixed md:relative max-md:top-0 max-md:left-0 md:z-50 select-none dark:bg-primary dark:text-white bg-white/80 backdrop-blur-lg w-full",
        {
          "md:overflow-hidden": openSidebarMain,
        }
      )}
    >
      <div
        className={cn("flex items-center gap-x-4", {
          "w-full ": openSidebarMain,
        })}
      >
        <button
          tabIndex={0}
          aria-haspopup
          aria-expanded={openSidebarMain}
          type="button"
          className={cn(
            "md:hidden rounded-full focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light",
            {
              "rotate-45 absolute right-1 top-1 z-[9999] text-white":
                openSidebarMain,
            }
          )}
          onClick={() => setOpenSidebarMain(!openSidebarMain)}
        >
          {openSidebarMain ? <Add size={60} /> : <HambergerMenu size={32} />}
        </button>
        {currentPath === "dashboard" ? (
          <div className="flex gap-x-2 sm:gap-x-4 items-center">
            <h2 className="hidden md:inline sm:text-3xl capitalize font-medium text-header dark:text-white  ">
              Welcome back! {firstName}
            </h2>
            <h2 className="max-[370px]:text-base max-[500px]:text-lg text-xl md:hidden capitalize font-medium text-header  dark:text-white ">
              {currentPath}
            </h2>
          </div>
        ) : (
          <div className="flex gap-x-2 sm:gap-x-4 items-center">
            <h2
              //   onMouseEnter={handleMouseEnter}
              className="max-[370px]:text-base max-[500px]:text-lg text-xl sm:text-3xl capitalize font-medium text-header dark:text-white"
              //   data-value={
              //     decrptedTitle
              //       ? currentPath.replace("projects", "project")
              //       : decrptedName
              //   }
            >
              {decrptedTitle}
            </h2>
          </div>
        )}
      </div>
      <div className="rotate-90 hidden md:flex">
        <ThemeButtons />
      </div>
      {user && (
        <div className="flex items-center gap-x-3 xl:gap-x-5  [&>button]:font-medium [&>button]:text-header dark:[&>button]:text-white ">
          <div className="relative">
            <div className="t-[4] absolute left-4">
              <p
                className={cn(
                  "flex h-1 w-1 items-center justify-center rounded-full  p-2 text-xs bg-red-200 text-green-600",
                  notifications.length === undefined || 0 ? "hidden" : ""
                )}
              >
                {notifications.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setopenNotification(openNotification ? false : true)
              }
            >
              <Notification
                size={24}
                variant={openNotification ? "Bulk" : "Outline"}
              />
            </button>
          </div>
          {openNotification && <NotificationDopDown />}
          <button
            type="button"
            className="w-8 h-8 border border-primary-light rounded-full"
          >
            <Image
              src={user?.image}
              alt="user"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          </button>
        </div>
      )}
      <MobileSidebar />
    </header>
  );
};

export default Navbar;
