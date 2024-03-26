"use client";

import React, { useState, useEffect } from "react";
import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { decryptString } from "@/utils";
import { ProjectProps } from "@/types";
import { getPojectdetails } from "@/actions/project";
import Link from "next/link";
import { acceptInvite } from "@/actions/invite";

const AcceptModal = () => {
  const { InviteModal, setInviteModal } = useStateCtx();
  const searchParams = useSearchParams();
  const projectTitle = searchParams.get("project_title");
  const [inviteAccepted, setInviteAccepted] = useState(false);
  const projctId = searchParams.get("id");
  let title = "";
  if (projectTitle) {
    title = decryptString(projectTitle);
  }
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAcceptInvite = async () => {
    setLoading(true);
    const response = await acceptInvite(projctId!);
    if (response?.success) {
      setLoading(false);
      setInviteAccepted(true);
      setError("");
    } else {
      setLoading(false);
      setInviteAccepted(false);
      setError(response?.error || "An error occurred. Please try again.");
    }
  };

  const [projectData, setProjectData] = useState<ProjectProps | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const project = await getPojectdetails(projctId!);
        // console.log(project);
        if (project?.status === "success") {
          setProjectData(project.project);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching project details:",
          error
        );
      }
    };

    if (projctId || InviteModal) {
      fetchProjectDetails();
    }
  }, [projctId, InviteModal]);

  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40  top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
          InviteModal ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setInviteModal(false)}
      />
      <div
        role="dialog"
        aria-labelledby="accept-Invite"
        className={cn(
          "py-6   flex flex-col max-[350px]:h-[410px] w-[90%] h-[450px] min-[550px]:w-[500px] md:w-[682px] md:h-[450px] items-center bg-white dark:bg-primary  fixed top-1/2 left-1/2  z-[999]  transition-all opacity-0 select-none  -translate-y-1/2 -translate-x-1/2",
          InviteModal
            ? "scale-100 duration-500 opacity-100 rounded-xl md:rounded-2xl"
            : "scale-0 duration-200 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] dark:border-primary-light pb-4 pl-4 px-4 md:pl-8 ">
          <h3 className="text-sm min-[450px]:text-lg md:text-2xl font-medium text-header dark:text-gray-100">
            Accept{" "}
            <span className="font-medium lg:font-bold">
              {title ?? "Project"}?
            </span>
          </h3>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => setInviteModal(false)}
            className="text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full dark:text-red-500"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex w-full  pt-8  flex-col gap-y-4 ">
          <p className="text-sm md:text-base px-4">
            <span className="font-medium dark:text-gray-100">
              Project Title:
            </span>{" "}
            <span className="dark:text-gray-100">{projectData?.title}</span>
          </p>
          <p className="text-sm md:text-base px-4">
            <span className="font-medium dark:text-gray-100">
              Project Status:{" "}
            </span>
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
          </p>
          <p className="text-sm md:text-base px-4 ">
            <span className="font-medium dark:text-gray-100">
              Milestone Description:
            </span>{" "}
            <span className="dark:text-gray-200">
              {projectData?.description}
            </span>
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
          <div className="flex flex-col w-full items-center justify-center pt-8">
            <div className="bg-emerald-700/10 p-3 rounded-md flex  items-center gap-x-2 text-sm text-emerald-700">
              Invite accepted successfully!
            </div>
            <button
              onClick={() => setInviteModal(false)}
              type="button"
              tabIndex={0}
              aria-label="Close"
              className={cn(
                "rounded-lg border border-primary text-primary w-[178px] min-[450px]:h-[56px] h-[40px] px-2  text-lg hover:opacity-80 transition-opacity duration-300 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary dark:text-color-dark dark:border-color-dark"
              )}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AcceptModal;
