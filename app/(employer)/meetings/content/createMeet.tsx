"use client";

import React from "react";
import { useUserCtx } from "@/context/UserCtx";

const CreateMeet = () => {
  const { user } = useUserCtx();
  return <div>CreateMeet</div>;
};

export default CreateMeet;
