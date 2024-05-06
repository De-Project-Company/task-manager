import Link from "next/link";
import React from "react";

const CommingSoon: React.FC = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center relative h-[500px] bg-white">
        <div className="wrap flex flex-col items-center space-y-5">
          <h1 className=" text-2xl md:text-3xl font-bold ">Coming Soon</h1>
          <Link
            href="/dashboard"
            className="block py-1 px-2  bg-primary/90 hover:bg-primary text-white w-fit rounded-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default CommingSoon;
