import React from "react";
import { decryptString } from "@/utils";
import { FaBriefcase } from "react-icons/fa6";

interface PageProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

const page = ({ searchParams: { project_title, _id } }: PageProps) => {
  console.log(project_title, _id);
  const title = decryptString(project_title!);

  return (
    <>
      <div className="wrap pt-4  px-3">
        <div className="top flex md:w-full relative justify-between items-center h-16">
          <div className="wrapper">
            <h1 className="font-bold text-primary text-3xl"> {title} </h1>
            <p className="text-xs text-neutraly w-4/5 relative md:w-full">
              How are you doing today Gabriel?
            </p>
          </div>
          <div className="timmer">
            {[2, 23, 14, 8].map((time: number, index: number) => (
              <span
                className="inline-block mr-1 bg-[#ECEBFF] text-primary py-1 px-2 rounded-lg timmer-number font-bold"
                key={index}
              >
                <i>{time < 10 ? `0${time}` : time}</i>
              </span>
            ))}
          </div>
        </div>
        <div className="below flex  space-x-2 mt-2">
          <span className="block bg-[#41AE49] py-1 px-2 w-fit rounded-full text-white text-xs md:text-sm md:px-3">
            in progress
          </span>
          <span className="block py-1 px-2 bg-[#EAEBF0] text-neutraly w-fit rounded-full text-xs md:text-sm">
            32hrs
          </span>
        </div>

        {/* project decription section */}
        <div className="projectDesc mt-12">
          <div className="flex space-x-4">
            <FaBriefcase />
            <h5 className="font-bold text-primary text-xl items-center">
              {title}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
