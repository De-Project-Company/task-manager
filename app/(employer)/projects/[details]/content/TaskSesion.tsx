"use client";

import React, { useEffect, useState } from "react";
import { useStateCtx } from "@/context/StateCtx";
import AssignTask from "./addTaskMoal";
import { cn } from "@/utils";
import { Add } from "iconsax-react";

interface TasksessionProp {
  projectid?: string;
}

const TaskSesion = ({ projectid }: TasksessionProp) => {
  const [isMenu, setIsMenu] = useState(false);
  const { setaddTaskModal } = useStateCtx();

  useEffect(() => {
    if (isMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenu(false);
      }
    };

    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [isMenu]);

  return (
    <>
      <div
        className={cn(
          "flex flex-col w-full px-3 py-6 sm:rounded-xl  relative mt-12"
        )}
      >
        <div className="flex w-full items-center justify-between pb-2 md:pb-3 border-b border-[#e1e1e1] ">
          <h3 className="text-lg font-semibold text-header dark:text-white">
            Tasks
          </h3>
          <button
            type="button"
            tabIndex={0}
            id="add-milestone"
            aria-haspopup
            aria-expanded={isMenu}
            onClick={() => setIsMenu((prev) => !prev)}
            className="focus-visible:outline-2 focus-visible:outline-offset-4  text-primary dark:text-white rotate-90 h-6 w-6 rounded-full border border-[#090909] flex items-center justify-center"
          >
            <Add size={24} />
          </button>
        </div>
        {/* DOT Menu */}
        <div
          className={cn(
            "fixed min-h-screen w-full bg-black/0 top-0 left-0 z-[99] transition-all duration-300",
            isMenu ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMenu(false)}
        />
        <div
          role="dialog"
          aria-labelledby="add-milestone"
          className={cn(
            "flex w-[190px] h-[56px]  px-4 py-2 absolute right-2 top-[3.5rem] rounded-lg justify-center  border border-gray-200 backdrop-blur-xl bg-white/80 transition-all duration-300 z-[999] shadow-[0_5px_15px_-3px_rgba(0,0,0,0.3)]",
            {
              "opacity-100": isMenu,
              "opacity-0 pointer-events-none": !isMenu,
            }
          )}
        >
          <button
            onClick={() => {
              setaddTaskModal(true);
              setIsMenu(!isMenu);
            }}
            type="button"
            tabIndex={0}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light w-full flex items-center gap-x-2 px-2"
          >
            <Add size={18} />
            <span>Add Task</span>
          </button>
        </div>
        {/* Create Task Modal */}
        <AssignTask projectid={projectid} />
      </div>
    </>
  );
};

export default TaskSesion;
