"use client";

import React from "react";
import SingleNotification from "./SingleNotification";
import { useState, useEffect } from "react";
import { getnotifications } from "@/actions/notification";
import { NotificationProps } from "../page";
import EmptyState from "./NoNOtification";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [error, setError] = useState<string | null>(null);

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
  return (
    <section className="w-full flex-col flex">
      <h2 className="mt-4 font-medium text-[28px] dark:text-white px-5">
        Notifications
      </h2>
      <div className="w-full">
        {notifications.length === 0 ? (
          <EmptyState />
        ) : (
          notifications.map((notification) => (
            <SingleNotification key={notification._id} {...notification} />
          ))
        )}
      </div>
    </section>
  );
};

export default NotificationPage;
