import React, { useState, useRef, useEffect } from "react";
import { ProjectProps } from "@/types";
import Image from "next/image";
// import { useProjectCtx } from "@/context/Projectctx";
import { encryptString } from "@/utils";
import { useRouter } from "next/navigation";

interface ProjectTableProps {
  projects: ProjectProps[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  // State variable to track whether the options menu is open or closed
  const [isOptionsMenuOpen, setOptionsMenuOpen] = useState<boolean>(false);
  // // State variable to store the member names
  // const [memberNames, setMemberNames] = useState<string[]>([]);
  // State variable to keep track of the selected project
  // const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);
  // Reference to the ellipses button
  // const ellipsesRef = useRef<HTMLButtonElement>(null);
  // Destructure the project context
  // const { Project } = useProjectCtx();
  // // useRouter hook
  const router = useRouter();
  // console.log(memberNames);
  // // Update the member names whenever Project context changes
  // useEffect(() => {
  //   if (Array.isArray(Project)) {
  //     const allTeamMembers = Project.flatMap((project) => project.teamMembers || []);
  //     const names = allTeamMembers.map((member) => member.user?.name).filter(Boolean);
  //     setMemberNames(names);
  //   }
  // }, [Project]);

  // Function to handle ellipses,  click and open the options menu
  const handleEllipsesClick = (project: ProjectProps) => {
    // setSelectedProject(project);
    setOptionsMenuOpen(true);
  };

  const handleRowClick = (
    project: ProjectProps,
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
  ) => {
    // need to check if the clicked element is the input or the <p> element
    const tagName = (event.target as HTMLElement).tagName.toLowerCase();
    if (tagName === "input" || tagName === "p") {
      // Allow default behavior for clicks on the input or the <p> element
      return;
    }

    // i had to check if the title is defined before passing it to encryptString bcos of typecript error of unsure type
    const title = project.title || ""; // Default to empty string if title is undefined
    // Perform routing with the title
    router.push(
      `/projects/details?_id=${project._id}&project_title=${encryptString(
        title
      )}`
    );
  };

  // Function to handle closing the options menu
  const handleCloseOptions = () => {
    setOptionsMenuOpen(false);
  };

  return (
    <div className="overflow-x-auto relative">
      <table className="table-auto min-w-full">
        <thead>
          <tr className="">
            <th className="px-4 py-2 text-[#68738D] font-inter text-base font-normal leading-5 text-left">
              All
            </th>
            <th className=" px-4 py-2 text-[#68738D] font-inter text-base font-normal leading-5 text-left">
              Project Name
            </th>
            <th className="px-4 py-2 text-[#68738D] font-inter text-base font-normal leading-5 text-left">
              Timeframe
            </th>
            <th className="px-4 py-2 text-[#68738D] font-inter text-base font-normal leading-5 text-left">
              Milestone
            </th>
            <th className="px-4 py-2 text-[#68738D] font-inter text-base font-normal leading-5 text-left">
              Status
            </th>
            <th className="px-4 py-2 text-[#68738D] font-inter text-base font-normal leading-5 text-left">
              Team Member
            </th>
            <th className="px-4 py-2 text-[#68738D] font-inter text-base font-normal leading-5 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project._id}
              className="font-inter text-sm font-normal leading-5 text-left text-[#091228] hover:bg-slate-300"
              onClick={(event) => handleRowClick(project, event)}
            >
              <td className="border px-4 py-2 ">
                <input
                  type="checkbox"
                  id="checkboxInput"
                  className="h-4 w-4 bg-blue-600"
                />
              </td>
              <td className="border px-4 py-2 cursor-pointer ">{project.title}</td>
              <td className="border px-4 py-2">
                {project.duration
                  ? `${Math.ceil(project.duration / 7)} week(s)`
                  : "Duration is Not Available"}
              </td>
              <td className="border px-4 py-2">
                {project.description
                  ? project.description.split(" ").slice(0, 3).join(" ") + "..."
                  : ""}
              </td>
              <td className="border px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-[5px] text-[black] ${
                    project.status === "completed"
                      ? "bg-[#C7C4FD]"
                      : project.status === "in-progress"
                      ? "bg-[#C9EBCB]"
                      : "bg-[#FFE4C0]"
                  }`}
                >
                  {project.status}
                </span>
              </td>
              <td className="border px-4 py-2">
                <div className="flex">
                  {project.teamMembers &&
                    project.teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="mr-[-7px] border-white border-2 rounded-full"
                        title={member.user.name}
                      >
                        <Image
                          src={`https://ui-avatars.com/api/?name=${member.user.name}&background=random`}
                          alt={member.user.name}
                          width={20}
                          height={20}
                          className="rounded-full "
                        />
                      </div>
                    ))}
                </div>
              </td>
              <td className="border px-4 py-2 ">
                <button
                  // ref={ellipsesRef}
                  className="focus:outline-none"
                  onClick={() => handleEllipsesClick(project)}
                >
                  <p className=" font-medium text-[10px] border border-grey-300 px-[5px] items-center">
                    ...
                  </p>
                </button>
              </td>
            </tr>
          ))}
          {isOptionsMenuOpen && (
            <div className="absolute top-0 right-[-1px] ml-[10px]">
              <div className="bg-white shadow-md rounded-md p-2">
                <button
                  type="button"
                  className=" space-x-1 flex items-center  w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleCloseOptions()}
                >
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.3335 5.66669L4.00016 8.33335L10.6668 1.66669"
                      stroke="#091228"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Edit
                </button>
                <button
                  type="button"
                  className="flex space-x-1 items-center w-full text-left py-2 px-4 text-sm text-[#E2341D] hover:bg-gray-100"
                  onClick={() => handleCloseOptions()}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L12 4M4 4L12 12"
                      stroke="#F04438"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
