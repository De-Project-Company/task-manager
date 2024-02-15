import React from "react";
import { decryptString } from "@/utils";
import { FaBriefcase } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

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
      <div className="wrap py-4 px-3 md:px-9 ">
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
        <div className="below flex space-x-2 mt-2">
          <span className="block bg-[#41AE49] py-1 px-2 w-fit rounded-full text-white text-xs md:text-sm md:px-3">
            in progress
          </span>
          <span className="block py-1 px-2 bg-[#EAEBF0] text-neutraly w-fit rounded-full text-xs md:text-sm">
            32hrs
          </span>
        </div>

        {/* project decription section */}
        <div className="projectDesc mt-12 bg-[#F9F9F9] px-4 py-3 border border-neutral-100  rounded-lg shadow-sm">
          <div className="flex space-x-2 items-center mb-3">
            <div className=" bg-[#ECEBFF] h-10 w-10 rounded-full flex items-center justify-center">
              <FaBriefcase />
            </div>
            <h5 className="font-bold text-primary text-xl items-center ">
              {title}
            </h5>
          </div>

          <div>
            <p className="text-[#151B28] font-light">
              Introduction: Triptraka is an innovative application designed to
              streamline and enhance the tracking of work progress for both
              clients and emplo yees. In today&apos;s fast-paced business
              environment, efficient project management is crucial, and
              Triptraka aims to be the solution that brings transparency,
              collaboration, and productivity to the forefront
            </p>
          </div>
        </div>

        {/* Projects Images */}
        <div className="grid md:grid-cols-2 gap-4 ">
          <div className="projectDesc mt-12 bg-[#F9F9F9] px-4 py-5 border border-neutral-100  rounded-lg shadow-sm">
            <div className="flex justify-between items-center my-5">
              <div className="flex space-x-2 items-center">
                <div className=" bg-[#ECEBFF] h-10 w-10 rounded-full flex items-center justify-center">
                  <FaBriefcase />
                </div>
                <h5 className="font-bold text-primary text-xl items-center ">
                  Project Images
                </h5>
              </div>

              <p className="block text-primary font-medium hover:font-bold cursor-pointer text-xs md:text-sm">
                See More
              </p>
            </div>

            {/* Images section */}
            <div className="grid grid-cols-3 gap-2 overflow-hidden">
              {[1, 2, 3].map((index) => (
                <div key={index} className="h-[140.69px] w-[167px] relative ">
                  <Image
                    key={index}
                    src="/assets/screenshot/screenshot_showcase.png"
                    height={400}
                    width={400}
                    alt="Project Images"
                    className="h-full w-full object-fit "
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Projects Team members */}
          <div className="projectDesc mt-12 bg-[#F9F9F9] px-4 py-5 border border-neutral-100  rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <div className="flex space-x-2 items-center">
                <div className=" bg-[#ECEBFF] h-10 w-10 rounded-full flex items-center justify-center">
                  <FaBriefcase />
                </div>
                <h5 className="font-bold text-primary text-xl items-center ">
                  People
                </h5>
              </div>

              <p className="block text-primary font-medium hover:font-bold text-xs md:text-sm">
                See All
              </p>
            </div>

            {/* Images section */}
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
