import React from "react";
import { decryptString } from "@/utils";

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
      <h1>
        <h1>page</h1>
      </h1>
    </>
  );
};

export default page;
