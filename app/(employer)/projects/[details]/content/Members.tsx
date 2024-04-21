"use client";

import Image from "next/image";
import React from "react";
import { Owner } from "@/types";

interface Members {
  name?: string;
  email?: string;
  accepted?: boolean;
  memberId?: string;
  owner?: Owner;
}

const Member = ({ name, accepted, memberId, email, owner }: Members) => {
  const isCurrentUserAdmin = email === owner?.email;

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
