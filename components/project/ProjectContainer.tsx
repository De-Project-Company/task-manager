"use client";

import { Suspense, useEffect, useState } from "react";
import CardSkelon from "../skeleton/ProjectSkel";
import { useProjectCtx } from "@/context/Projectctx";
import ReactPaginate from "react-paginate";
import ProjectCard from "../cards/projectCard";
import { cn } from "@/utils";

const ProjectContainer = () => {
  const { Project, projectSearchTerm, selectedProjectFilter } = useProjectCtx();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 6;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //   const subset = Project.slice(startIndex, endIndex);
  return (
    <div
      className={cn(
        " w-full min-h-[941px] grid grid-cols-1 min-[929px]:grid-cols-2 gap-x-4 lg:gap-x-6 xl:gap-x-8  place-content-start place-items-center gap-y-16 max-[929px]:gap-y-8",
        {
          //   hidden: subset.length === 0,
        }
      )}
    >
      {Project.map((project) => (
        <Suspense key={project._id} fallback={<CardSkelon />}>
          <ProjectCard {...project} />
        </Suspense>
      ))}
    </div>
  );
};

export default ProjectContainer;
