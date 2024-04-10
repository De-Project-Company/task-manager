import Link from "next/link";
import React from "react";

const CommingSoon: React.FC = () => {
  return (
    <>
      <div
        className="page_warppaer h-calc w-full flex flex-col justify-center items-center 
      text-center space-y-10"
      >
        <div className="top">
          <span className="mb-1 text-grey-600 font-light">
            WE&apos;RE STILL
          </span>
          <h1 className="text-2xl font-bold text-primary ">
            Cooking This Page
          </h1>

          <p className="text-neutral-400 font-xs">
            This page will be ready Very Soon. Stay Tune
          </p>
        </div>

        <Link
          href="/dashboard "
          className=" rounded-full bg-primary text-white px-6 py-1 shadow-2xl border block"
        >
          Dashboard
        </Link>
      </div>
    </>
  );
};

export default CommingSoon;
