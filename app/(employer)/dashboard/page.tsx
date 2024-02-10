"use client";

import React from "react";
import DashNav from "@/components/dashboard/nav";
import { useRouter } from "next/navigation";
import { ArrowSquareLeft } from "iconsax-react";

const Dashboard = () => {
  const router = useRouter();
  return (
    <>
    
      <DashNav />
      
    </>
  );
};

export default Dashboard;
