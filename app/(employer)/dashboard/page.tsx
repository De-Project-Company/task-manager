import React from "react";
import DashBoardNav from "@/components/dashboard/NavBar";
import CounterContainer from "@/components/project/CounterContainer";
import ProjectContainer from "@/components/project/ProjectContainer";

const Dashboard = () => {
  return (
    <section className="w-full h-full flex flex-col gap-y-6 min-[1140px]:px-9 px-3 pt-8">
      <DashBoardNav />
      <CounterContainer />
      {/* <ProjectContainer /> */}
    </section>
  );
};

export default Dashboard;
