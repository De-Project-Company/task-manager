"use client";


import DashNav from "@/components/dashboard/nav";
import { useRouter } from "next/navigation";
import { ArrowSquareLeft } from "iconsax-react";
import LoadingSpinner from "@/components/loader";
import React, { useEffect, useState } from 'react';


const Dashboard = () => {
  const router = useRouter();
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
    <>
    
      <DashNav />

      
<div>
      {loading ? (
       <div className="grid place-items-center min-h-[400px]">
        <LoadingSpinner />
   </div>
      ) : error ? (

       <div className="grid place-items-center min-h-[400px]">
            <div className="text-center ">
                    <p>Sorry work is currently in progress try creating a project </p>
              <p>⚒️ We are currently working on this ⚒️</p>
            </div>
          </div>
      ) : (
        <>
          {/* Your gallery component goes here */}
          <p> error </p>
        </>
      )}
    </div>

    </>
  );
};

export default Dashboard;
