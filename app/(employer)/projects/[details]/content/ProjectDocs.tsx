"use client";

import { useState } from "react";
import ProjectDoc from "./Doc";
import { getCookies } from "@/actions/getToken";
import { Label } from "@/components/ui/Label";
import { DocumentUpload } from "iconsax-react";
import { X } from "lucide-react";
import FormSuccess from "@/components/form/Success";
import FormError from "@/components/form/Error";
import { useProjectCtx } from "@/context/Projectctx";

interface DocsProps {
  projectId?: string;
  files?: string[];
}
const ProjectDocs = ({ projectId, files }: DocsProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadDone, setUploadDone] = useState<boolean>(false);
  const [docsNum, setDocsNum] = useState<number>(5);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const { setUpdate } = useProjectCtx();

  const url = process.env.NEXT_PUBLIC_BASEURL;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    if (!projectId) {
      return;
    }

    setUploading(true);

    const { token } = await getCookies();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const baseurl = `${url}/project/${projectId}/uploadFile`;
      const config = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      const res = await fetch(baseurl, config);

      if (res.ok) {
        setFile(null);
        setPreviewUrl(null);
        setUploadDone(true);
        setUpdate(true);
        setSuccess("Upload successfully!");
        setError(undefined);
        console.log("File uploaded successfully");
      }
    } catch (e: any) {
      console.log("An error occurred:", e);
      setError("An error occured. Please try again.");
      setSuccess(undefined);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleLoadMore = () => {
    setDocsNum(docsNum + 5);
  };
  return (
    <div className="flex flex-col w-full py-3 sm:p-3 mt-12 sm:rounded-xl h-full">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-semibold text-header dark:text-gray-100  pb-4">
          Project Documents
        </h3>
        <Label className="cursor-pointer dark:text-white" title="upload doc">
          <div className="flex items-center justify-between space-x-2">
            <DocumentUpload size={24} />
            <span>Add Documents</span>
          </div>
          <input type="file" className="sr-only" onChange={handleFileChange} />
        </Label>
      </div>

      {previewUrl && (
        <div className="flex flex-col gap-y-2 h-full w-full relative rounded-lg object-cover">
          <p>Preview:</p>
          {file?.type.startsWith("image/") && (
            <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%" }} />
          )}
          {file?.type === "application/pdf" && (
            <embed
              src={previewUrl}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          )}
          {(file?.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file?.type === "application/msword") && (
            <iframe src={previewUrl} width="100%" height="600px" />
          )}
          {file?.type === "application/vnd.ms-powerpoint" && (
            <iframe src={previewUrl} width="100%" height="600px" />
          )}
          {file?.type ===
            "application/vnd.openxmlformats-officedocument.presentationml.presentation" && (
            <iframe src={previewUrl} width="100%" height="600px" />
          )}

          <FormError message={error} />
          <FormSuccess message={success} />

          <button
            type="button"
            tabIndex={0}
            aria-label="Remove Docs"
            onClick={handleRemoveFile}
            className="text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full bg-white/60 backdrop-blur-sm absolute top-1 right-1 w-8 h-8 flex items-center justify-center hover:text-red-500 hover:bg-white/80 hover:brightness-150 transition-all duration-700 hover:duration-200"
            title="Remove Docs"
          >
            <X size={18} />
          </button>
          <button
            className="text-sm font-medium my-2 bg-primary dark:bg-white dark:text-primary  text-white h-[48px] rounded-lg px-4 transition-all duration-300 flex items-center gap-x-2 disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:bg-primary-light"
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? "Uploading..." : uploadDone ? "Done" : "Upload File"}
            <DocumentUpload size={18} values="Outline" />
          </button>
          {/* Add handling for other file types as needed */}
        </div>
      )}
      <div className="flex flex-col h-full max-h-[250px] overflow-y-auto sidebar-scroll w-full">
        {files && files.length === 0 && (
          <p className="w-full text-center dark:text-gray-200">
            There are no files yet for this project
          </p>
        )}
        <div className="flex flex-col gap-y-4 px-1">
          {files?.map((fileName, index) => (
            <ProjectDoc key={index} fileName={fileName} projectId={projectId} />
          ))}
        </div>
        <div className="flex">
          {files && files.length > docsNum && (
            <button
              type="button"
              className="text-primary dark:text-color-dark underline text-sm font-medium pt-4 capitalize"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDocs;
