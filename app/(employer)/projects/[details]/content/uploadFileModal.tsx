//@ts-nocheck
// "use Client";
import React, { useState } from "react";
import { useStateCtx } from "@/context/StateCtx";
import FormError from "@/components/form/Error";
import FormSuccess from "@/components/form/Success";
import { uploadFiles } from "@/actions/uploadFiles";

const UploadFileModal: React.FC = ({ projectId }: { projectId?: string }) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [fileData, setFileData] = useState<File | null>(null);
  const { openUploadPreviewModal, setOpenUploadPreviewModal } = useStateCtx();

  const handleSubmitFile = async () => {
    const formData = new FormData();

    if (fileData) formData.append("files", fileData);

    try {
      const res = await uploadFiles(formData, projectId);

      if (res?.status) {
        setSuccess("Files Uploaded Sucessfully ");
        setOpenUploadPreviewModal(false);
      }
    } catch (error) {
      setError("Error Uploading file, Try again ");
    }
  };

  return (
    <>
      <div className="shadow-lg rounded-md bg-white absolute w-[300px] h-[300px]">
        <h1> Modal opened </h1>

        <FormError message={error} />
        <FormSuccess message={success} />

        <button
          onClick={(e) => {
            handleSubmitFile;
          }}
          className="bg-primary text-white"
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default UploadFileModal;
