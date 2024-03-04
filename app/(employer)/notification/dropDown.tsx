"use client";

import { useState, useEffect } from "react";
import { getnotifications } from "@/actions/notification";
import { cn, timeAgo } from "@/utils";
import { Notification as NotificationIcon } from "iconsax-react";
import { useStateCtx } from "@/context/StateCtx";

const NotificationDopDown = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { openNotification, setopenNotification } = useStateCtx();

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
    <>
      <div
        className="min-h-screen top-0 left-0 w-full fixed z-[99] opacity-0 bg-black/25 cursor-default"
        role="dialog"
        onClick={() => setopenNotification(!openNotification)}
      />

      <div
        role="dialog"
        className={cn(
          " absolute max-h-max border dark:border-success/80 p-4 border-soft-light top-[50px] md:top-16 right-1 z-[9999] dark:bg-black/60  bg-white backdrop-blur-xl flex flex-col gap-y-2   justify-between  shadow-[0_10px_40px_rgba(0,0,0,0.23)] rounded-xl before:absolute before:content-[''] before:h-[20px] before:w-[20px] before:bg-gradient-to-tl dark:from-transparent dark:via-transparent dark:to-success from-white  to-white before:overflow-hidden before:-top-2 before:rotate-[45deg] lg:before:right-[105px] md:before:right-[90px] before:right-[65px] before:z-[-1] transform-gpu transition-all ",
          openNotification
            ? "opacity-100 h-[200px] duration-500 "
            : "opacity-0 h-0 duration-200 overflow-hidden pointer-events-none"
        )}
      >
        <div className="flex flex-col w-[300px] items-center gap-3 pb-3">
          <div className="bg-white sticky top-0 flex flex-col justify-between border-b w-full pb-2">
            <h1 className="font-[600] pt-1">Notifications</h1>
          </div>

          <div>
            <ul className="flex flex-col w-full flex-wrap">
              {notifications?.map((notification, index) => (
                <li
                  key={notification.id}
                  className={`h-fit py-4 flex px-4 flex-col `}
                >
                  <div className="flex w-full gap-4 m-auto items-center justify-center align-middle">
                    <div className="m-auto w-fit p-2 rounded-full">
                      <NotificationIcon size="32" />
                    </div>
                    <div className="flex m-auto items-center gap-2 justify-center w-full flex-col">
                      <p className="font-[400] text-[#5B5F5E] text-sm ">
                        {notification.message}
                      </p>
                      <p className="text-gray-600  w-full float-left text-sm text-left justify-start items-start align-baseline">
                        {timeAgo(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              {notifications.length === 0 && (
                <div className="text-[#5B5F5E] text-sm font-normal py-4 text-center">
                  No Notifications yet!!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#fff] w-xs max-h-[60vh] z-50 border-[#d8d8d8] overflow-y-scroll no-scrool rounded-lg shadow-xl"></div>
    </>
  );
};

export default NotificationDopDown;
