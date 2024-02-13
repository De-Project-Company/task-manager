"use client";

import React, {
  SetStateAction,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { ProjectProps } from "@/types";
import { getProject } from "@/actions/project";

// Add Your Props here
interface ProjectContextProps {
  Project: ProjectProps;
  setProject: React.Dispatch<SetStateAction<ProjectProps>>;
}

export const ProjectContext = createContext({} as ProjectContextProps);

const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Add Your State(s) Here
  const [Project, setProject] = useState<ProjectProps>({
    _id: "",
    title: "",
    status: "to-do",
    endDate: "",
    owner: [],
    description: "",
    price: 0,
    duration: 0,
    teamMembers: [],
    tasks: [],
  });

  useLayoutEffect(() => {
    const fetchData = async () => {
      const res = await getProject();

      if (res?.status === "success") {
        console.log(res.project);
        setProject({
          _id: res.project._id,
          title: res.project.title,
          status: res.project.status,
          description: res.project.description,
          owner: res.project.owner,
          endDate: res.project.endDate,
          price: res.project.price,
          duration: res.project.duration,
          teamMembers: res.project.teamMembers,
          tasks: res.project.tasks,
        });
      } else {
        console.error(res?.error);
      }
    };

    fetchData();
  }, []);

  const value = useMemo(() => ({ Project, setProject }), [Project]); //

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

// Call this function whenever you want to use the context
export const useProjectCtx = () => {
  const ctx = useContext(ProjectContext);

  if (!ctx) {
    throw new Error(
      "useProjectCtx must be used within a ProjectContextProvider"
    );
  }
  return ctx;
};

export default ProjectContextProvider;
