"use client";

import { useEffect, useState } from "react";
import { useStateCtx } from "@/context/StateCtx";
import { ProjectProps, Owner } from "@/types";
import { cn } from "@/utils";
const ViewOwnerModal = () => {
  const { ViewOwnerModal, setViewOwnerModal } = useStateCtx();
  const [owner, setOwner] = useState<Owner>();

  useEffect(() => {
    const ownerString = localStorage.getItem("projectOwner");
    if (ownerString) {
      const parsedOwner = JSON.parse(ownerString);
      setOwner(parsedOwner);
    }
  }, [ViewOwnerModal]);

  console.log(owner);
  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/10  top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
          ViewOwnerModal ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setViewOwnerModal(false)}
      />
      <div
        role="dialog"
        aria-labelledby="create task modal"
        className={cn(
          "py-6   flex flex-col w-[98%] sm:w-[95%] overflow-y-auto overflow-x-hidden no-scroll min-[500px]:h-[500px] md:h-[550px] lg:h-[600px] md:w-[682px]  justify-between items-start bg-white dark:bg-primary backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 z-[99]  transition-all opacity-0 select-none pb-5 ",
          ViewOwnerModal
            ? "-translate-x-1/2 duration-700 opacity-100 sm:rounded-xl md:rounded-2xl"
            : "translate-x-full duration-300 pointer-events-none"
        )}
      ></div>
    </>
  );
};

export default ViewOwnerModal;
