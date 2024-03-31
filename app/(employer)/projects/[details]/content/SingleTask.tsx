"use client";

import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageEdit, Trash } from "iconsax-react";
import ChangeTaskStatus from "./TaskStatus";
import { useStateCtx } from "@/context/StateCtx";
import { Owner } from "@/types";
import { cn } from "@/utils";
import { useProjectCtx } from "@/context/Projectctx";

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
  task?: Task;
  teamMembers?: UserWithRole[];
  owner?: Owner;
}

const SingleTask = ({
  projectid,
  task,
  teamMembers,
  owner,
}: TasksessionProp) => {
  const { setChangeTaskStatusModal } = useStateCtx();
  const { setSelectedTask } = useProjectCtx();
  const taskOwner = teamMembers?.find(
    (member) => member.user._id === task?.assignedTo
  );
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const DueDate = new Date(task?.dueDate!);
  const formattedDate = new Intl.DateTimeFormat("en-NG", options).format(
    DueDate
  );

  const handleEditButtonClick = (taskId: string) => {
    setSelectedTask(taskId);
    setChangeTaskStatusModal(true);
  };

  return (
    <>
      <AccordionItem value={task?._id!}>
        <AccordionTrigger>{task?.title}</AccordionTrigger>
        <AccordionContent>
          <div className="transition-all duration-500 text-sm font-medium">
            <div className="flex items-center justify-between py-[18px] border-b border-[#E1E1E1] leading-6 font-medium">
              <div className="flex items-center gap-x-4 text-header dark:text-gray-200">
                <p>Assignee: {taskOwner?.user.name}</p>
                <p className="text-xs text-header dark:text-gray-200 font-normal">
                  Due Date: {formattedDate}
                </p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  className="flex items-center gap-x-2 text-header dark:text-[#23a8d4]"
                  onClick={() => handleEditButtonClick(task?._id!)}
                >
                  <MessageEdit />
                  <span>Edit</span>
                </button>
                {/* <button

                className="flex items-center gap-x-2 text-[#FF3333]"
              >
                <Trash color={"#FF3333"} variant="Bold" />
                <span>Delete</span>
              </button> */}
              </div>
            </div>
            <p className="py-4 text-justify text-header dark:text-gray-300">
              Description: {task?.description}
            </p>

            <p className="text-sm text-header dark:text-gray-200 flex items-center gap-x-1 xl:gap-x-2">
              Status:{" "}
              <span
                className={cn(
                  "relative w-[100px] min-[404px]:w-[130px] xl:w-[150px] h-[8px] border  rounded-md",
                  {
                    "border-[#eea300] ": task?.status === "InProgress",
                    "border-[#3182ce] ": task?.status === "InReview",
                    "border-[#008d36] ": task?.status === "Done",
                    "border-black/90 dark:border-gray-600/90 ":
                      task?.status === "Todo",
                  }
                )}
              >
                <span
                  className={cn(
                    "absolute h-full  bg-black rounded-md transition-all duration-1000",
                    {
                      "bg-[#eea300] w-1/2": task?.status === "InProgress",
                      "bg-[#3182ce] w-[75%]": task?.status === "InReview",
                      "bg-[#008d36] w-full": task?.status === "Done",
                      "bg-black/90 dark:bg-gray-500 w-[5%]":
                        task?.status === "Todo",
                    }
                  )}
                />
              </span>{" "}
              <span
                className={cn("text-[11px] xl:text-sm max-lg:text-sm", {
                  "max-[1158px]-[11px]": task?.status === "InProgress",
                })}
              >
                ({task?.status})
              </span>
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <ChangeTaskStatus
        projectid={projectid}
        owner={owner}
        prevStatus={task?.status}
      />
    </>
  );
};

export default SingleTask;
