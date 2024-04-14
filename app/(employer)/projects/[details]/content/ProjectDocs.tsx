"use client";

import { useState } from "react";
import ProjectDoc from "./Doc";
import { uploadFile } from "@/actions/docs";
import { getCookies } from "@/actions/getToken";
import { baseUrl } from "@/actions/baseurl";
import Calls from "@/actions/calls";

interface DocsProps {
  projectId?: string;
  files?: string[];
}
const ProjectDocs = ({ projectId }: DocsProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadDone, setUploadDone] = useState<boolean>(false);

  const $http = Calls(baseUrl);

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

    console.log(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await $http.post(
        `/project/${projectId}/uploadFile`,
        formData,
        config
      );

      console.log(res);

      // const response = await uploadFile(projectId, file);
      // console.log(response);
      // if (response?.status === "success") {
      //   console.log("File uploaded successfully");
      //   setUploadDone(true);
      // } else {
      //   console.error("Error uploading file:", response);
      // }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setUploading(false);
    }
  };

  const [docsNum, setDocsNum] = useState(5);
  const docs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="flex flex-col w-full py-3 sm:p-3 mt-12 sm:rounded-xl h-full">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-lg font-semibold text-header dark:text-gray-100  pb-4">
          Project Documents
        </h3>
        <input type="file" onChange={handleFileChange} />
      </div>

      {previewUrl && (
        <div>
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

          <button onClick={handleUpload} disabled={!file || uploading}>
            {uploading ? "Uploading..." : uploadDone ? "Done" : "Upload File"}
          </button>
          {/* Add handling for other file types as needed */}
        </div>
      )}
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
