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
import { handleMouseEnter } from "@/utils/text-effect";

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
  const titleLen = 27;

  const fullName = user?.name;

  const [firstName] = fullName!.split(/\s+/);

  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);

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
  }, [notifications]);

  useEffect(() => {
    const readNotificationCount =
      Number(localStorage.getItem("readNotifications")) || 0;
    const unreadCount = notifications.length - readNotificationCount;
    setUnreadCount(unreadCount);
  }, [notifications]);

  return (
    <header
      className={cn(
        "lg:px-9 px-3 border-b border-gray-200 dark:border-secondary h-[50px] sm:h-[70px] md:h-[89px] flex items-center justify-between fixed md:relative max-md:top-0 max-md:left-0 max-md:z-50 md:z-50 select-none bg-white/80 dark:bg-primary backdrop-blur-lg w-full",
        {
          //   "md:overflow-hidden": EmployerShowMobileMenu,
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
            "md:hidden rounded-full focus-visible:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light text-black dark:text-white",
            {
              "rotate-45 absolute right-1 top-1 z-[9999]": openSidebarMain,
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
              onMouseEnter={handleMouseEnter}
              className="max-[370px]:text-base max-[500px]:text-lg text-xl sm:text-3xl capitalize font-medium text-header dark:text-white"
              data-value={
                decrptedTitle
                  ? currentPath.replace("projects", "project")
                  : currentPath
              }
            >
              {decrptedTitle
                ? currentPath.replace("projects", "project")
                : currentPath}
            </h2>
            {decrptedTitle && (
              <div className="sm:flex items-center gap-x-2 hidden">
                <span className="text-2xl sm:text-4xl text-gray-700 dark:text-gray-200 ">
                  •
                </span>
                <h3 className="max-[500px]:text-sm  sm:text-xl md:text-3xl capitalize min-[390px]:font-medium text-header dark:text-white">
                  {decrptedTitle.length > titleLen
                    ? `${decrptedTitle.slice(0, titleLen)}...`
                    : decrptedTitle}
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
      <div className=" hidden md:flex">
        <ThemeButtons />
      </div>
      {user && (
        <div className="flex items-center gap-x-3 xl:gap-x-5  [&>button]:font-medium [&>button]:text-header dark:[&>button]:text-white ">
          <div className="relative">
            <div className="t-[4] absolute left-4">
              <p
                className={cn(
                  "flex h-1 w-1 items-center justify-center rounded-full  p-2 text-xs bg-red-200 text-green-600",
                  unreadCount === undefined || 0 ? "hidden" : ""
                )}
              >
                {unreadCount}
              </p>
            </div>

            <button
              type="button"
              className="text-black dark:text-white"
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
