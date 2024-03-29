"use client";

import { useEffect, useState } from "react";
import { useUserCtx } from "@/context/UserCtx";
import Image from "next/image";
import { FaBriefcase } from "react-icons/fa";
import { ProjectProps } from "@/types";
import { getPojectdetails } from "@/actions/project";
import { Edit2, More, Trash, Status } from "iconsax-react";
import TeamSection from "./TeamMembers";
import { cn, daysToHours, calculateCountdown } from "@/utils";
import useCountdown from "@/hooks/useCountdown";
import DeletePojectModal from "./DeletePojectModal";
import { useStateCtx } from "@/context/StateCtx";
import ChangeProjectStatus from "./ChangeStatusModal";
import ProjectComments from "./coment";
import TaskSesion from "./TaskSesion";

const DetailsContainer = ({ title, id }: { title?: string; id?: string }) => {
  const { user } = useUserCtx();
  const {
    DeleteProjectModal,
    setDeleteProjectModal,
    setChangeProjectStatusModal,
  } = useStateCtx();

  const [projectData, setProjectData] = useState<ProjectProps | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const project = await getPojectdetails(id!);
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

    fetchProjectDetails();
  }, [id]);

  const admin = projectData?.teamMembers?.find(
    (member) => member.user._id === projectData?.owner?._id
  );
  const isNotAdmin = admin?.user._id !== user?.id;

  const fullName = user?.name;
  const [firstName] = fullName!.split(/\s+/);
  const countDownTIme = useCountdown(projectData?.endDate!);
  const [isDotMenu, setIsDotMenu] = useState(false);

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

        {/* project decription section */}
        <div className="projectDesc mt-12 bg-[#F9F9F9] px-4 py-3 border border-neutral-100  rounded-lg shadow-sm">
          <div className="flex justify-between items-center my-2">
            <div className="flex space-x-2 items-center">
              <div className=" bg-[#ECEBFF] h-10 w-10 rounded-full flex items-center justify-center">
                <FaBriefcase />
              </div>
              <h5 className="font-bold text-primary text-xl items-center ">
                {title}
              </h5>
            </div>

            <button
              type="button"
              id="dot-menu"
              tabIndex={0}
              aria-haspopup
              aria-expanded={isDotMenu}
              onClick={() => setIsDotMenu((prev) => !prev)}
              className={cn(
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rotate-90 text-header",
                isNotAdmin ? "hidden" : "block"
              )}
            >
              <More />
            </button>
          </div>
          {/* DOT Menu */}
          <div
            className={cn(
              "fixed min-h-screen w-full bg-black/0 top-0 left-0 z-[99] transition-all duration-300",
              isDotMenu ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setIsDotMenu(false)}
          />
          <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="dot-menu"
            className={cn(
              "flex w-[190px] h-[106px] flex-col px-4 py-2 absolute right-4  rounded-lg justify-center gap-y-4 border border-gray-200 dark:border-primary backdrop-blur-xl bg-white/80 dark:bg-primary transition-all duration-300 z-[999]",
              {
                "opacity-100": isDotMenu,
                "opacity-0 pointer-events-none": !isDotMenu,
              }
            )}
          >
            <button
              onClick={() => {
                setChangeProjectStatusModal(true);
                setIsDotMenu(!isDotMenu);
              }}
              type="button"
              tabIndex={0}
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40 w-full flex items-center gap-x-2 px-2 text-header dark:text-gray-200"
            >
              <Status size={18} />
              <span>Change Status</span>
            </button>

            <button
              onClick={() => {
                setDeleteProjectModal(true);
                setIsDotMenu(!isDotMenu);
              }}
              type="button"
              tabIndex={0}
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40 w-full flex items-center gap-x-2 px-2 text-header dark:text-gray-200"
            >
              <Trash size={18} />
              <span>Delete Project</span>
            </button>
          </div>

          <div>
            <p className="text-[#151B28] font-light">
              {projectData?.description}
            </p>
          </div>
        </div>

        {/* Projects Images */}
        <div className="grid md:grid-cols-2 gap-4 ">
          <div className="projectDesc mt-12 bg-[#F9F9F9] px-4 py-5 border border-neutral-100  rounded-lg shadow-sm">
            <div className="flex justify-between items-center my-5">
              <div className="flex space-x-2 items-center">
                <div className=" bg-[#ECEBFF] h-10 w-10 rounded-full flex items-center justify-center">
                  <FaBriefcase />
                </div>
                <h5 className="font-bold text-primary text-xl items-center ">
                  Project Images
                </h5>
              </div>

              <p className="block text-primary font-medium hover:font-bold cursor-pointer text-xs md:text-sm">
                See More
              </p>
            </div>

            {/* Images section */}
            <div className="grid grid-cols-3 gap-2 overflow-hidden">
              {[1, 2, 3].map((index) => (
                <div key={index} className="h-[140.69px] w-[167px] relative ">
                  <Image
                    key={index}
                    src="/assets/screenshot/screenshot_showcase.png"
                    height={400}
                    width={400}
                    alt="Project Images"
                    className="h-full w-full object-fit "
                  />
                </div>
              ))}
            </div>
          </div>

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
          />
          {/* Projects Comment Section */}
          <ProjectComments projectId={id!} />
        </div>
      </div>
    </>
  );
};

export default DetailsContainer;
