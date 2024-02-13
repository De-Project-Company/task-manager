"use client";

import React from "react";
import { useProjectCtx } from "@/context/Projectctx";
import { ProjectCounterProps } from "@/types";
import CounterCard from "../cards/counter";

const CounterContainer = () => {
  const { Project } = useProjectCtx();

  const PROJECT_COUNTERS: ProjectCounterProps[] = [
    {
      id: 1,
      label: "All Projects",
      count: Project.length,
    },
    {
      id: 2,
      label: "Completed",
      count: Project.filter((status) => status.status === "completed").length,
    },
    {
      id: 3,
      label: "In Progress",
      count: Project.filter((status) => status.status === "in-progress").length,
    },
    {
      id: 4,
      label: "Pending",
      count: Project.filter((status) => status.status === "to-do").length,
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4  py-6">
      {PROJECT_COUNTERS.map((counter) => (
        <CounterCard
          key={counter.label}
          count={counter.count}
          label={counter.label}
        />
      ))}
    </div>
  );
};

export default CounterContainer;
