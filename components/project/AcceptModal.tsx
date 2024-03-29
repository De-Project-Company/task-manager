"use client";

import React, { useState, useEffect } from "react";
import { useStateCtx } from "@/context/StateCtx";
import { cn, encryptString } from "@/utils";
import { X } from "lucide-react";
import { ProjectProps } from "@/types";
import { getPojectdetails } from "@/actions/project";
import Link from "next/link";
import { acceptInvite } from "@/actions/invite";
import { useRouter } from "next/navigation";
import { useProjectCtx } from "@/context/Projectctx";
import { Skeleton } from "../ui/Skeleton";
import { getProject } from "@/actions/project";

const AcceptModal = () => {
  const { InviteModal, setInviteModal } = useStateCtx();
  const { selectedProject, setSelectedProject, setProject } = useProjectCtx();
  const [inviteAccepted, setInviteAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAcceptInvite = async () => {
    setLoading(true);
    setError(" ");
    const response = await acceptInvite(selectedProject);
    if (response?.success) {
      setLoading(false);
      setInviteAccepted(true);
      setError("");
      getProject()
        .then((res) => {
          setProject(res?.project);
        })
        .catch((error) => {
          console.error(
            "An error occurred while fetching project details:",
            error
          );
        });
    } else {
      setLoading(false);
      setInviteAccepted(false);
      setError(response?.error);
    }
  };

  const [projectData, setProjectData] = useState<ProjectProps | null>(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setisLoading(true);
      try {
        const project = await getPojectdetails(selectedProject);

        if (project?.status === "success") {
          setProjectData(project.project);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching project details:",
          error
        );
      } finally {
        setisLoading(false);
      }
    };

    if (selectedProject || InviteModal) {
      fetchProjectDetails();
    }
  }, [selectedProject, InviteModal]);

  let encryptTitle = "";
  if (projectData?.title) {
    encryptTitle = encryptString(projectData?.title!);
  }

  const handleClick = () => {
    setProjectData(null);
    setSelectedProject("");
  };

  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/10  top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
          InviteModal ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={handleClick}
      />
      <div
        role="dialog"
        aria-labelledby="accept-Invite"
        className={cn(
          "py-6   flex flex-col max-[350px]:h-[410px] w-[90%] h-[450px] min-[550px]:w-[500px] md:w-[682px] md:h-[450px] items-center bg-white dark:bg-primary  fixed top-1/2 left-1/2  z-[999]  transition-all opacity-0 select-none  -translate-y-1/2 -translate-x-1/2",
          InviteModal
            ? "scale-100 duration-500 opacity-100 rounded-xl md:rounded-2xl"
            : "scale-0 duration-200 pointer-events-none",
          inviteAccepted ? "h-full" : ""
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] dark:border-primary-light pb-4 pl-4 px-4 md:pl-8 ">
          {isLoading ? (
            <Skeleton className="h-4 w-[250px]" />
          ) : (
            <h3 className="text-sm min-[450px]:text-lg md:text-2xl font-medium text-header dark:text-gray-100">
              Accept{" "}
              <span className="font-medium lg:font-bold">
                {projectData?.title}?
              </span>
            </h3>
          )}

          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={handleClick}
            className="text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full dark:text-red-500"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex w-full  pt-8  flex-col gap-y-4 ">
          <p className="text-sm md:text-base px-4 flex">
            <span className="font-medium dark:text-gray-100">
              Project Title:{" "}
              <span className="dark:text-gray-100">{projectData?.title}</span>
            </span>

            {isLoading && <Skeleton className="h-4 w-[250px] ml-2" />}
          </p>
          <p className="text-sm md:text-base px-4 flex">
            <span className="font-medium dark:text-gray-100">
              Project Status:{" "}
              <span
                className={cn("font-medium  capitalize text-sm", {
                  "text-[#eea300] ": projectData?.status === "in-progress",
                  "text-[#008d36] dark:text-[#0ce15d] ":
                    projectData?.status === "completed",
                  "text-primary dark:text-color-dark":
                    projectData?.status === "to-do",
                })}
              >
                {projectData?.status!.replace("-", " ")}
              </span>
            </span>

            {isLoading && <Skeleton className="h-4 w-[250px] ml-2" />}
          </p>
          <p className="text-sm md:text-base px-4 flex">
            <span className="font-medium dark:text-gray-100">
              Project Description:{" "}
              <span className="dark:text-gray-200">
                {projectData?.description}
              </span>
            </span>
            {isLoading && <Skeleton className="h-4 w-[250px] ml-2" />}
          </p>
        </div>
        <p className="text-center text-sm md:text-base px-4 dark:text-gray-300 pt-3">
          By accepting this invite from{" "}
          {projectData?.owner?.name ? (
            <span className="font-semibold">{projectData?.owner?.name}</span>
          ) : (
            "this project"
          )}{" "}
          you agree to be a team member and must abide by the rules set by{" "}
          {projectData?.owner?.name} and{" "}
          <span className="font-semibold">Traverse</span> on project management.
          <br />
          <Link href="" className="text-primary hover:underline">
            Read more about the terms and conditions
          </Link>
        </p>
        {error && (
          <div className="bg-rose-700/10 p-3 rounded-md flex  items-center gap-x-2 text-sm text-rose-600 mt-3">
            {error}
          </div>
        )}
        {!inviteAccepted && (
          <>
            <div className="flex w-full gap-x-4 items-center justify-center sm:justify-between sm:px-8 [&>*]:font-semibold pt-4">
              <button
                type="button"
                tabIndex={0}
                aria-label="accept"
                onClick={handleAcceptInvite}
                className={cn(
                  "rounded-lg border border-primary text-primary min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-color-dark dark:border-color-dark"
                )}
              >
                {loading
                  ? "Please wait..."
                  : error
                  ? "Try again"
                  : "Accept Invite"}
              </button>
              <button
                type="button"
                tabIndex={0}
                aria-label="Decline"
                onClick={() => setInviteModal(false)}
                className={cn(
                  "rounded-lg bg-[#e80000] text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e80000]"
                )}
              >
                No, Decline
              </button>
            </div>
          </>
        )}

        {inviteAccepted && (
          <div className="flex w-full items-center justify-center pt-8 gap-x-4">
            <Link
              href={`/projects/details?_id=${projectData?._id}&project_title=${encryptTitle}`}
              onClick={() => setInviteModal(false)}
              type="button"
              tabIndex={0}
              aria-label="Close"
              className={cn(
                "rounded-lg border border-primary text-center text-primary w-[178px] min-[450px]:h-[56px] h-[40px] py-3  text-lg hover:opacity-80 transition-opacity duration-300 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-color-dark dark:border-color-dark"
              )}
            >
              View Project
            </Link>
            <div className="bg-emerald-700/10 p-3 rounded-md flex  items-center gap-x-2 text-sm text-emerald-700">
              Invite accepted successfully!
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AcceptModal;
