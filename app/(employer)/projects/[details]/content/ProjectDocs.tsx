"use client";

import { useState } from "react";
import ProjectDoc from "./Doc";

interface DocsProps {
  projectId?: string;
  files?: string[];
}
const ProjectDocs = ({ projectId }: DocsProps) => {
  const [docsNum, setDocsNum] = useState(5);
  const docs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="flex flex-col w-full py-3 sm:p-3 mt-12 sm:rounded-xl h-full">
      <h3 className="text-lg font-semibold text-header dark:text-gray-100  pb-4">
        Project Documents
      </h3>
      <div className="flex flex-col h-full max-h-[250px] overflow-y-auto sidebar-scroll w-full">
        <div className="flex flex-col gap-y-4 px-1">
          {docs.slice(0, docsNum).map((num) => (
            <ProjectDoc key={num} />
          ))}
        </div>
        <div className="flex">
          <button
            type="button"
            className="text-primary dark:text-color-dark underline text-sm font-medium pt-4 capitalize"
            onClick={() => {
              if (docsNum === docs.length) {
                setDocsNum(5);
                return;
              }
              setDocsNum(docs.length);
            }}
          >
            {docsNum === docs.length ? " See less" : "See All"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDocs;
