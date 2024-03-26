"use client";

import React, { useEffect, useState } from "react";
import { useStateCtx } from "@/context/StateCtx";
import AssignTask from "./addTaskMoal";
import { cn } from "@/utils";
import { Add } from "iconsax-react";
import { Accordion } from "@/components/ui/accordion";
import SingleTask from "./SingleTask";
import { Owner } from "@/types";
import { useUserCtx } from "@/context/UserCtx";

interface User {
  _id: string;
  name: string;
  email: string;
  companyName: string;
  role: string;
  createdAt: string;
  __v: number;
}

interface UserWithRole {
  user: User;
  role: string;
  accepted: boolean;
  _id: string;
}

export interface TeamMember {
  user: string;
  role: string;
  accepted: boolean;
  _id: string;
  name: string;
}
interface Task {
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  status: string;
  _id: string;
}
interface TasksessionProp {
  projectid?: string;
  tasks?: Task[];
  teamMembers?: UserWithRole[];
  owner?: Owner;
}

const TaskSesion = ({
  projectid,
  tasks,
  teamMembers,
  owner,
}: TasksessionProp) => {
  const [isMenu, setIsMenu] = useState(false);
  const { setaddTaskModal } = useStateCtx();
  const { user } = useUserCtx();
  const admin = teamMembers?.find((member) => member.user._id === owner?._id);
  const isNotAdmin = admin?.user._id !== user?.id;

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

  // console.log(tasks);

  return (
    <>
      <div
        className={cn(
          "flex flex-col w-full px-3 py-6 sm:rounded-xl  relative mt-12"
        )}
      >
        <div className="flex w-full items-center justify-between pb-2 md:pb-3">
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
            className={cn(
              "text-primary dark:text-white rotate-90 h-6 w-6 rounded-full border border-[#090909] flex items-center justify-center",
              isNotAdmin ? "hidden" : "block"
            )}
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
          aria-labelledby="add-task"
          className={cn(
            "flex w-[190px] h-[56px]  px-4 py-2 absolute right-2 top-[3.5rem] rounded-lg justify-center  border border-gray-200 backdrop-blur-xl bg-white/80 dark:bg-primary dark:border-purple-600 transition-all duration-300 z-[999] shadow-[0_5px_15px_-3px_rgba(0,0,0,0.3)]",
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
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 text-black dark:text-white w-full flex items-center gap-x-2 px-2"
          >
            <Add size={18} />
            <span>Add Task</span>
          </button>
        </div>

        {tasks && tasks.length > 0 ? (
          <Accordion
            type="multiple"
            // type="single" collapsible
            className="w-full"
          >
            {tasks &&
              tasks?.map((task) => (
                <SingleTask
                  key={task?._id}
                  task={task}
                  projectid={projectid}
                  teamMembers={teamMembers}
                />
              ))}
          </Accordion>
        ) : (
          <p className="w-full text-center  dark:text-gray-200">
            No Tasks Assigned yet.
          </p>
        )}

        {/* Create Task Modal */}
        <AssignTask projectid={projectid} />
      </div>
    </>
  );
};

export default TaskSesion;
