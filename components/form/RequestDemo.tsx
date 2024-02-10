"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import * as z from "zod";
import { RequestSchema } from "@/schemas";
import { FormInput } from "../ui/FormInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { cn } from "@/utils";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "./Error";
import FormSuccess from "./Success";
import { requestDemo } from "@/actions/request";
import { TextArea } from "../ui/Textarea";

function RequestDemo() {
  const router = useRouter();

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RequestSchema>>({
    resolver: zodResolver(RequestSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RequestSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      requestDemo(values).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      });
    });
  };
  return (
    <>
      <Form {...form}>
        <form
          action=""
          className="flex flex-col mt-4 z-10 gap-y-2 min-[850px]:gap-y-6 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold ">FullName</FormLabel>
                <FormControl>
                  <div className="flex items-center w-full relative">
                    <FormInput
                      disabled={isLoading}
                      type="text"
                      {...field}
                      placeholder="Enter Full Name"
                      aria-placeholder="Enter Full Name"
                      className=" w-full text-black h-[45px] sm:h-[56px] border text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
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
                <FormLabel className="font-semibold "> Email Adress</FormLabel>
                <FormControl>
                  <div className="flex items-center w-full relative">
                    <FormInput
                      disabled={isLoading}
                      type="email"
                      {...field}
                      placeholder="Enter Email Address"
                      className=" w-full text-black h-[45px] sm:h-[56px] border text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold "> Message</FormLabel>
                <FormControl>
                  <div className="flex items-center w-full relative">
                    <TextArea
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter Request Details"
                      className=" w-full text-black md:h-[200px] h-[150px] resize-none border text-md font-medium rounded-md focus-visible:ring-primary outline-none pr-10 sm:pr-9"
                    />
                    
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </form>
      </Form>
    </>
  );
}

export default RequestDemo;
