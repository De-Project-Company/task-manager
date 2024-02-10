"use client";

import DashNav from "@/components/dashboard/nav";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loader";
import React, { useEffect, useState } from "react";
import TOAST from "@/components/toast";
import { useStateCtx } from "@/context/StateCtx";

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { Toast, setToast } = useStateCtx();

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
        <button
          className="text-purple-600 my-11 bg-purple-50 px-5 py-3 hover:bg-purple-600 hover:text-purple-50 border border-[#ECEBFF] rounded-lg"
          onClick={() => {
            setToast(true);
          }}
        >
          open toast
        </button>
        <TOAST status="error" message="Error message" />
        <TOAST status="success" message="Success message" />
      </div>
    </>
  );
};

export default Dashboard;
