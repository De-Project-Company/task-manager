"use client";

import React, { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";

const ApprovalModal = () => {
  const { ApprovalModal, setApprovalModal } = useStateCtx();
  const [AllowedCookie, setAllowedCookie] = useState(false);

  const handleAcceptCookies = () => {
    setAllowedCookie(true);
    localStorage.setItem("AllowedCookie", "true");
    localStorage.setItem("firstTimeUser", "false");
    setApprovalModal(false);
  };

  return (
    <Drawer open={ApprovalModal} onOpenChange={setApprovalModal}>
      <DrawerContent className="bg-white dark:bg-primary">
        <DrawerHeader className="text-left dark:text-white">
          <DrawerTitle>Manage Preferences</DrawerTitle>
          <DrawerDescription>
            We Care About Your PrivacyBy clicking “Accept All Cookies”, you
            agree to the storing of cookies on your device to enhance site
            navigation, analyze site usage, and assist in our marketing efforts.
          </DrawerDescription>
        </DrawerHeader>
        <button
          className={cn(
            "rounded-lg bg-primary dark:bg-white dark:text-primary text-white min-[450px]:w-[400px] mx-6 self-center min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600"
          )}
        >
          Manage Preferences
        </button>
        {/* <div className="bg-emerald-700/10 p-3 rounded-md flex  items-center gap-x-2 text-sm text-emerald-700">
          Thanks You!!
        </div> */}
        <DrawerFooter>
          <div className="pt-2 flex w-full items-center justify-between pb-4">
            <button
              onClick={handleAcceptCookies}
              className={cn(
                "rounded-lg mx-4 bg-primary dark:bg-white dark:text-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600"
              )}
            >
              Accept All Cookies
            </button>
            <DrawerClose asChild>
              <button
                className={cn(
                  "rounded-lg border border-primary text-primary dark:text-white dark:border-white  min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600"
                )}
              >
                Reject All Cookies
              </button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { ApprovalModal };
