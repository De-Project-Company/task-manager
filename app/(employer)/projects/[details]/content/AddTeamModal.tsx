"use client";

import { useState, useTransition } from "react";
import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";
import { AddMembers } from "@/actions/project";
import FormSuccess from "@/components/form/Success";
import FormError from "@/components/form/Error";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import { MinusCirlce } from "iconsax-react";
import { useProjectCtx } from "@/context/Projectctx";

interface AssognTaskProp {
  projectid?: string;
}

const Team = ({ projectid }: AssognTaskProp) => {
  const { addTeamMemberMoal, setaddTeamMemberMoal } = useStateCtx();
  const [isLoading, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [teamMembers, setTeamMembers] = useState<string[]>([""]);
  const { setUpdate } = useProjectCtx();

  const handleInputChange = (index: number, value: string) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index] = value;
    setTeamMembers(updatedTeamMembers);
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, ""]);
  };

  const removeTeamMember = (index: number) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers.splice(index, 1);
    setTeamMembers(updatedTeamMembers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setError("");
    setSuccess("");
    e.preventDefault();

    startTransition(() => {
      AddMembers({ teamMembers }, projectid!).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
        setUpdate(true);
        if (data?.success) {
          setTimeout(() => {
            setaddTeamMemberMoal(false);
          }, 2000);
        }
      });
    });
  };

  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40 backdrop-blur-sm top-0 left-0  transition-all duration-300 z-[99]",
          addTeamMemberMoal ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setaddTeamMemberMoal(false)}
      />
      <div
        role="dialog"
        aria-labelledby="remove-client"
        className={cn(
          "py-6   flex flex-col w-[360px] h-[330px] min-[450px]:w-[400px] min-[550px]:w-[500px] md:w-[682px] md:h-[400px] justify-between items-center bg-white dark:bg-primary backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 z-[999]  transition-all opacity-0 select-none ",
          addTeamMemberMoal
            ? "-translate-x-1/2 duration-700 opacity-100 rounded-xl md:rounded-2xl"
            : "-translate-x-full duration-300 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] dark:border-primary-light pb-4 pl-4 px-4 md:pl-8 ">
          <h3 className="sm:text-lg md:text-2xl font-medium text-header dark:text-gray-100">
            Add TeamMembers
          </h3>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => setaddTeamMemberMoal(false)}
            className="text-header dark:text-[#e80000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-y-4 lg:gap-y-6 py-8 mb-5 px-2 sm:px-4 md:px-6 lg:px-8 h-full items-start overflow-y-auto overflow-x-hidden no-scroll"
        >
          <div className="flex flex-col  gap-y-2 w-full">
            <label
              htmlFor="tittle"
              className="text-sm sm:text-base font-medium dark:text-white"
            >
              Email
            </label>
            {teamMembers.map((member, index) => (
              <div
                className="flex items-center justify-between gap-3"
                key={index}
              >
                <input
                  key={index}
                  type="email"
                  value={member}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="Enter email"
                  className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-purple-600 dark:bg-gray-950 dark:text-gray-100 dark:border-purple-600"
                />
                {member && (
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    aria-label="Plus"
                    className="text-primary "
                  >
                    <MinusCirlce variant="Bulk" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex items-center justify-between w-full">
            <button
              type="button"
              aria-label="Add-More"
              onClick={addTeamMember}
              disabled={teamMembers.some((member) => member === "")}
              className={cn(
                "rounded-lg bg-primary dark:bg-white dark:text-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600"
              )}
            >
              Add More
            </button>
            <div className="flex relative items-center justify-end [perspective:300px] transform-gpu min-[450px]:w-[180px] sm:gap-x-3 md:gap-x-6">
              <Button
                type="submit"
                tabIndex={0}
                aria-label="Submit"
                disabled={isLoading}
                spinnerColor="#fff"
                className={cn(
                  "rounded-lg bg-primary dark:bg-white dark:text-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600",
                  isLoading ? "[&>div>span]:opacity-0" : ""
                )}
              >
                Submit
              </Button>
              {isLoading && (
                <div className="button--loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
          </div>{" "}
        </form>
      </div>
    </>
  );
};

export default Team;
