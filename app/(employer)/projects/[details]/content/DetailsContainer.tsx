"use client";

import { useEffect, useState } from "react";
import { useUserCtx } from "@/context/UserCtx";
import { ProjectProps } from "@/types";
import { getPojectdetails } from "@/actions/project";
import TeamSection from "./TeamMembers";
import { cn } from "@/utils";
import useCountdown from "@/hooks/useCountdown";
import DeletePojectModal from "./DeletePojectModal";
import { useStateCtx } from "@/context/StateCtx";
import ChangeProjectStatus from "./ChangeStatusModal";
import ProjectComments from "./coment";
import TaskSesion from "./TaskSesion";
import ProjectDoc from "./Doc";
import { useProjectCtx } from "@/context/Projectctx";
import ProjectImage from "./ProjectImage";
import ProjectDesroption from "./ProjectDesroption";
import ProjectDocument from "./ProjectDoc";

const DetailsContainer = ({ title, id }: { title?: string; id?: string }) => {
  const { user } = useUserCtx();
  const {
    DeleteProjectModal,
    setDeleteProjectModal,
    setChangeProjectStatusModal,
  } = useStateCtx();
  const { setUpdate, Update } = useProjectCtx();

  const [projectData, setProjectData] = useState<ProjectProps | null>(null);

  const fetchProjectDetails = async () => {
    try {
      const project = await getPojectdetails(id!);
      if (project?.status === "success") {
        setProjectData(project.project);
        setUpdate(false);
      }
    } catch (error) {
      console.error("An error occurred while fetching project details:", error);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  useEffect(() => {
    if (Update) {
      fetchProjectDetails();
    }
  }, [Update]);

  const fullName = user?.name;
  const [firstName] = fullName!.split(/\s+/);
  const countDownTIme = useCountdown(projectData?.endDate!);
  const [isDotMenu, setIsDotMenu] = useState(false);

  const [projectFiles, setProjectFiles] = useState(true);

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

  const docs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <DeletePojectModal
        project={projectData!}
        openModal={DeleteProjectModal}
        setOpenModal={setDeleteProjectModal}
      />
      <ChangeProjectStatus projectid={projectData?._id} />
      <div className="wrap py-4 px-3 md:px-9 ">
        <div className="top flex md:w-full relative justify-between items-center h-16">
          <div className="wrapper">
            <h1 className="font-bold text-primary text-3xl dark:text-white">
              {title}
            </h1>
            <p className="text-xs text-neutraly w-4/5 relative md:w-full">
              How are you doing today {firstName}
            </p>
          </div>
          <div className={cn("timmer")}>
            {Object.entries(countDownTIme).map(([unit, value]) => (
              <span
                className={cn(
                  "inline-block",
                  "mr-1",
                  value === 1 && unit === "days"
                    ? "bg-red-500"
                    : "bg-[#ECEBFF]",
                  "text-primary",
                  "py-1",
                  "px-2",
                  "rounded-lg",
                  "timmer-number",
                  "font-bold"
                )}
                key={unit}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
        <div className="below flex space-x-2 mt-2">
          <span
            className={cn(
              "block py-1 px-2 w-fit rounded-full text-white text-xs md:text-sm md:px-3",
              {
                "bg-[#eea300] ": projectData?.status === "in-progress",
                "bg-[#008d36] ": projectData?.status === "completed",
                "bg-black/90 ": projectData?.status === "to-do",
              }
            )}
          >
            {projectData?.status}
          </span>
          <span className="block py-1 px-2 bg-[#EAEBF0] text-neutraly w-fit rounded-full text-xs md:text-sm">
            {/* {hours}hrs */}
            {projectData?.duration
              ? `${Math.ceil(projectData?.duration / 7)} week${
                  Math.ceil(projectData?.duration / 7) !== 1 ? "s" : ""
                }`
              : "Duration is Not Available"}
          </span>
        </div>

        <ProjectDesroption {...projectData} />

        {/* Projects Images */}
        {/* <ProjectImage /> */}

        {/* Project Documents */}
        <ProjectDocument projectId={id!} />

        <div className="grid md:grid-cols-2 gap-4 ">
          {/* Projects Team members */}
          <TeamSection
            projectid={id}
            teamMembers={projectData?.teamMembers}
            owner={projectData?.owner}
          />

          {/* Projects Task Section */}
          <TaskSesion
            projectid={id!}
            tasks={projectData?.tasks}
            teamMembers={projectData?.teamMembers}
            owner={projectData?.owner}
            endDate={projectData?.endDate}
            title={projectData?.title}
          />
          {/* Projects Comment Section */}
          <ProjectComments projectId={id!} />
        </div>
      </div>
    </>
  );
};

export default DetailsContainer;
