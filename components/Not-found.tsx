import Image from "next/image";
import React from "react";

const NotFound = ({ text }: { text: string }) => {
  return (
    <>
      <div className="w-full text-center  md:pt-20 ">
        <p>{text}</p>
        <p>OR</p>
        <p>Something Went wrong</p>
      </div>

      <div className="flex w-full justify-center flex-col items-center perspective overflow-hidden pt-10">
        <div className=" relative font-tommy  font-bold text-primary-light max-w-[300px] w-full  h-[120px] max-[500px]:max-w-[250px] max-[400px]:max-w-[200px] lg:-left-[5rem]  max-lg:bottom-6">
          <div className="flex absolute justify-center w-full h-[100px] bottom-0 perspective">
            <span className="font-tommy absolute left-0 text-5xl -bottom-6 scale-y-125">
              ?
            </span>
            <span className="font-tommy absolute -top-6 sm:-top-12 text-[100px] sm:text-[128px] scale-y-125 text-primary dark:text-cyan-400 animate-rotate3d ">
              ?
            </span>
            <span className="font-tommy absolute right-0  text-5xl -bottom-8 scale-y-125">
              ?
            </span>
          </div>
        </div>
        <div className="flex w-full  p-6 relative items-center justify-center  flex-col  perspective ">
          <Image
            src={"/assets/faq-image.png"}
            alt="judging"
            width={500}
            height={500}
            className="image-bounce relative z-10"
          />
          <div className="absolute -bottom-20 left-0 transform-3d">
            <div className="absolute bottom-0 xl:w-[600px]  w-[400px] h-[150px] rounded-full shadow-bounce" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
