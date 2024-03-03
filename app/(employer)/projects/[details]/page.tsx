import React from "react";
import { decryptString } from "@/utils";
import DetailsContainer from "./content/DetailsContainer";

import Image from "next/image";

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

const page = ({ searchParams: { project_title, _id } }: PageProps) => {
  const title = decryptString(project_title!);

  return (
    <>
      <DetailsContainer title={title} id={_id!} />
    </>
  );
};
 
export default page;
