import React from "react";
import { NotificationProps } from "../page";
import Link from "next/link";
import { timeAgo } from "@/utils";

const SingleNotification = ({
  _id,
  message,
  createdAt,
  notification_type,
}: NotificationProps) => {
  return (
    <div className="w-full flex justify-between items-start border-b border-[#e1e1e1] dark:border-primary/20 relative hover:bg-black/10 transition-all duration-300 py-1">
      <div className="flex flex-col w-full items-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary/20">
        <p className="text-sm 2xl:text-base font-medium dark:text-gray-100 truncate line-clamp-1">
          {message}
        </p>
        <p className="text-gray-600  w-full float-left text-sm text-left justify-start items-start align-baseline">
          {timeAgo(createdAt)}
        </p>
      </div>
        {notification_type === "invite" && (
          <button className="text-sm text-blue-500 hover:underline">
            View Invite
          </button>
        )}
    </div>
  );
};

export default SingleNotification;
