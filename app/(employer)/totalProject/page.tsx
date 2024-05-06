
import React from "react";
import TemProjectContainer from "./tempDir/temProjectContainer";
const page = () => {
  return (
    <>
      <div className="p-4">
        <h1 className="text-[#1B0354] text-xl md:text-3xl font-bold ">
          Total Projects
        </h1>
        <span className="text-[#6B7B8F] text-xs md:text-sm">
          Describe exactly what your product or service does
        </span>

        {/* Project table can come in here */}
        <p className="mt-4">Total Project</p>
      </div>
      <TemProjectContainer/>
    </>
  );
};

export default page;
