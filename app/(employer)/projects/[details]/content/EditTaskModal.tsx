"use client";

import { X } from "lucide-react";
import { useStateCtx } from "@/context/StateCtx";
import { cn } from "@/utils";
import React, { useCallback, useEffect, useState, useTransition } from "react";
import WordCounter from "@/components/cards/wordCount";
import { UpdateTask, assignTask } from "@/actions/task";
import FormSuccess from "@/components/form/Success";
import FormError from "@/components/form/Error";
import Button from "@/components/ui/Button";
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useProjectCtx } from "@/context/Projectctx";
import { Calendar } from "@/components/ui/Calendar";
import { Button as Butt } from "@/components/ui/butt";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectProps, UserWithRole } from "@/types";
import { getPojectdetails } from "@/actions/project";

interface FormData {
  task: TaskData;
  email?: string;
  name?: string;
  dueDate?: Date;
}

type StatusProps = {
  id?: number;
  label: string;
};

export interface AssognTaskProp {
  projectid?: string;
  teamMembers?: UserWithRole[];
  endDate?: string;
  task?: {};
}

interface TaskData {
  title: string;
  description: string;
  status?: StatusProps["label"];
}

export const EditTaskModal = ({ projectid, endDate }: AssognTaskProp) => {
  // const { selectedTask, setUpdate } = useProjectCtx();
  const { EditTask, setEditTaskModal } = useStateCtx();
  const [projectData, setProjectData] = useState<ProjectProps | null>(null);
  const [taskId, setTaskId] = useState("");
  const [formData, setFormData] = useState<FormData>({
    task: {
      title: "",
      description: "",
    },
    email: "",
    dueDate: new Date(),
  });

  const storedTask: any = localStorage.getItem("taskToEdit");
  useEffect(() => {
    if (storedTask) {
      const parsedTask = JSON.parse(storedTask);
      setTaskId(parsedTask?._id);

      setFormData((prevFormData) => ({
        ...prevFormData,
        task: {
          ...prevFormData.task,
          title: parsedTask.title || prevFormData.task.title,
          description: parsedTask.description || prevFormData.task.description,
        },
        dueDate: parsedTask.dueDate,
        email: parsedTask.email,
      }));
    }

    // console.log(storedTask);
  }, [storedTask, taskId]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const project = await getPojectdetails(projectid!);
        if (project?.status === "success") {
          setProjectData(project.project);
          // setUpdate(false);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching project details for task asssigne",
          error
        );
      }
    };
    fetchProjectDetails();
  }, [projectData, projectid]);

  const MAX_DESC = 3000;
  const isDisabled = !formData.task || !formData.email;
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [teamMembers, setTeamMembers] = React.useState<UserWithRole[]>([]);
  const { setUpdate } = useProjectCtx();

  const handleTeamMemberSelect = (email: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: email,
    }));

    console.log({ name, email });
  };

  const handleDueDateChange = (value?: string) => {
    if (!value) return;

    let newDueDate: Date;

    switch (value) {
      case "1":
        newDueDate = addDays(new Date(), 1);
        break;
      case "3":
        newDueDate = addDays(new Date(), 3);
        break;
      case "7":
        newDueDate = addDays(new Date(), 7);
        break;
      default:
        newDueDate = new Date();
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      dueDate: newDueDate,
    }));

    // console.log(newDueDate);

    setOpen2(false);
  };

  useEffect(() => {
    const fetchTeamMembersFromLocalStorage = () => {
      const storedTeamMembers = window.localStorage.getItem("teamMembers");
      if (storedTeamMembers) {
        const parsedTeamMembers: UserWithRole[] = JSON.parse(storedTeamMembers);
        setTeamMembers(parsedTeamMembers);
      }
    };

    fetchTeamMembersFromLocalStorage();
  }, [setTeamMembers]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    const values = {
      title: formData?.task.title,
      description: formData?.task.description,
      email: formData?.email,
      dueData: formData?.dueDate,
    };

    // console.log(values);
    // console.log(taskId);

    try {
      setIsLoading(true);

      const res = await UpdateTask(projectid!, taskId, values);

      if (res?.success) {
        setSuccess(res.success);
        setError(undefined); // Clear error message on success
        setFormData({
          task: {
            title: "",
            description: "",
          },
          email: "",
          dueDate: new Date(),
        });
        setTimeout(() => {
          setEditTaskModal(false);
          setUpdate(true);
          setSuccess(undefined);
        }, 3000);
      } else {
        setError(res?.error);
      }
    } catch (error) {
      console.error("An error occurred while updating the task:", error);
      setError("An error occurred while updating the task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {EditTask ? (
        <>
          <div
            aria-hidden
            className={cn(
              " fixed min-h-screen w-full bg-black/40 top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
              EditTask ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={() => setEditTaskModal(false)}
          />

          <div
            role="dialog"
            aria-labelledby="update task modal"
            className={cn(
              "py-6   flex flex-col w-[98%] sm:w-[95%] overflow-y-auto overflow-x-hidden no-scroll min-[500px]:h-[500px] md:h-[550px] lg:h-[600px] md:w-[682px]  justify-between items-start bg-white dark:bg-primary backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 z-[99]  transition-all opacity-0 select-none pb-5 ",
              EditTask
                ? "-translate-x-1/2 duration-700 opacity-100 sm:rounded-xl md:rounded-2xl"
                : "translate-x-full duration-300 pointer-events-none"
            )}
          >
            <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] dark:border-primary-light pb-4 pl-4 px-4 md:pl-8 ">
              <h3 className="sm:text-lg md:text-2xl font-medium text-header dark:text-white">
                Update Task
              </h3>
              <button
                type="button"
                tabIndex={0}
                aria-label="Close"
                onClick={() => {
                  setFormData({
                    task: {
                      title: "",
                      description: "",
                    },
                    email: "",
                    dueDate: new Date(),
                  });
                  setEditTaskModal(false);
                }}
                className="text-header focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:text-[#e80000] rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-y-4 lg:gap-y-6 py-8 mb-5 px-2 sm:px-4 md:px-6 lg:px-8 h-full items-start"
            >
              <div className="flex flex-col  gap-y-2 w-full">
                <label
                  htmlFor="tittle"
                  className="text-sm sm:text-base font-medium dark:text-white"
                >
                  Task Title
                </label>
                <input
                  type="text"
                  placeholder="Task title..."
                  id="Task-title"
                  name="task.title"
                  className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-purple-600 dark:bg-gray-950 dark:text-gray-100 dark:border-purple-600"
                  value={formData?.task?.title || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      task: { ...formData.task, title: e.target.value },
                    })
                  }
                />
              </div>

              <div className="flex flex-col  gap-y-2 w-full">
                <label
                  htmlFor="description"
                  className="text-sm sm:text-base font-medium dark:text-white"
                >
                  Add Description
                </label>
                <textarea
                  placeholder="Task description..."
                  id="description"
                  name="task.description"
                  maxLength={MAX_DESC}
                  className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-purple-600 dark:bg-gray-950 dark:text-gray-100 dark:border-purple-600 h-[150px] sm:h-[185px] resize-none sidebar-scroll text-sm sm:text-base"
                  value={formData?.task?.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      task: { ...formData.task, description: e.target.value },
                    })
                  }
                />
                <WordCounter
                  word={formData.task.description}
                  length={MAX_DESC}
                />
              </div>

              <div className="md:flex items-center justify-between w-full">
                <div className="flex flex-col mb-5 gap-y-2 md:mb-0 w-[300px]">
                  <label className="text-sm sm:text-base font-medium dark:text-white">
                    Add Assignee
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Butt
                        variant={"outline"}
                        className={cn(
                          "w-full justify-between text-left font-normal min-h-8 md:py-4 py-2"
                        )}
                      >
                        {formData.name && <>{formData.name}</>}

                        {!formData.name && <>Enter Assignee</>}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Butt>
                    </PopoverTrigger>
                    <PopoverContent className="flex w-full z-[500]">
                      <Command className="rounded-lg w-full">
                        <CommandInput placeholder="Search By Name ...." />
                        <CommandList className="w-full z-[800]">
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup
                            heading="Suggestions"
                            className="z-[850]"
                          >
                            {teamMembers?.map((teamMember) => (
                              <CommandItem
                                key={teamMember.user._id}
                                value={teamMember.user.email}
                                onSelect={() => {
                                  handleTeamMemberSelect(teamMember.user.email);
                                  setOpen(false);
                                }}
                                className="z-[900]"
                              >
                                {teamMember.user.email}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    formData.email === teamMember.user.email
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col  gap-y-2 w-[300px]">
                  <label className="text-sm sm:text-base font-medium dark:text-white">
                    Task Due Date
                  </label>
                  <Popover open={open2} onOpenChange={setOpen2}>
                    <PopoverTrigger asChild>
                      <Butt
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal min-h-8 md:py-4 py-2",
                          !formData?.dueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData?.dueDate ? (
                          format(formData?.dueDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Butt>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      className="flex w-full flex-col space-y-2 p-2 z-[500]"
                    >
                      <Select onValueChange={handleDueDateChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Time Frame" />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          className="z-[999] bg-white"
                        >
                          <SelectItem value="0">Today</SelectItem>
                          <SelectItem value="1">Tomorrow</SelectItem>
                          <SelectItem value="3">In 3 days</SelectItem>
                          <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="rounded-md border">
                        <Calendar
                          mode="single"
                          selected={formData?.dueDate}
                          // disabled={(date) =>
                          //   date > new Date() || date > new Date(endDate!)
                          // }
                          disabled={(date) => {
                            const currentDate = new Date();
                            const endDateTime = endDate
                              ? new Date(endDate)
                              : null;

                            return date < currentDate || date > endDateTime!;
                          }}
                          initialFocus
                          onSelect={(date) => {
                            date &&
                              setFormData((prevFormData) => ({
                                ...prevFormData,
                                dueDate: date,
                              }));

                            setOpen2(false);
                            console.log(date);
                          }}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />
              <div className="flex relative items-center [perspective:300px] transform-gpu max-sm:w-full">
                <Button
                  disabled={isDisabled || isLoading}
                  className={cn(
                    "rounded-lg bg-primary dark:bg-white dark:text-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600",
                    isLoading ? "[&>div>span]:opacity-0" : ""
                  )}
                  type="submit"
                >
                  Update Task
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
      ) : (
        ""
      )}
    </>
  );
};
