"use client";

import { useEffect, useState } from "react";
import { getPojectdetails } from "@/actions/project";
import { ProjectProps } from "@/types";
import { useSearchParams } from "next/navigation";

const ProjectDetails = () => {
  const [projectData, setProjectData] = useState<ProjectProps | null>(null);
  const searchParams = useSearchParams();
  const ProjectId = searchParams.get("id");


  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const project = await getPojectdetails(ProjectId!);
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
  }, [ProjectId, projectData]);

  return <div>ProjectDetails</div>;
};

export default ProjectDetails;
