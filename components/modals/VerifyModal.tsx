"use client";

import { useStateCtx } from "@/context/StateCtx";
import ActivateForm from "../form/Activate";
import { cn } from "@/utils";
import { X } from "lucide-react";

const OTPModal = () => {
  const { OTPModal, setOTPModal } = useStateCtx();

  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40 backdrop-blur-sm top-0 left-0  transition-all duration-300 z-[99]",
          OTPModal
            ? "opacity-100 duration-500"
            : "opacity-0 duration-200 pointer-events-none"
        )}
      >
        <div
          role="dialog"
          aria-labelledby="OTP"
          className={cn(
            "py-6  flex flex-col min-w-[360px] max-w-[450px]  min-h-[300px] max-h-[500px] justify-between items-center bg-white backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 z-[999]  transition-all opacity-0 select-none -translate-x-1/2",
            OTPModal
              ? "scale-100  duration-700 opacity-100 rounded-xl md:rounded-2xl"
              : "scale-0 translate-y-full duration-300 pointer-events-none"
          )}
        >
          <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] pb-4 pl-4 px-4 md:pl-8 ">
            <h3>Verify Your Account</h3>
            <button
              type="button"
              tabIndex={0}
              aria-label="Close"
              onClick={() => {
                setOTPModal(false);
              }}
              className="text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full"
            >
              <X size={24} />
            </button>
          </div>

            {/* <h3>An Email was sent </h3> */}
          <ActivateForm />
        </div>
      </div>
    </>
  );
};

export default OTPModal;
