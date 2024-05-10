"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useStateCtx } from "@/context/StateCtx";
import { Button } from "./ui/butt";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  //   sheet\c
} from "./ui/sheet";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useUserCtx } from "@/context/UserCtx";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

const SpringModal = () => {
  const { openProfileModal, setOpenProfileModal, setprofileSheet } =
    useStateCtx();

  return (
    <AnimatePresence>
      {openProfileModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpenProfileModal(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                One more thing!
              </h3>
              <p className="text-center mb-6">update your profile</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setOpenProfileModal(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  I&apos;ll do it later
                </button>

                <Button
                  onClick={() => {
                    setprofileSheet(true);
                    setOpenProfileModal(false);
                  }}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Update
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Profile = () => {
  const { isMobile } = useMediaQuery();
  const { user } = useUserCtx();
  const { toast } = useToast();
  const { profileSheet, setprofileSheet } = useStateCtx();

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    companyName: user.companyName,
  });

  console.log(userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    toast({
      title: "Profile: Sucssfull.",
      description: "Profile updated sucessfully.",
    });
  };

  return (
    <Sheet open={profileSheet} onOpenChange={setprofileSheet}>
      <SheetContent side={isMobile ? "bottom" : "right"}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export { SpringModal, Profile };
