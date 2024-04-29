"use client";

import { getCookies } from "@/actions/getToken";
import { Document, DocumentDownload, FolderOpen } from "iconsax-react";
import React, { useState } from "react";

interface DocsProps {
  fileName?: string;
  projectId?: string;
}

const ProjectDoc = ({ fileName, projectId }: DocsProps) => {
  const [fileChunks, setFileChunks] = useState<Uint8Array[]>([]);
  const url = process.env.NEXT_PUBLIC_BASEURL;

  if (!fileName) {
    return;
  }
  const cleanedFileName = fileName?.replace("project-", "");

  if (!cleanedFileName) {
    return;
  }
  const update = removeTrailingNumbers(cleanedFileName);

  const HandleFileDownload = async () => {
    const { token } = await getCookies();

    if (!token) {
      return;
    }
    const res = await fetch(
      `${url}/project/${projectId}/streamFile?fileName=${fileName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res?.body) {
      return;
    }

    const blob = await res.blob();
    // let DownLoadedLenght = 0;
    // const Lenght = res.headers.get("Content-Lenght");
    // const LenghtToDIgits = typeof Lenght === "string" && parseInt(Lenght);
    // const fileChunks = [];

    // const reader = res.body.getReader();
    // while (true) {
    //   const { done, value } = await reader.read();
    //   if (done) {
    //     break;
    //   }
    //   DownLoadedLenght = DownLoadedLenght + value.length;
    //   fileChunks.push(value);
    //   console.log(value);

    //   if (typeof LenghtToDIgits === "number") {
    //     const steps = (DownLoadedLenght / LenghtToDIgits) * 100;
    //     console.log(steps);
    //   }
    // }
    // const blob = new Blob(fileChunks);
    const DownloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = DownloadUrl;
    a.download = update;
    a.click();
  };

  return (
    <div
      className="flex gap-y-2 w-full sm:h-[30px] sm:items-center justify-between border-b border-[#e1e1e1] 
    dark:border-primary-light py-1 sm:py-0  "
    >
      <div className="flex items-center justify-between gap-x-2 dark:text-gray-200">
        <Document size={18} />
        <span className="text-base max-[359px]:text-sm ">{update}</span>
      </div>
      <div className="flex gap-y-2 flex-col sm:flex-row items-start sm:items-center justify-between gap-x-4">
        <button
          type="button"
          // onClick={handleViewFile}
          className="flex items-center gap-x-1 text-sm max-[359px]:text-xs dark:text-gray-200"
        >
          <FolderOpen size={16} />
          <span>Open</span>
        </button>

        <button
          type="button"
          onClick={HandleFileDownload}
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
