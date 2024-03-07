"use client";

import { X } from "lucide-react";
import { cn } from "@/utils";
import { useEffect, useState, useTransition } from "react";
import { useStateCtx } from "@/context/StateCtx";
import WordCounter from "@/components/cards/wordCount";
import { assignTask } from "@/actions/task";
import FormSuccess from "@/components/form/Success";
import FormError from "@/components/form/Error";
import Button from "@/components/ui/Button";
import { format } from "date-fns";
import { Button as Butt } from "@/components/ui/butt";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Calendar as Cal } from "iconsax-react";
import { CreateTaskForm } from "./CreateTaskForm";

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

  const [formData, setFormData] = useState<FormData>({
    task: {
      title: "",
      description: "",
      status: "pending",
    },
    email: "",
    name: "",
    dueDate: new Date(),
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
        console.log(data);
        setSuccess(data?.success);
        setError(data?.error);
        if (data?.success) {
          setFormData({
            task: {
              title: "",
              description: "",
              status: "",
            },
            email: "",
            name: "",
            dueDate: new Date(),
          });
          setaddTaskModal(false);
        }
      });
    });
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
          "py-6   flex flex-col w-[98%] sm:w-[95%] overflow-y-auto overflow-x-hidden no-scroll min-[500px]:h-[650px] md:h-[720px] lg:h-[750px] md:w-[682px]  justify-between items-start bg-white dark:bg-primary backdrop-blur-lg fixed top-1/2 left-1/2  -translate-y-1/2 z-[999]  transition-all opacity-0 select-none ",
          addTaskModal
            ? "-translate-x-1/2 duration-700 opacity-100 sm:rounded-xl md:rounded-2xl"
            : "translate-x-full duration-300 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between w-full border-b border-[#e1e1e1] pb-4 pl-4 px-4 md:pl-8 sticky top-0 bg-white">
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

        <CreateTaskForm projectid={projectid} />
      </div>
    </>
  );
};

export default AssignTask;
