"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useUserCtx } from "@/context/UserCtx";
import { cn } from "@/utils";
import useInView from "@/hooks/useInView";

const AcceptControl = () => {
  const searchParams = useSearchParams();
  const ProjectId = searchParams.get("ProjectId");
  const { user } = useUserCtx();
  return (
    <>
      <div>accept</div>
    </>
  );
};

export default AcceptControl;
