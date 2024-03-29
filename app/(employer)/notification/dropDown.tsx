"use client";

import { useState, useEffect } from "react";
import { getnotifications } from "@/actions/notification";
import { cn, timeAgo } from "@/utils";
import Link from "next/link";
import { useStateCtx } from "@/context/StateCtx";
import { NotificationProps } from "./page";

const NotificationDopDown = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { openNotification, setopenNotification } = useStateCtx();

  useEffect(() => {
    const fetchNotifications = async () => {
      const result = await getnotifications();

      if (result?.status === "success") {
        const sortedNotifications = result.notifications.map(
          (notification: { createdAt: string | number | Date }) => ({
            ...notification,
            createdAt: new Date(notification.createdAt),
          })
        );

        sortedNotifications.sort(
          (
            a: { createdAt: { getTime: () => number } },
            b: { createdAt: { getTime: () => number } }
          ) => b.createdAt.getTime() - a.createdAt.getTime()
        );

        setNotifications(sortedNotifications);
      } else {
        setError(result?.error || "Unknown error");
      }
    };

    fetchNotifications();
  }, []);

  // console.log(notifications);

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
          " absolute max-h-[200px] max-w-[300px] overflow-y-auto overflow-x-hidden border dark:border-success/80 border-soft-light top-[50px] md:top-16 right-1 z-[9999] dark:bg-primary dark:text-white  bg-white backdrop-blur-xl flex flex-col gap-y-2   justify-between  shadow-[0_10px_40px_rgba(0,0,0,0.23)] rounded-xl before:absolute before:content-[''] before:h-[20px] before:w-[20px] before:bg-gradient-to-tl dark:from-transparent dark:via-transparent dark:to-success from-white  to-white before:overflow-hidden before:-top-2 before:rotate-[45deg] lg:before:right-[105px] md:before:right-[90px] before:right-[65px] before:z-[-1] transform-gpu transition-all ",
          openNotification
            ? "opacity-100 h-[200px] duration-500 "
            : "opacity-0 h-0 duration-200 overflow-hidden pointer-events-none"
        )}
      >
        <div className="flex flex-col w-[300px] items-center ">
          <div
            className=" sticky top-0 flex justify-between border-b w-full pb-2 dark:text-white px-4 py-2 
          bg-white dark:bg-primary items-center"
          >
            <h1 className="font-[600] text-xs  md:text-sm">Notifications</h1>
            <Link href="/notification " className="text-xs md:text-sm">
              View all
            </Link>
          </div>

          <div className="w-full">
            <ul className="flex flex-col w-full ">
              {notifications?.map((notification) => (
                <li key={notification._id} className={`h-fit flex flex-col `}>
                  <div
                    className="flex w-full gap-1 items-center justify-between px-3 mb-1 last:mb-0 
                  hover:bg-gray-100 cursor-pointer pt-1 group"
                  >
                    {/* <div className="m-auto w-fit p-2 rounded-full">
                      <NotificationIcon size="20" />
                    </div> */}

                    <div className="each_wrapper flex space-x-1">
                      <div className="status h-2 w-2 rounded-full bg-green-500 block self-start mt-1"></div>
                      {/* did most tweek here  */}
                      <div
                        className="flex items-center space-y-2 justify-center flex-col w-full
                       border-gray-200 border-b-[1px] pb-1 dark:border-white "
                      >
                        <p
                          className="text-[#5B5F5E] dark:text-white text-xs font-medium
                       w-fit block group-hover:font-bold "
                        >
                          {/* {notification.message.length > 50
                          ? notification.message.slice(0, 40) + "..."
                          : notification.message} */}

                          {notification?.message}
                        </p>

                        <p
                          className="text-gray-400 dark:text-white w-full float-left text-xs text-left justify-start 
                      items-start align-baseline"
                        >
                          {timeAgo(notification.createdAt)}
                        </p>
                      </div>
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
