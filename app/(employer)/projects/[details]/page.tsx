import React from "react";
import { decryptString } from "@/utils";
import { FaBriefcase } from "react-icons/fa6";
import DetailsContainer from "./content/DetailsContainer";

import Image from "next/image";

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

const page = ({ searchParams: { project_title, _id } }: PageProps) => {
  console.log(project_title, _id);
  const title = decryptString(project_title!);

  return (
    <>
      <DetailsContainer title={title} id={_id!} />
    </>
  );
};
 
export default page;
