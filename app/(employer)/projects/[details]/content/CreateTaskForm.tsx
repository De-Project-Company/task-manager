/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useTransition, useEffect } from "react";
import { TextArea } from "@/components/ui/Textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { format } from "date-fns";
import { Button } from "@/components/ui/butt";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Calendar as Cal } from "iconsax-react";
import { CreateTask } from "@/actions/task";
import { AddTask } from "@/schemas";
import { AssognTaskProp } from "./addTaskMoal";
import { useStateCtx } from "@/context/StateCtx";

import WordCounter from "@/components/cards/wordCount";

export const CreateTaskForm = ({ projectid }: AssognTaskProp) => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isLoading, startTransition] = useTransition();
  const { addTaskModal, setaddTaskModal } = useStateCtx();

  const MAX_DESC = 200;
  const form = useForm<z.infer<typeof AddTask>>({
    resolver: zodResolver(AddTask),
    defaultValues: {
      task: {
        title: "",
        description: "",
        status: "pending",
      },
      email: "",
      name: "",
      dueDate: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof AddTask>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      CreateTask(values, projectid!).then((data) => {
        console.log(data);
        setSuccess(data?.success);
        setError(data?.error);
        if (data?.success) {
          setaddTaskModal(false);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form
        action=""
        className="flex w-full flex-col gap-y-4 lg:gap-y-6 py-8 mb-5 px-2 sm:px-4 md:px-6 lg:px-8 h-full items-start"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="task.title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold ">Task Title</FormLabel>
              <FormControl>
                <div className="flex items-center w-full relative">
                  <input
                    disabled={isLoading}
                    type="text"
                    {...field}
                    placeholder="Task title..."
                    className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-purple-600 dark:bg-gray-950 dark:text-gray-100 dark:border-purple-600"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="task.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold ">Task Title</FormLabel>
              <FormControl>
                <div className="flex-col items-center w-full relative">
                  <textarea
                    disabled={isLoading}
                    {...field}
                    maxLength={MAX_DESC}
                    placeholder="Task description..."
                    className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-purple-600 dark:bg-gray-950 dark:text-gray-100 dark:border-purple-600 h-[150px] sm:h-[185px] resize-none sidebar-scroll text-sm sm:text-base"
                  />
                  <WordCounter word={field.value} length={MAX_DESC} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold ">Task Title</FormLabel>
              <FormControl>
                <div className="flex items-center w-full relative">
                  <input
                    disabled={isLoading}
                    type="text"
                    {...field}
                    placeholder="Assignee name ..."
                    className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-purple-600 dark:bg-gray-950 dark:text-gray-100 dark:border-purple-600"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold ">Task Title</FormLabel>
              <FormControl>
                <div className="flex items-center w-full relative">
                  <input
                    disabled={isLoading}
                    type="email"
                    {...field}
                    placeholder="Assignee email ...."
                    className="w-full rounded-md border border-gray-200 md:py-4 py-2 px-2 md:px-4 outline-none focus-visible:border focus-visible:border-purple-600 dark:bg-gray-950 dark:text-gray-100 dark:border-purple-600"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
