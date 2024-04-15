import { Document, DocumentDownload, FolderOpen } from "iconsax-react";
import React from "react";

interface DocsProps {
  fileName?: string;
}

const ProjectDoc = ({ fileName }: DocsProps) => {
  const cleanedFileName = fileName?.replace("project-", "");

  if (!cleanedFileName) {
    return;
  }
  const update = removeTrailingNumbers(cleanedFileName);
  return (
    <div className="flex  gap-y-2 w-full  sm:h-[30px] sm:items-center justify-between border-b border-[#e1e1e1] dark:border-primary-light py-1 sm:py-0">
      <div className="flex items-center justify-between gap-x-2 dark:text-gray-200">
        <Document size={18} />
        <span className="text-base max-[359px]:text-sm ">{update}</span>
      </div>
      <div className="flex gap-y-2 flex-col sm:flex-row items-start sm:items-center justify-between gap-x-4">
        <button
          type="button"
          className="flex items-center gap-x-1 text-sm max-[359px]:text-xs dark:text-gray-200"
        >
          <FolderOpen size={16} />
          <span>Open</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-x-1 text-sm max-[359px]:text-xs dark:text-gray-200"
        >
          <DocumentDownload size={16} />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectDoc;

function removeTrailingNumbers(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".");
  const lastDashIndex = fileName.lastIndexOf("-");
  if (lastDashIndex > -1 && lastDotIndex > lastDashIndex) {
    return (
      fileName.substring(0, lastDashIndex) + fileName.substring(lastDotIndex)
    );
  }
  return fileName;
}
