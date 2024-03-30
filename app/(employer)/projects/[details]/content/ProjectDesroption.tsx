"use client";

import React, { useEffect, useState } from "react";
import { ProjectProps } from "@/types";
import { Edit2, More, Status, Trash } from "iconsax-react";
import { useStateCtx } from "@/context/StateCtx";
import { useUserCtx } from "@/context/UserCtx";
import { cn } from "@/utils";
import { format } from "date-fns";

const ProjectDesroption = ({
  _id,
  description,
  owner,
  startDate,
  endDate,
  price,
  priceCurrency,
  teamMembers,
  title,
}: ProjectProps) => {
  const {
    DeleteProjectModal,
    setDeleteProjectModal,
    setChangeProjectStatusModal,
  } = useStateCtx();
  const { user } = useUserCtx();

  const [isDotMenu, setIsDotMenu] = useState(false);

  useEffect(() => {
    if (isDotMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDotMenu(false);
      }
    };

    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [isDotMenu]);

  const admin = teamMembers?.find((member) => member.user._id === owner?._id);
  const isNotAdmin = admin?.user._id !== user?.id;

  const formattedStartDate = startDate
    ? format(new Date(startDate), "LLL dd, y")
    : "";

  const formattedEndDate = endDate
    ? format(new Date(endDate), "LLL dd, y")
    : "";

  return (
    <div className="mt-12 flex flex-col w-full sm:px-3 py-6 mb-6 h-full relative">
      <div className="flex w-full items-center justify-between pb-2 md:pb-3 border-b border-[#e1e1e1] dark:border-primary-light">
        <h3 className="text-lg font-semibold text-header dark:text-gray-100 ">
          Project Details
        </h3>
        <button
          type="button"
          id="dot-menu"
          tabIndex={0}
          aria-haspopup
          aria-expanded={isDotMenu}
          onClick={() => setIsDotMenu((prev) => !prev)}
          className={cn(
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rotate-90 text-header",
            isNotAdmin ? "hidden" : "block"
          )}
        >
          <More />
        </button>
      </div>
      {/* DOT Menu */}
      <div
        className={cn(
          "fixed min-h-screen w-full bg-black/0 top-0 left-0 z-[99] transition-all duration-300",
          isDotMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsDotMenu(false)}
      />
      <div
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dot-menu"
        className={cn(
          "flex w-[190px] h-[106px] flex-col px-4 py-2 absolute right-4  rounded-lg justify-center gap-y-4 border border-gray-200 dark:border-primary backdrop-blur-xl bg-white/80 dark:bg-primary transition-all duration-300 z-[999]",
          {
            "opacity-100": isDotMenu,
            "opacity-0 pointer-events-none": !isDotMenu,
          }
        )}
      >
        <button
          onClick={() => {
            setChangeProjectStatusModal(true);
            setIsDotMenu(!isDotMenu);
          }}
          type="button"
          tabIndex={0}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40 w-full flex items-center gap-x-2 px-2 text-header dark:text-gray-200"
        >
          <Status size={18} />
          <span>Change Status</span>
        </button>

        <button
          onClick={() => {
            setDeleteProjectModal(true);
            setIsDotMenu(!isDotMenu);
          }}
          type="button"
          tabIndex={0}
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40 w-full flex items-center gap-x-2 px-2 text-header dark:text-gray-200"
        >
          <Trash size={18} />
          <span>Delete Project</span>
        </button>
      </div>
      <div className="flex w-full flex-col py-5 gap-y-3 lg:gap-y-4">
        <p className="text-sm xl:text-base text-header dark:text-gray-200 flex flex-wrap items-center gap-x-1">
          Project Title:
          <span className="font-medium">{title}</span>
        </p>
        <p className="text-sm xl:text-base text-header dark:text-gray-200 flex items-center gap-x-1">
          Project Owner:
          <span className="font-medium">{owner?.name}</span>
        </p>
        <p className="text-sm xl:text-base text-header dark:text-gray-200 flex items-center gap-x-1">
          Project Start Date:
          <span className="font-medium">{formattedStartDate}</span>
        </p>
        <p className="text-sm xl:text-base text-header dark:text-gray-200 flex items-center gap-x-1">
          Project End Date:
          <span className="font-medium">{formattedEndDate}</span>
        </p>
      </div>
      {/* Description */}
      <div className="flex flex-col w-full sm:px-3 py-6 border-t border-[#e1e1e1] h-full">
        <h3 className="text-lg font-semibold dark:text-gray-100  text-header  pb-4">
          Project Description
        </h3>
        <div className="flex h-full max-h-[270px] overflow-y-auto sidebar-scroll w-full">
          <p className="text-sm 2xl:text-base text-header dark:text-gray-300 ">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDesroption;
