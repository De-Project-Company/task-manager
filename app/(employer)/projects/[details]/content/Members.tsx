import { ProfileCircle } from "iconsax-react";
import React from "react";

interface Members {
  name?: string;
}

const Member = ({ name }: Members) => {
  return (
    <div className="flex  gap-y-2 w-full  sm:h-[30px] sm:items-center justify-between border-b border-[#e1e1e1] dark:border-primary-light py-1 sm:py-0">
      <div className="flex items-center justify-between gap-x-2 dark:text-gray-200">
        <ProfileCircle size={18} />
        <span className="text-base max-[359px]:text-sm ">{name}</span>
      </div>
    </div>
  );
};

export default Member;
