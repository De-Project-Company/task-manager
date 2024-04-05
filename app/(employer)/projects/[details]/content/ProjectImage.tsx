"use client";

import { DocumentDownload, Play, Share } from "iconsax-react";
import { CldUploadButton } from "next-cloudinary";
import Link from "next/link";
import Image from "next/image";

export interface UploadedAssetData {
  public_id: string;
  width: number;
  height: number;
  id: string;
  info: Record<string, unknown>;
  original_filename: string;
  url: string;
  [key: string]: unknown;
}

export type UploadResult = {
  info: {
    public_id: string;
    original_filename: string;
  };
  event: "success";
};

// // const [result, setResult] = useState<UploadedAssetData | null>(null);
//  <CldUploadButton
//    onSuccess={(result) => {
//      setResult(result?.info as UploadedAssetData);
//      setformData({
//        ...formData,
//        // @ts-ignore
//        image: result?.info?.url,
//      });
//    }}
//    uploadPreset="ogundigital"
//  />;
const ProjectImage = () => {
  return (
    <>
      {/* <div className="flex flex-col gap-y-4 w-full h-full px-3 mt-5 py-6  sm:rounded-xl  ">
        <h3 className="text-lg font-semibold text-header dark:text-gray-200 border-b border-[#e1e1e1] dark:border-primary-light pb-2">
          Project CoverImage
        </h3>

        <div className="flex w-full h-full flex-col gap-y-4 items-center ">
          <div className="relative max-h-[236px] w-full max-w-[559px] flex items-center justify-center">
            <Image
              src="/placeholder-image.webp"
              alt="nothing"
              height={236}
              width={559}
              className="object-cover w-full h-full  rounded-[20px]"
            />
          </div>
          <div className="flex w-full items-center justify-end gap-x-3">
            <button
              type="button"
              className="flex items-center gap-x-1 text-sm max-[359px]:text-xs"
            >
              {" "}
              <Share size={16} />
              <span>Share</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-x-1 text-sm max-[359px]:text-xs"
            >
              {" "}
              <DocumentDownload size={16} />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div> */}

      <div className="flex flex-col gap-y-4 w-full px-3 py-6 border border-[#e1e1e1] dark:border-primary-light sm:rounded-xl  dark:bg-gray-950">
        <h3 className="text-lg font-semibold text-header dark:text-gray-200 border-b border-[#e1e1e1] dark:border-primary-light pb-2">
          Project Prototype
        </h3>

        <div className="flex w-full flex-col gap-y-4 items-center ">
          <div className="flex justify-start w-full max-w-[559px] items-center gap-x-2">
            <span className="font-medium max-[364px]:text-sm dark:text-gray-200">
              Prototype Link:
            </span>
            <Link href="" className="text-primary text-sm dark:text-color-dark">
              https://my-prototype.com
            </Link>
          </div>

          <div className="relative h-[236px] w-full max-w-[559px] bg-[#090909] dark:bg-gray-900 flex items-center justify-center">
            <button
              type="button"
              className="w-24 h-24 border-2 border-gray-100 dark:border-color-dark text-[#f1f1f1] dark:text-color-dark rounded-full flex items-center justify-center"
            >
              <Play variant="Bold" size={64} />
            </button>
          </div>
          <div className="flex w-full items-center justify-end gap-x-3">
            <button
              type="button"
              className="flex items-center gap-x-1 text-sm max-[359px]:text-xs"
            >
              {" "}
              <Share size={16} />
              <span>Share</span>
            </button>

            <button
              type="button"
              className="flex items-center gap-x-1 text-sm max-[359px]:text-xs"
            >
              {" "}
              <DocumentDownload size={16} />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectImage;
