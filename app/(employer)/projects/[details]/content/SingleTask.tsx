"use client";

import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Add,
  ArrowDown2,
  ArrowRight2,
  AttachSquare,
  MessageEdit,
  Trash,
} from "iconsax-react";
import Image from "next/image";

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
}

const SingleTask = ({ projectid, task, teamMembers }: TasksessionProp) => {
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

  //   console.log(taskOwner);
  return (
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
              <button className="flex items-center gap-x-2 text-header dark:text-[#23a8d4]">
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
            {task?.description}
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default SingleTask;
