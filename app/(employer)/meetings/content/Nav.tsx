"use client";

import React from "react";
import { useStateCtx } from "@/context/StateCtx";

const MeetingNav = () => {
  const { CreateMeet, setCreateMeet } = useStateCtx();

  return (
    <div className="w-full md:h-[56px] flex justify-between min-[450px]:gap-x-4 items-center flex-col open md:flex-row gap-y-4 sm:pt-4">
      <button onClick={() => setCreateMeet(true)}>open nav</button>
    </div>
  );
};

export default MeetingNav;
