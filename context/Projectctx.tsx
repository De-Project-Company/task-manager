"use client";

import React, {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { ProjectProps } from "@/types";
import { getProject } from "@/actions/project";

// Add Your Props here
interface ProjectContextProps {
  Project: ProjectProps[];
  setProject: React.Dispatch<SetStateAction<ProjectProps[]>>;
  selectedProjectFilter: string;
  setSelectedProjectFilter: React.Dispatch<React.SetStateAction<string>>;
  projectSearchTerm: string;
  setProjectSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  projectCount: number;
}

export const ProjectContext = createContext({} as ProjectContextProps);

const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Add Your State(s) Here
  const [Project, setProject] = useState<ProjectProps[]>([]);
  const [selectedProjectFilter, setSelectedProjectFilter] = useState("");
  const [projectSearchTerm, setProjectSearchTerm] = useState("");
  const [projectCount, setprojectCount] = useState(0);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const res = await getProject();

      if (res?.status === "success") {
        setProject(res.project);
        setprojectCount(res.count);
      } else {
        console.error(res?.error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const projectFilter = localStorage.getItem("project-filter");
    if (!projectFilter) {
      setSelectedProjectFilter("all");
      return;
    }
    if (projectFilter) {
      setSelectedProjectFilter(projectFilter);
      return;
    }
  }, []);

  useEffect(() => {
    if (selectedProjectFilter === "") return;

    // localStorage.setItem("project-filter", selectedProjectFilter);
  }, [selectedProjectFilter]);

  const value = useMemo(
    () => ({
      Project,
      setProject,
      selectedProjectFilter,
      setSelectedProjectFilter,
      projectSearchTerm,
      setProjectSearchTerm,
      projectCount,
    }),
    [Project, selectedProjectFilter, projectSearchTerm, projectCount]
  ); //

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
