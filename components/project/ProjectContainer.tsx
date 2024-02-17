"use client";

import { Suspense, useEffect, useState } from "react";
import CardSkelon from "../skeleton/ProjectSkel";
import { useProjectCtx } from "@/context/Projectctx";
import ReactPaginate from "react-paginate";
import ProjectCard from "../cards/projectCard";
import { ProjectProps } from "@/types";
import NotFound from "../Not-found";
import { cn } from "@/utils";

const ProjectContainer = () => {
  const { Project, projectSearchTerm, selectedProjectFilter } = useProjectCtx();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredProjects, setFilteredProjects] = useState(
    [] as ProjectProps[]
  );

  useEffect(() => {
    const searchTerm =
      projectSearchTerm && projectSearchTerm.trim().toLowerCase();
    const filtered = Project.filter((project) => {
      if (
        (!(searchTerm.length > 2) && selectedProjectFilter === "all") ||
        (searchTerm.length > 2 &&
          selectedProjectFilter === "all" &&
          project.title!.toLowerCase().includes(searchTerm))
      ) {
        return true;
      }
      if (searchTerm.length > 2 && selectedProjectFilter === project.status) {
        if (!project.title!.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }
      if (
        selectedProjectFilter &&
        !(project.status === selectedProjectFilter)
      ) {
        return false;
      }
      return true;
    });

    setFilteredProjects(filtered);
    const suggestions = Project.map((project) => project.title).filter(
      (title) => title!.toLowerCase().includes(searchTerm)
    );

    // Log or use the suggestions as needed
    // console.log('Search Suggestions:', suggestions);
  }, [selectedProjectFilter, projectSearchTerm]);

  const itemsPerPage = 8;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = filteredProjects.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    window?.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    setTotalPages(Math.ceil(filteredProjects.length / 8));
  }, [filteredProjects, selectedProjectFilter, projectSearchTerm]);

  return Project.length > 0 ? (
    <section className="flex flex-col gap-y-6 w-full pb-6 min-h-screen">
      <div
        className={cn("font-medium flex items-center gap-x-1", {
          hidden: projectSearchTerm.length < 3,
        })}
      >
        <span
          className={cn(
            "text-lg font-semibold text-gray-400 dark:text-gray-100",
            {
              "text-primary dark:text-[#28affd]": subset.length > 0,
            }
          )}
        >
          {subset.length}
        </span>
        <p className={cn("font-medium text-header dark:text-gray-200")}>
          {subset.length > 0
            ? "Search Result for"
            : subset.length > 1
            ? "Search Results for"
            : "No Results for"}{" "}
          <b className="dark:text-yellow-400 dark:bg-black/80">
            &quot;{projectSearchTerm}&quot;
          </b>
        </p>
      </div>
      <section
        className={cn(
          "rounded-2xl min-[1162px]:py-[43px] min-[1162px]:px-[70px] sm:p-7 w-full h-full",
          {
            "grid place-items-center": subset.length === 0,
          }
        )}
      >
        <div
          className={cn(
            " w-full min-h-[941px] grid grid-cols-1 min-[929px]:grid-cols-2 gap-x-4 lg:gap-x-6 xl:gap-x-8  place-content-start place-items-center gap-y-16 max-[929px]:gap-y-8",
            {
              hidden: subset.length === 0,
            }
          )}
        >
          {subset.map((project) => (
            <Suspense key={project._id} fallback={<CardSkelon />}>
              <ProjectCard {...project} />
            </Suspense>
          ))}
        </div>
        {subset.length === 0 && (
          <div className=" w-full flex justify-center  h-full ">
            <NotFound text="No projects found" />
          </div>
        )}
        <div className="flex w-full justify-end mt-8">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            previousLabel=" Prev"
            previousAriaLabel="Prev"
            nextAriaLabel="Next"
            pageCount={totalPages}
            // onPageChange={({ selected }) => setCurrentPage(selected)}
            onPageChange={handlePageChange}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            className="flex items-center justify-center  border border-gray-300 dark:border-primary/60 px-4 rounded-md select-none dark:bg-primary"
            pageClassName="w-8 h-8 flex justify-center items-center border-l border-r border-gray-300 dark:border-[#28affd]"
            previousClassName="pr-2 lg:pr-4 text-[#6B7280] dark:text-[#28affd] font-medium"
            nextClassName="pl-2 lg:pl-4 text-[#6B7280] dark:text-[#28affd] font-medium"
            pageLinkClassName="text-[#6B7280] dark:text-[#28affd] w-full h-full flex items-center justify-center"
            activeClassName="bg-[#becbd7] dark:bg-[#28affd38]  font-medium"
            renderOnZeroPageCount={null}
            disabledClassName="cursor-not-allowed opacity-70"
            disabledLinkClassName="cursor-not-allowed opacity-70"
          />
        </div>
      </section>
    </section>
  ) : (
    // <SuperAdminProject />
    <span>not fund</span>
  );
};

export default ProjectContainer;
