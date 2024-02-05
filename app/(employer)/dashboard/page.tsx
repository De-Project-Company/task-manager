"use client";
import React from "react";
import OTPModal from "@/components/modals/VerifyModal";
import { useStateCtx } from "../../../context/StateCtx";

const Dashboard = () => {
  const { setOTPModal } = useStateCtx();

  return (
    <div>
      <button onClick={() => setOTPModal(true)}> verify modal</button>
      <OTPModal />
    </div>
  );
};

export default Dashboard;
