"use client";

import React from "react";
import DashNav from "@/components/dashboard/nav";
import { useRouter } from "next/navigation";
import { ArrowSquareLeft } from "iconsax-react";
import CreateProjectForm from "@/components/form/CreateProjectForm";

const CreateProject = () => {
  const router = useRouter();
  return (
    <>
      <>
        <div className="fex w-full justify-start max-[500px]:py-2 px-4 sm:px-8 xl:px-10 2xl:px-20 my-[60px]">
          <div className="flex w-full justify-start">
            <button
              tabIndex={0}
              aria-label="Go Back"
              onClick={() => router.back()}
              type="button"
              className="flex font-medium items-center gap-x-1 text-header dark:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/20 pr-1 pt-4"
            >
              <ArrowSquareLeft aria-hidden />
              <span>Back</span>
            </button>
          </div>
        </div>
      </>
      <div className="px-[20px] md:px-[40px]">
        <CreateProjectForm />
      </div>
    </>
  );
};

export default CreateProject;
