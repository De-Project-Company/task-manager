"use client";

import React from "react";
import Image from "next/image";
import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";

interface TOASTProps {
  status: "success" | "error";
  message?: string;
}

const TOAST: React.FC<TOASTProps> = ({ status, message }) => {
  const { Toast, setToast } = useStateCtx();
  const renderImage = () => {
    if (status === "success") {
      return <Image src="/success.gif" alt="success" width={40} height={40} />;
    } else if (status === "error") {
      return <Image src="/error.gif" alt="error" width={40} height={40} />;
    } else {
      return null; // Handle other status values or provide a default image
    }
  };

  return (
    <>
      <div
        aria-hidden
        onClick={() => {
          setToast(false);
        }}
        className={cn(
          " fixed min-h-screen w-full bg-transparent top-1 flex justify-center transition-all duration-300 z-[99]",
          Toast
            ? "opacity-100 duration-500"
            : "opacity-0 duration-200 pointer-events-none"
        )}
      >
        <div
          role="dialog"
          aria-labelledby="OTP"
          className={cn(
            "flex h-[50px] rounded-full items-center self-center justify-center gap-5 w-[200px] md:w-[300px] px-5 text-white dark:text-primary dark:bg-white bg-primary -translate-y-1/2 z-[999]  transition-all opacity-0 select-none -translate-x-1/2",
            Toast
              ? "scale-100  duration-700 opacity-100 rounded-xl md:rounded-2xl"
              : "scale-0 translate-y-full duration-300 pointer-events-none"
          )}
        >
          {renderImage()}
          <span className="text-xs">{message}</span>
        </div>
      </div>
    </>
  );
};

export default TOAST;
