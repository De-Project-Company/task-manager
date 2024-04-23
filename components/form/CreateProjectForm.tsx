"use client";

import { useState, useTransition, useRef } from "react";
import { Label } from "../ui/Label";
import React from "react";
import { FormInput } from "../ui/FormInput";
import { cn } from "@/utils";
import Button from "../ui/Button";
import FormError from "./Error";
import FormSuccess from "./Success";
import { CreateProject } from "@/actions/project";
import { TextArea } from "../ui/Textarea";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { Tiptap } from "@/components/ui/texteditor";
import { UploadedAssetData } from "@/app/(employer)/projects/[details]/content/ProjectImage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/currency";
import { Calendar } from "@/components/ui/Calendar";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import WordCounter from "../cards/wordCount";
import { useRouter } from "next/navigation";
import { Button as Butt } from "@/components/ui/butt";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import useMediaQuery from "@/hooks/useMediaQuery";
import { DateRange } from "react-day-picker";
import { useProjectCtx } from "@/context/Projectctx";
import { getProject } from "@/actions/project";
import { selectCurrencies } from "@/constants";
import { X } from "lucide-react";

function CreateProjectForm() {
  const { setProject } = useProjectCtx();
  const { isMobile } = useMediaQuery();
  const [result, setResult] = useState<UploadedAssetData | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isLoading, startTransition] = useTransition();
  const [projectData, setProjectData] = useState<{
    title: string;
    description: string;
    price?: number;
    teamMembers: never[];
    Date: DateRange | undefined;
    priceCurrency: string;
    coverImage?: string;
  }>({
    title: "",
    description: "",
    price: undefined,
    teamMembers: [],
    Date: {
      from: addDays(new Date(), 7),
      to: addDays(new Date(), 14),
    },
    priceCurrency: "NGN",
    coverImage: undefined,
  });
  const router = useRouter();

  const MAX_DESC_LEN = 5000;

  const handleChange = (
    field: string,
    value: string | number | Date | string[] | null
  ) => {
    setProjectData({ ...projectData, [field]: value });
  };

  const handleContentChange = (reason: any) => {
    setProjectData({ ...projectData, description: reason });
  };

  const handleSubmit = async () => {
    const { title, description, price, teamMembers, Date, priceCurrency } =
      projectData;
    const values = {
      title,
      description,
      price,
      teamMembers,
      priceCurrency,
      startDate: Date?.from ? Date.from.toISOString() : "",
      endDate: Date?.to ? Date.to.toISOString() : "",
    };

    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("description", description);
    // if (price != undefined) formData.append("price", price.toString());
    // if (teamMembers.length > 0)
    //   formData.append("teamMembers", teamMembers.join(","));
    // if (Date?.from) formData.append("startDate", Date.from.toISOString());
    // if (Date?.to) formData.append("endDate", Date.to.toISOString());
    // formData.append("priceCurrency", priceCurrency);
    // if (fileData) {
    //   formData.append("files", fileData);
    // }

    setError("");
    setSuccess("");
    startTransition(() => {
      CreateProject(values).then(async (data) => {
        setSuccess(data?.success);
        setError(data?.error);
        if (data?.success) {
          const res = await getProject();
          if (res?.status === "success") {
            setProject(res.project);
          } else {
            console.error(res?.error);
          }
          setTimeout(() => {
            router.push(DEFAULT_LOGIN_REDIRECT);
          }, 2000);
        }
      });
    });
  };

  const currenySymbol = selectCurrencies.find(
    (c) => c.value === projectData.priceCurrency
  )?.symbol;

  const handleCurrencyChange = (selectedCurrency: string) => {
    setProjectData((prevData) => ({
      ...prevData,
      priceCurrency: selectedCurrency,
    }));
  };

  return (
    <>
      <div>
        <form className="flex flex-col mt-4 z-10 gap-y-2 min-[850px]:gap-y-6 dark:text-white">
          <div className="flex flex-col space-y-4 justify-between ">
            <Label>Project Cover Image:</Label>
            <div
              ref={scrollRef}
              className="flex flex-col w-full gap-5 max-md:w-full max-md:justify-center "
            >
              {projectData.coverImage ? (
                <div className="flex flex-col gap-y-2 h-full w-full relative overflow-hidden rounded-lg object-cover">
                  <Image
                    width={300}
                    height={300}
                    src={projectData.coverImage!}
                    alt="Cover Image"
                    className="w-full h-full object-cover rounded-lg transition-all duration-300 hover:duration-700 hover:scale-150"
                  />
                  {/* @ts-ignore */}
                  <span className="absolute bottom-1 left-0 bg-gradient-to-r from-white via-white/50 to-white/5 px-2 w-full text-left font-medium">
                    {/* @ts-ignore */}
                    {result?.original_filename!}
                  </span>
                  <button
                    type="button"
                    tabIndex={0}
                    aria-label="Remove image"
                    onClick={() =>
                      setProjectData({ ...projectData, coverImage: "" })
                    }
                    className="text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light rounded-full bg-white/60 backdrop-blur-sm absolute top-1 right-1 w-8 h-8 flex items-center justify-center hover:text-red-500 hover:bg-white/80 hover:brightness-150 transition-all duration-700 hover:duration-200"
                    title="Remove image"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <div
                  className={cn(
                    "flex w-full h-full min-h-[300px] items-center justify-center bg-[#f6f6f6] px-8",
                    {
                      hidden: projectData.coverImage,
                    }
                  )}
                >
                  <CldUploadButton
                    onSuccess={(result) => {
                      setResult(result?.info as UploadedAssetData);
                      setProjectData({
                        ...projectData,
                        // @ts-ignore
                        coverImage: result?.info?.url,
                      });
                    }}
                    uploadPreset="traverse"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-4 justify-between ">
            <Label>Title:</Label>
            <FormInput
              disabled={isLoading}
              type="text"
              value={projectData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter Project Name"
              className=" w-full text-black h-[45px] sm:h-[56px] border text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
            />
          </div>
          <div className="flex flex-col space-y-4 justify-between ">
            <Label>Description:</Label>
            <div className="flex w-full flex-col gap-2">
              <Tiptap
                content={projectData.description}
                onChange={(newContent: string) =>
                  handleContentChange(newContent)
                }
                  />

              {/* <TextArea
                disabled={isLoading}
                value={projectData.description}
                maxLength={MAX_DESC_LEN}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter Project Description"
                className=" w-full text-black md:h-[200px] h-[150px] resize-none border text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
              /> */}
              <WordCounter
                word={projectData.description}
                length={MAX_DESC_LEN}
              />
            </div>
          </div>

          <div className="flex flex-col  gap-y-2 w-full relative">
            <Label>Price:</Label>
            <div className="flex relative w-full items-center  ">
              <span className="absolute left-3 md:left-4 ">
                {currenySymbol}
              </span>
              <FormInput
                disabled={isLoading}
                type="number"
                value={projectData.price}
                placeholder="0"
                onChange={(e) => handleChange("price", Number(e.target.value))}
                className=" w-fulltext-black h-[45px] sm:h-[56px] border py-2 md:py-4 px-2 pl-6 md:pl-8 text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
              />
              <Select onValueChange={handleCurrencyChange}>
                <SelectTrigger className="w-[80px] select-none py-1 outline-none bg-[#f8f4f6]  text-header dark:bg-color-dark dark:text-gray-200 rounded-lg px-1 uppercase absolute right-4 font-medium focus-visible:outline focus-visible:outline-primary-light focus-visible:outline-offset-4">
                  <SelectValue placeholder={projectData.priceCurrency} />
                </SelectTrigger>
                <SelectContent position="popper" className="max-w-[80px]">
                  {selectCurrencies.map((currency) => (
                    <SelectItem
                      key={currency.id}
                      value={currency.value}
                      className="hover:bg-[#becbd7] px-2 "
                      disabled={currency.value === projectData.priceCurrency}
                    >
                      {currency.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
            <Label>End Date: (Double click on a date to reset the date) </Label>

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
