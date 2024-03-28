import React, { useState } from "react";
import { NotificationProps } from "../page";
import { timeAgo, cn } from "@/utils";
import { Check } from "lucide-react";

const SingleNotification = ({
  _id,
  message,
  createdAt,
  notification_type,
}: NotificationProps) => {
  const [read, setRead] = useState(() => {
    const readStatus = localStorage.getItem(`read_${_id}`);

    return readStatus ? JSON.parse(readStatus) : false;
  });

  const markAsRead = () => {
    localStorage.setItem(`read_${_id}`, JSON.stringify(true));
    setRead(true);
    const prevCount = JSON.parse(
      localStorage.getItem("readNotifications") || "0"
    );
    localStorage.setItem("readNotifications", JSON.stringify(prevCount + 1));
  };
  return (
    <div
      className={cn(
        "w-full flex justify-between items-center border-b border-[#e1e1e1] dark:border-primary/20 relative hover:bg-black/10 transition-all duration-300 py-1 pl-7",
        read ? "bg-[#e1e1e1] dark:bg-primary/20" : ""
      )}
    >
      <div className="flex flex-col w-full items-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/20">
        <p className="text-sm 2xl:text-base font-medium dark:text-gray-100 md:truncate md:line-clamp-1">
          {message}
        </p>
        <div className="flex items-center justify-between w-full">
          <p className="text-gray-600  w-full float-left text-sm text-left justify-start items-start align-baseline">
            {timeAgo(createdAt)}
          </p>
          {notification_type === "invite" && (
            <button className="text-sm text-blue-500 hover:underline w-full">
              View Invite
            </button>
          )}
        </div>
      </div>

      {!read && (
        <button
          onClick={markAsRead}
          aria-label="MarkAsRead"
          className="border border-purple-500 dark:border-white rounded-full "
        >
          <Check className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SingleNotification;
