"use client";

import DashNav from "@/components/dashboard/nav";
import LoadingSpinner from "@/components/loader";
import React, { useEffect, useState } from "react";
import DashBoardNav from "@/components/dashboard/NavBar";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="w-full h-full flex flex-col gap-y-6 min-[1140px]:px-9 px-3 pt-8">
      <DashBoardNav />
    </section>
  );
};

export default Dashboard;
