"use client";

import { X } from "lucide-react";
import { cn } from "@/utils";
import { useStateCtx } from "@/context/StateCtx";
import { useRouter } from "next/navigation";

const UpdateSessionModal = () => {
  const { SessionModal, setSessionModal } = useStateCtx();
  const router = useRouter();

  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40  top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
          SessionModal ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSessionModal(false)}
      />

      <div
        role="dialog"
        aria-labelledby="session modal"
        className={cn(
          "py-6   flex flex-col max-[350px]:h-[410px] w-[70%] h-[380px] min-[550px]:w-[500px] md:w-[682px] md:h-[400px] items-center bg-white dark:bg-primary  fixed top-1/2 left-1/2  z-[999]  transition-all opacity-0 select-none  -translate-y-1/2 -translate-x-1/2",
          SessionModal
            ? "scale-100 duration-500 opacity-100 rounded-xl md:rounded-2xl"
            : "scale-0 duration-200 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] dark:border-primary-light pb-4 pl-4 px-4 md:pl-8 ">
          <h3 className="sm:text-lg md:text-2xl font-medium text-header dark:text-gray-100">
            Auth Session
          </h3>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => setSessionModal(false)}
            className="text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full dark:text-red-500"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex w-full max-w-[546px] h-full  pt-8 sm:pt-16 items-center flex-col gap-y-8 ">
          <div className="flex items-center flex-col gap-y-3 dark:text-white ">
            <p className="text-center text-sm md:text-base px-">
              Oops! Your session has expired.
            </p>
            <p className="text-center text-sm md:text-base px-4">
              Please Sign In again to continue using Travrse.
            </p>
          </div>

          <div className="flex w-full gap-x-4 justify-center sm:justify-between sm:px-8 [&>*]:font-semibold">
            <button
              type="button"
              tabIndex={0}
              aria-label="Cancel"
              onClick={() => {
                setSessionModal(false);
                router.push("/");
              }}
              className={cn(
                "rounded-lg bg-[#e80000] text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e80000]"
              )}
            >
              No, Cancel
            </button>

            <button
              type="button"
              tabIndex={0}
              aria-label="SignIn"
              onClick={() => {
                setSessionModal(false);
                router.push("/aauth/signin");
              }}
              className={cn(
                "rounded-lg bg-[#009254] text-white items-center justify-center min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#009254]"
              )}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSessionModal;

// bg-[#e80000]
