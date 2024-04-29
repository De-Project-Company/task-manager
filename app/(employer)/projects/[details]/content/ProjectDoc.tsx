//@ts-nocheck
import React, { useState } from "react";
import ProjectDoc from "./Doc";
import Image from "next/image";
import { Label } from "@radix-ui/react-label";
import { useStateCtx } from "@/context/StateCtx";
import { uploadFiles } from "@/actions/uploadFiles";
import UploadFileModal from "./uploadFileModal";

const ProjectDocument = ({ projectId }: { projectId?: string }) => {
  const [docsNum, setDocsNum] = useState(5);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [fileData, setFileData] = useState<File | null>(null);
  const { openUploadPreviewModal, setOpenUploadPreviewModal } = useStateCtx();

  const docs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
      "image/jpeg",
      "image/png",
      "text/csv",
      "application/vnd.ms-excel", // XLS
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
    ];

    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      // Clear previous error
      setError("");

      if (!allowedTypes.includes(selectedFile.type)) {
        setError(
          "File type not supported. Allowed types are PDF, DOC/DOCX, images (JPG, PNG), CSV, XLS, XLSX."
        );
        console.log(
          "File type not supported. Allowed types are PDF, DOC/DOCX, images (JPG, PNG), CSV, XLS, XLSX."
        );
        return;
      }

      if (selectedFile.size > 2 * 1024 * 1024) {
        setError("Maximum file size allowed is 2mb");
        console.log("Maximum file size allowed is 2mb");
        return;
      }

      // Both file size and type are valid
      console.log("File ready to be uploaded !!");
      setFileData(selectedFile);
      console.log(selectedFile, "$$$$");
      setOpenUploadPreviewModal(true);
      setError("");
    }
  };

  return (
    <>
      <div className="grid gap-4 w-full">
        <div className="flex flex-col w-full py-3 sm:p-3 mt-12 sm:rounded-xl h-full">
          <h3 className="text-lg font-semibold text-header dark:text-gray-100 pb-4 z-50">
            Project Documents
          </h3>

          {/* Upload file Modal*/}
          {openUploadPreviewModal && <UploadFileModal />}

          <div className="wrapper mb-8">
            <Label>Upload file:</Label>
            <div className=" border border-dashed p-2">
              <input
                type="file"
                onChange={(e) => {
                  handleFile(e);
                }}
                className="cursor-pointer "
                name="file"
                //   hidden
                // value={fileData | null}
              />
              {/* 
            <div className="h-[90px] relative border border-dashed flex justify-center items-center py-10 ">
              <Image
                className="relative block "
                alt="upload_files_image"
                src="/upload_image.png"
                height="100"
                width="100"
                />
            </div> */}
            </div>
            {error && (
              <span className="text-red-400 mt-1 text-xs font-bold">
                {error}
              </span>
            )}
          </div>
          <div className="flex flex-col h-full max-h-[250px] overflow-y-auto sidebar-scroll w-full">
            <div className="flex flex-col gap-y-4 px-1">
              {docs.slice(0, docsNum).map((num) => (
                <ProjectDoc key={num} num={num} />
              ))}
            </div>
            <div className="flex">
              <button
                type="button"
                className="text-primary dark:text-color-dark underline text-sm font-medium pt-4 capitalize"
                onClick={() => {
                  if (docsNum === docs.length) {
                    setDocsNum(5);
                  } else {
                    setDocsNum(docs.length);
                  }
                }}
              >
                {docsNum === docs.length ? "See less" : "See All"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDocument;
