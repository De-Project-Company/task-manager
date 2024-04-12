"use client";

import { Folder2 } from "iconsax-react";
import Link from "next/link";
import React from "react";
import { ProjectProps } from "@/types";
import useInView from "@/hooks/useInView";
import { cn } from "@/utils";
import { useProjectCtx } from "@/context/Projectctx";
import { encryptString } from "@/utils";
import { format } from "date-fns";
import { useUserCtx } from "@/context/UserCtx";
import { useStateCtx } from "@/context/StateCtx";
import AcceptModal from "../project/AcceptModal";

const ProjectCard = ({
  status,
  title,
  owner,
  endDate,
  _id,
  teamMembers,
}: ProjectProps) => {
  const projectCardRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView({ ref: projectCardRef });
  const { projectSearchTerm, setSelectedProject } = useProjectCtx();
  const { user } = useUserCtx();
  const { setInviteModal } = useStateCtx();

  const isProjectOwner = user.id === owner?._id;
  const desiredTeamMember = teamMembers?.find(
    (member) => member.user._id === user.id
  );

  const hasAccepted = isProjectOwner
    ? true
    : desiredTeamMember
    ? desiredTeamMember.accepted
    : false;

   const encryptTitle = encryptString(title!);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;

    const rect = target?.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty("--border--x", `${x}px`);
    target.style.setProperty("--border--y", `${y}px`);
  };

  const dateObject = new Date(endDate!);

  const formattedDate = format(dateObject, "dd-MM-yyyy");

  return (
    <>
      <div
        ref={projectCardRef}
        style={{
          transform: isInView ? "none" : "translateY(100px)",
          opacity: isInView ? 1 : 0,
          transition: "transform 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
        }}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-[454px] h-[261px]  flex items-center justify-center pb-1  p-[2px] border border-gray-300 dark:border-none dark:p-[3px] rounded-xl sm:rounded-2xl card"
      >
        <div className="card-border" />
        <div className="card-content w-full h-full flex flex-col items-start gap-y-4 bg-white dark:bg-primary min-[1310px]:p-4 max-[1140px]:p-4 p-1 pl-2 justify-center max-[360px]:[&>p]:text-[12px]">
          <Folder2 variant="Bulk" className="text-header dark:text-white" />
          <p className="text-sm text-header dark:text-gray-200">
            Project Title:{" "}
            <strong>
              <span
                dangerouslySetInnerHTML={{
                  __html: title!.replace(
                    new RegExp(`(${projectSearchTerm})`, "gi"),
                    (match, group) =>
                      `<span style="color: black; background-color: ${
                        group.toLowerCase() === projectSearchTerm.toLowerCase()
                          ? "yellow"
                          : "inherit"
                      }">${match}</span>`
                  ),
                }}
              />
              {/* <span>{title}</span> */}
            </strong>
          </p>
          <p className="text-sm text-header dark:text-gray-200 flex items-center gap-x-1 xl:gap-x-2">
            Project Status:{" "}
            <span
              className={cn(
                "relative w-[100px] min-[404px]:w-[130px] xl:w-[150px] h-[8px] border  rounded-md",
                {
                  "border-[#eea300] ": status === "in-progress",
                  "border-[#008d36] ": status === "completed",
                  "border-black/90 dark:border-gray-600/90 ":
                    status === "to-do",
                }
              )}
            >
              <span
                className={cn(
                  "absolute h-full  bg-black rounded-md transition-all duration-1000",
                  {
                    "bg-[#eea300] w-1/2": status === "in-progress",
                    "bg-[#008d36] w-full": status === "completed",
                    "bg-black/90 dark:bg-gray-500 w-[5%]": status === "to-do",
                  }
                )}
              />
            </span>{" "}
            <span
              className={cn("text-[11px] xl:text-sm max-lg:text-sm", {
                "max-[1158px]-[11px]": status === "in-progress",
              })}
            >
              ({status})
            </span>
          </p>
          <p className="text-sm text-header dark:text-gray-200">
            Project Owner: <strong>{owner?.name}</strong>
            <Link href="" className="text-primary-light dark:text-[#34bae7]">
              (View Profile)
            </Link>
          </p>
          <p className="text-sm text-header dark:text-gray-200">
            Project end date: <strong>{formattedDate}</strong>
          </p>
         
                    <Link
              href={`/projects/details?_id=${_id}&project_title=${encryptTitle}`}
              type="button"
              tabIndex={0}
              className="text-primary dark:text-white dark:border-white border-primary rounded-lg border h-[32px] px-4 py-2 flex items-center font-medium hover:opacity-70 transition-all duration-300"
            >
              View more
            </Link>
        </div>
      </div>
      <AcceptModal />
    </>
  );
};

export default ProjectCard;
