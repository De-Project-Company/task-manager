"use client";

import Image from "next/image";
import React from "react";
import { useUserCtx } from "@/context/UserCtx";

interface Members {
  name?: string;
  accepted?: boolean;
  memberId?: string;
}

const Member = ({ name, accepted, memberId }: Members) => {
  const { user } = useUserCtx();
  const isCurrentUserAdmin = user?.id === memberId;

  console.log(user);
  console.log(name);

  return (
    <div className="flex gap-y-2 w-full h-full max-h-[60px] sm:items-center justify-between border-b border-[#e1e1e1] dark:border-primary-light py-1 sm:py-0">
      <div className="flex items-center justify-between gap-x-2 dark:text-gray-200">
        <Image
          src={`https://ui-avatars.com/api/?name=${name!}&background=random`}
          alt={name!}
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-base max-[359px]:text-sm ">{name}</span>
      </div>
      <span className="text-base max-[359px]:text-sm">
        {isCurrentUserAdmin ? "Admin" : "Member"}
      </span>
    </div>
  );
};

export default Member;
