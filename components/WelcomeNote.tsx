"use client";

import { MultiStepLoader as Loader } from "./ui/multi-step-loader";
import { CloseSquare } from "iconsax-react";
import { useStateCtx } from "@/context/StateCtx";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const loadingStates = [
  {
    text: "Welcome To TRAVERSE",
  },
  {
    text: "Your best Stop For your project Management",
  },
  {
    text: "Create Projects",
  },
  {
    text: "Invite Team Members",
  },
  {
    text: "Create Task",
  },
  {
    text: "Start a fight",
  },
  {
    text: "Have Fun",
  },
  {
    text: "Welcome To TRAVERSE",
  },
];

const words = `Welcome to TRAVERSE our task management platform!`;
const buutowrds = `Get ready to streamline your workflow, collaborate effectively, and achieve your goals with ease. Explore our features and let's make productivity simple and enjoyable!`;

export function Introduction() {
  const { Introduction, setIntroduction, setOpenProfileModal } = useStateCtx();
  const handleClose = () => {
    localStorage.setItem("onboarded", "true");
    setIntroduction(false);
    setOpenProfileModal(true);
  };
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <Loader
        loadingStates={loadingStates}
        loading={Introduction}
        duration={2000}
      />
      {Introduction && (
        <div className="fixed top-4 text-black dark:text-white z-[120] items-center justify-center mx-4">
          <TextGenerateEffect words={words} />
        </div>
      )}

      {/* {Introduction && (
        <div className="fixed bottom-4  text-black dark:text-white z-[120] items-center justify-center mx-4">
          <TextGenerateEffect words={buutowrds} />
        </div>
      )} */}

      {Introduction && (
        <button
          className="fixed top-4 right-4 text-black dark:text-white z-[120]"
          onClick={handleClose}
        >
          <CloseSquare className="h-10 w-10" variant="Bold" />
        </button>
      )}
    </div>
  );
}
