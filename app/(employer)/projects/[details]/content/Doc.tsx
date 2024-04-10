import { Document, DocumentDownload, Share } from "iconsax-react";
import React from "react";

const ProjectDoc = () => {
  return (
    <div
      className="flex gap-y-2 w-full sm:h-[30px] sm:items-center justify-between border-b border-[#e1e1e1] 
    dark:border-primary-light py-1 sm:py-0  "
    >
      <div className="flex items-center justify-between gap-x-2 dark:text-gray-200">
        <Document size={18} />
        <span className="text-base max-[359px]:text-sm ">
          Project proposal <span className="opacity-80">.pdf</span>
        </span>
      </div>
      <div className="flex gap-y-2 flex-col sm:flex-row items-start sm:items-center justify-between gap-x-4">
        <button
          type="button"
          className="flex items-center gap-x-1 text-sm max-[359px]:text-xs dark:text-gray-200"
        >
          <Share size={16} />
          <span>Share</span>
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
