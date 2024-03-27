"use client";

import { useState, useTransition } from "react";
import { Label } from "../ui/Label";
import React from "react";
import { FormInput } from "../ui/FormInput";
import { cn } from "@/utils";
import Button from "../ui/Button";
import FormError from "./Error";
import FormSuccess from "./Success";
import { CreateProject } from "@/actions/project";
import { TextArea } from "../ui/Textarea";
import TOAST from "../toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Calendar } from "@/components/ui/Calendar";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import WordCounter from "../cards/wordCount";
import { useRouter } from "next/navigation";
import { Button as Butt } from "@/components/ui/butt";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import useMediaQuery from "@/hooks/useMediaQuery";
import { DateRange } from "react-day-picker";

function CreateProjectForm() {
  const { isMobile } = useMediaQuery();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isLoading, startTransition] = useTransition();
  const [projectData, setProjectData] = useState<{
    title: string;
    description: string;
    price?: number;
    teamMembers: never[];
    Date: DateRange | undefined;
  }>({
    title: "",
    description: "",
    price: undefined,
    teamMembers: [],
    Date: {
      from: addDays(new Date(), 7),
      to: addDays(new Date(), 14),
    },
  });
  const router = useRouter();
  // console.log(projectData.Date);

  const MAX_DESC_LEN = 500;

  const handleChange = (
    field: string,
    value: string | number | Date | string[] | null
  ) => {
    setProjectData({ ...projectData, [field]: value });
  };

  const handleSubmit = async () => {
    const { title, description, price, teamMembers, Date } = projectData;
    const values = {
      title,
      description,
      price,
      teamMembers,
      startDate: Date?.from ? Date.from.toISOString() : "",
      endDate: Date?.to ? Date.to.toISOString() : "",
    };

    setError("");
    setSuccess("");
    startTransition(() => {
      CreateProject(values).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
        if (data?.success) {
          setTimeout(() => {
            router.push(DEFAULT_LOGIN_REDIRECT);
          }, 2000);
        }
      });
    });
  };

  return (
    <>
      <TOAST status="success" message="Project created successfully" />
      <div>
        <form className="flex flex-col mt-4 z-10 gap-y-2 min-[850px]:gap-y-6 dark:text-white">
          <div className="flex flex-col space-y-4 justify-between ">
            <Label>Title:</Label>
            <FormInput
              disabled={isLoading}
              type="text"
              value={projectData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter Workspace Name"
              className=" w-full text-black h-[45px] sm:h-[56px] border text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
            />
          </div>
          <div className="flex flex-col space-y-4 justify-between ">
            <Label>Description:</Label>
            <div className="flex w-full flex-col gap-2">
              <TextArea
                disabled={isLoading}
                value={projectData.description}
                maxLength={MAX_DESC_LEN}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter Project Description"
                className=" w-full text-black md:h-[200px] h-[150px] resize-none border text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
              />
              <WordCounter
                word={projectData.description}
                length={MAX_DESC_LEN}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 justify-between ">
            <Label>Price:</Label>
            <FormInput
              disabled={isLoading}
              type="number"
              value={projectData.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
              placeholder="0"
              className=" w-full text-black h-[45px] sm:h-[56px] border text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
            />
          </div>

          <div className="flex flex-col space-y-4 justify-between ">
            <Label>Team Members:</Label>
            <FormInput
              disabled={isLoading}
              type="text"
              value={projectData.teamMembers.join(", ")}
              onChange={(e) =>
                handleChange(
                  "teamMembers",
                  e.target.value.split(",").map((email) => email.trim())
                )
              }
              placeholder="Enter Team Member Details"
              className=" w-full text-black h-[45px] sm:h-[56px] border text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
            />
          </div>

          <div className="flex flex-col space-y-4 justify-between ">
            <Label>End Date:</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Butt
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 justify-start text-left font-normal",
                    !projectData.Date && "text-muted-foreground"
                  )}
                >
                  <span>Pick an EndDate</span>
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  {projectData.Date?.from ? (
                    projectData.Date.to ? (
                      <>
                        {format(projectData.Date.from, "LLL dd, y")} -{" "}
                        {format(projectData.Date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(projectData.Date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Butt>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Calendar
                  mode="range"
                  numberOfMonths={isMobile ? 1 : 2}
                  selected={projectData.Date}
                  onSelect={(date) =>
                    setProjectData((prevData) => ({
                      ...prevData,
                      Date: date,
                    }))
                  }
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          <div className="flex relative items-center [perspective:300px] transform-gpu max-sm:w-full">
            <Button
              disabled={isLoading}
              className={cn(
                "w-full rounded-md my-3",
                isLoading ? "[&>div>span]:opacity-0" : ""
              )}
              type="submit"
              spinnerColor="#fff"
              onClick={handleSubmit}
            >
              Create Project
            </Button>
            {isLoading && (
              <div className="button--loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateProjectForm;
