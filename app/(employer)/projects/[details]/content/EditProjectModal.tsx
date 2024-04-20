"use client";

import { X } from "lucide-react";
import { cn } from "@/utils";
import { useState } from "react";
import { useStateCtx } from "@/context/StateCtx";

const EditTask = () => {
  const { setEditProjectModal, EditProject } = useStateCtx();

  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40 top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
          EditProject ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setEditProjectModal(false)}
      />

      <div
        role="dialog"
        aria-labelledby="create task modal"
        className={cn(
          "py-6   flex flex-col w-[98%] sm:w-[95%] overflow-y-auto overflow-x-hidden no-scroll min-[500px]:h-[500px] md:h-[550px] lg:h-[600px] md:w-[682px]  justify-between items-start bg-white dark:bg-primary backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 z-[99]  transition-all opacity-0 select-none pb-5 ",
          EditProject
            ? "-translate-x-1/2 duration-700 opacity-100 sm:rounded-xl md:rounded-2xl"
            : "translate-x-full duration-300 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] dark:border-primary-light pb-4 pl-4 px-4 md:pl-8 ">
          <h3 className="sm:text-lg md:text-2xl font-medium text-header dark:text-white">
            Create New Task
          </h3>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => setEditProjectModal(false)}
            className="text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:text-[#e80000] rounded-full"
          >
            <X size={24} />
          </button>
        </div>
      </div>
    </>
  );
};
