"use client";

import { X } from "lucide-react";
import { cn } from "@/utils";
import { useState, useTransition } from "react";
import { useStateCtx } from "@/context/StateCtx";
import WordCounter from "@/components/cards/wordCount";
import { assignTask } from "@/actions/task";
import FormSuccess from "@/components/form/Success";
import FormError from "@/components/form/Error";
import Button from "@/components/ui/Button";
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
import { Calendar } from "@/components/ui/Calendar";
import { Button as Butt } from "@/components/ui/butt";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";

type StatusProps = {
  id?: number;
  label: string;
};

export interface AssognTaskProp {
  projectid?: string;
}

const STATUSES: StatusProps[] = [
  {
    id: 1,
    label: "pending",
  },
  {
    id: 2,
    label: "in-progress",
  },
  {
    id: 3,
    label: "completed",
  },
];

interface TaskData {
  title: string;
  description: string;
  status: StatusProps["label"];
}

interface FormData {
  task: TaskData;
  email: string;
  name: string;
  dueDate: Date;
}

const AssignTask = ({ projectid }: AssognTaskProp) => {
  const { addTaskModal, setaddTaskModal } = useStateCtx();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
  task: {
    title: "",
    description: "",
    status: "Todo",
  },
  email: "",
  name: "",
  dueDate: new Date() as Date, // Explicitly specify the type as Date
});

  const MAX_DESC = 200;

  const isDisabled = !formData.task || !formData.email || !formData.name;
  const [isLoading, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      assignTask(formData, projectid!).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
        if (data?.success) {
          setFormData({
            task: {
              title: "",
              description: "",
              status: "Todo",
            },
            email: "",
            name: "",
            dueDate: new Date(),
          });
          setTimeout(() => {
            setaddTaskModal(false);
            router.refresh();
          }, 3000);
        }
      });
    });
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

    setFormData((prevData) => ({
      ...prevData,
      dueDate: newDueDate,
    }));
  };

  return (
    <>
      <div
        aria-hidden
        className={cn(
          " fixed min-h-screen w-full bg-black/40 top-0 left-0  transition-all duration-300 z-[99] backdrop-blur-sm",
          addTaskModal ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setaddTaskModal(false)}
      />

      <div
        role="dialog"
        aria-labelledby="create task modal"
        className={cn(
          "py-6   flex flex-col w-[98%] sm:w-[95%] overflow-y-auto overflow-x-hidden no-scroll min-[500px]:h-[500px] md:h-[550px] lg:h-[600px] md:w-[682px]  justify-between items-start bg-white dark:bg-primary backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 z-[99]  transition-all opacity-0 select-none pb-5 ",
          addTaskModal
            ? "-translate-x-1/2 duration-700 opacity-100 sm:rounded-xl md:rounded-2xl"
            : "translate-x-full duration-300 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] dark:border-primary-light pb-4 pl-4 px-4 md:pl-8 ">
          <h3 className="sm:text-lg md:text-2xl font-medium text-header dark:text-white">
            Create New Task
          </h3>
          <button
            type="button"
            tabIndex={0}
            aria-label="Close"
            onClick={() => {
              setaddTaskModal(false);
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
              value={formData.task.title}
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
              value={formData.task.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  task: { ...formData.task, description: e.target.value },
                })
              }
            />
            <WordCounter word={formData.task.description} length={MAX_DESC} />
          </div>
          <div className="flex flex-col  gap-y-2 w-full">
            <label
              htmlFor="name"
              className="text-sm sm:text-base font-medium dark:text-white"
            >
              Assigne Name
            </label>
            <input
              type="text"
              placeholder="Assignee name ..."
              id="name"
              name="name"
              className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-purple-600 dark:bg-gray-950 dark:text-gray-100 dark:border-purple-600"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col  gap-y-2 w-full">
            <label
              htmlFor="email"
              className="text-sm sm:text-base font-medium dark:text-white"
            >
              Assignee Email
            </label>
            <input
              type="text"
              placeholder="Assignee email ...."
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-purple-600 dark:bg-gray-950 dark:text-gray-100 dark:border-purple-600"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col  gap-y-2 w-full">
            <label className="text-sm sm:text-base font-medium dark:text-white">
              Task Due Date
            </label>
            <Popover>
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
                  <SelectContent position="popper" className="z-[999] bg-white">
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
                    disabled={(date) => date < new Date()}
                    // initialFocus
                    onSelect={(date) =>
                      date &&
                      setFormData((prevData) => ({
                        ...prevData,
                        dueDate: date,
                      }))
                    }
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex relative items-center justify-end [perspective:300px] transform-gpu min-[450px]:w-[180px] sm:gap-x-3 md:gap-x-6 mb-5">
            <Button
              type="submit"
              tabIndex={0}
              aria-label="Submit"
              disabled={isDisabled || isLoading}
              spinnerColor="#fff"
              className={cn(
                "rounded-lg bg-primary dark:bg-white dark:text-primary text-white min-[450px]:w-[178px] min-[450px]:h-[56px] h-[40px] px-2 max-[450px]:px-4 text-base hover:opacity-80 transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-600",
                isLoading ? "[&>div>span]:opacity-0" : ""
              )}
            >
              Create Task
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
};

export default AssignTask;
