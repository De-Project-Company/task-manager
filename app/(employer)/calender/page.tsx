import Calender from "@/components/calender/Calender";
import React from "react";

const page = () => {
  return (
    <section className=" p-3 ">
      <h2 className="text-[#1B0354] font-bold text-2xl "> Calender </h2>

      <div className="calener mt-4 ">
        <Calender />
      </div>
    </section>
  );
};

export default page;
