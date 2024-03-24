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
    <section className="w-full flex-col flex">
      <h2 className="ml-4 mt-4 font-medium text-[28px]">Notifications</h2>
      <div className="w-full px-5">
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
