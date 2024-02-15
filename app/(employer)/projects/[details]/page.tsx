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
    <div>
      <span>project title = {title}</span>
      <span>project id = {_id}</span>
    </div>
  );
};

export default page;
