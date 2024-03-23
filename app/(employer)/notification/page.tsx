"use client";

import { useState, useEffect } from "react";
import { getnotifications } from "@/actions/notification";
import { timeAgo } from "@/utils";

export interface NotificationProps {
  _id: string;
  user: string;
  notification_type: string;
  message: string;
  createdAt: string;
  __v: number;
}

const Notification = () => {
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Notifications</h1>
      <div className="text-center">
        {error && <p className="text-red-500">{`Error: ${error}`}</p>}
        {notifications.length === 0 && !error && (
          <p className="italic">No notifications available.</p>
        )}
        {notifications.length > 0 && (
          <ul>
            {notifications.map((notification) => (
              <li key={notification._id}>
                <div className="flex w-full gap-4 m-auto items-center justify-center align-middle">
                  <p className="font-[400] text-[#5B5F5E]">
                    {notification.message}
                  </p>
                  <p className="text-gray-600  w-full float-left text-sm text-left justify-start items-start align-baseline">
                    {timeAgo(notification.createdAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Notification;
