"use client";

import { DollarCircle, Clock } from "iconsax-react";
import Link from "next/link";
import { useUserCtx } from "@/context/UserCtx";
import { useState } from "react";

const DashNav = () => {
  const [searchTerm, setSearchTerm] = useState("");
  

  return (
    <div className="w-full h-[40px]  min-[900px]:h-[56px] flex items-center justify-between gap-x-2 sm:gap-x-4 sm:px-4 bg-white mt-6 px-7">
      <div className="flex w-full sm:max-w-[413px] justify-center">
        <div className="flex items-center w-full relative">
          <h2 className="font-bold text-xl text-primary">Awesome Project</h2>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col justify-center p-2.5 text-sm tracking-normal leading-5 bg-gray-100 rounded-xl w-full text-green-950">
          <div className="flex gap-3 justify-between">
            <Clock variant="Broken" />
            <h2 className="my-auto">10 Hours</h2>
          </div>
        </div>
        <div className="flex flex-col justify-center p-2.5 text-sm tracking-normal leading-5 bg-gray-100 rounded-xl text-green-950">
          <div className="flex gap-3 justify-between">
            <DollarCircle variant="Broken" />
            <h2 className="my-auto">250</h2>
          </div>
        </div>
      </div>

      <Link
        href="/create-project"
        className="justify-center px-5 py-3 text-base font-semibold leading-6 text-white whitespace-nowrap bg-[#33059F] rounded-lg border border-solid shadow-sm border-[color:var(--purple-secondary-900,#33059F)]"
      >
        Create Project
      </Link>
    </div>
  );
};

export default DashNav;
