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
  selectedProject: string;
  setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
  selectedTask: string;
  setSelectedTask: React.Dispatch<React.SetStateAction<string>>;
  projectSearchTerm: string;
  setProjectSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  projectCount: number;
  Loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  Update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectContext = createContext({} as ProjectContextProps);

const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Project, setProject] = useState([] as ProjectProps[]);
  const [selectedProjectFilter, setSelectedProjectFilter] = useState("all");
  const [projectSearchTerm, setProjectSearchTerm] = useState("");

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [projectCount, setprojectCount] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [Update, setUpdate] = useState(false);

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getProject();
        if (res?.status === "success") {
          setProject(res.project);
          setprojectCount(res.count);
        } else {
          console.error(res?.error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setProject]);

  const value = useMemo(
    () => ({
      Project,
      setProject,
      selectedProjectFilter,
      setSelectedProjectFilter,
      projectSearchTerm,
      setProjectSearchTerm,
      projectCount,
      Loading,
      setLoading,
      selectedProject,
      setSelectedProject,
      Update,
      setUpdate,
      selectedTask,
      setSelectedTask,
    }),
    [
      Project,
      Loading,
      selectedProjectFilter,
      selectedProject,
      projectSearchTerm,
      projectCount,
      Update,
      selectedTask,
    ]
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
