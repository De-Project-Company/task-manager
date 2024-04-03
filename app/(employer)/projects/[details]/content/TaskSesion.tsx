"use client";

import React, { useEffect, useState } from "react";
import { useStateCtx } from "@/context/StateCtx";
import AssignTask from "./addTaskMoal";
import { cn, encryptString } from "@/utils";
import { Add } from "iconsax-react";
import { Accordion } from "@/components/ui/accordion";
import SingleTask from "./SingleTask";
import { Owner } from "@/types";
import Link from "next/link";
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

export interface UserWithRole {
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
  endDate?: string;
  title?: string;
}

const TaskSesion = ({
  projectid,
  tasks,
  teamMembers,
  owner,
  endDate,
  title,
}: TasksessionProp) => {
  const { user } = useUserCtx();
  const admin = teamMembers?.find((member) => member.user._id === owner?._id);
  const isNotAdmin = admin?.user._id !== user?.id;

  const teamMembersJSON = JSON.stringify(teamMembers);

  console.log(tasks);

  const encryptTitle = title ? encryptString(title as string) : "";
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
          <Link
            href={`/projects/task?id=${projectid}&project_title=${encryptTitle}`}
            onClick={() => {
              window?.localStorage.setItem("teamMembers", teamMembersJSON);
            }}
            className={cn(
              "text-primary dark:text-white rotate-90 h-6 w-6 rounded-full border border-[#090909] flex items-center justify-center",
              isNotAdmin ? "hidden" : "block"
            )}
          >
            <Add size={24} />
          </Link>
        </div>

        {tasks && tasks.length > 0 ? (
          <Accordion type="multiple" className="w-full">
            {tasks &&
              tasks?.map((task) => (
                <SingleTask
                  key={task?._id}
                  task={task}
                  projectid={projectid}
                  teamMembers={teamMembers}
                  owner={owner}
                />
              ))}
          </Accordion>
        ) : (
          <p className="w-full text-center  dark:text-gray-200">
            No Tasks Assigned yet.
          </p>
        )}
      </div>
    </>
  );
};

export default TaskSesion;
