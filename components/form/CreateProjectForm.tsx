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
import { useStateCtx } from "@/context/StateCtx";

function CreateProjectForm() {
  const { setToast } = useStateCtx();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isLoading, startTransition] = useTransition();
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    price: 0,
    teamMembers: [],
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    field: string,
    value: string | number | Date | string[] | null
  ) => {
    setProjectData({ ...projectData, [field]: value });
  };

  const handleSubmit = async () => {
    const values = projectData;
    setError("");
    setSuccess("");
    startTransition(() => {
      CreateProject(values).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
        if (data?.success) {
          setToast(true);
        }
      });
    });
  };

  const datePickerStyles = {
    display: "block",
    margin: "8px 0",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "100%", // Set the width to 100% for full-width appearance
  };

  return (
    <>
      <TOAST status="success" message="Project created successfully" />
      <div>
        <form className="flex flex-col mt-4 z-10 gap-y-2 min-[850px]:gap-y-6">
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
            <TextArea
              disabled={isLoading}
              value={projectData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter Project Description"
              className=" w-full text-black md:h-[200px] h-[150px] resize-none border text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
            />
          </div>

          <div className="flex flex-col space-y-4 justify-between ">
            <Label>Price:</Label>
            <FormInput
              disabled={isLoading}
              type="number"
              value={projectData.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
              placeholder="Enter Project Price"
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
            <Label>Start Date:</Label>
            <FormInput
              disabled={isLoading}
              type="date"
              value={projectData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className=" w-full text-black h-[45px] sm:h-[56px] border text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
            />
          </div>

          <div className="flex flex-col space-y-4 justify-between ">
            <Label>End Date:</Label>

            <FormInput
              disabled={isLoading}
              type="date"
              value={projectData.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className=" w-full text-black h-[45px] sm:h-[56px] border text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
            />
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
