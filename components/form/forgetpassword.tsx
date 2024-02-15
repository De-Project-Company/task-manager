/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ForgetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { FormInput } from "../ui/FormInput";
import { cn } from "@/utils";
import FormError from "./Error";
import FormSuccess from "./Success";
import { ForgetPassword } from "@/actions/auth";
import { ArrowSquareLeft } from "iconsax-react";
import { useRouter } from "next/navigation";

const ForgetpasswordForm = () => {
  const router = useRouter();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ForgetPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      ForgetPassword(values).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
        console.log("Reset Successfull");
      });
    });
  };

  return (
    <>
      <>
        <div className="fex w-full justify-start max-[500px]:py-2 px-4 sm:px-8 xl:px-10 2xl:px-20 my-[60px] transition-colors duration-500  dark:text-white dark:bg-primary">
          <div className="flex w-full justify-start transition-colors ">
            <button
              tabIndex={0}
              aria-label="Go Back"
              onClick={() => router.back()}
              type="button"
              className="flex font-medium duration-500 items-center gap-x-1 text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/20 pr-1 pt-4"
            >
              <ArrowSquareLeft
                aria-hidden
                className="dark:text-white  transition-colors duration-500"
              />
              <span className="dark:text-white transition-colors duration-500">
                Back
              </span>
            </button>
          </div>
        </div>
      </>
      <div className="relative py-4 md:py-6 rounded-[16px] bg-white shadow-lg transition-colors duration-500 dark:text-white dark:bg-primary px-4 sm:px-6 md:shadow-none z-20 w-full max-w-[600px] mx-auto">
        <Link href="/">
                   <Image
              src="/assets/traverseLogo.png"
              alt="traverse logo"
              width={150}
              height={150}
              className="dark:hidden block"
            />
            <Image
              src="/logo.svg"
              alt="traverse logo"
              width={150}
              height={150}
              className="dark:block hidden"
            />
        </Link>
        <h1 className=" text-2xl lg:text-[36px] text-[#1B0354]  font-bold w-full  mb-2 dark:text-white ">
          Forgot Your Password?
        </h1>

        <p className="text-xs md:text-sm lg:text-[15px] text-[#6B7B8F]  mb-4 lg:mb-4 text-start ">
          Enter your mail below to recieve passsword reset instruction
        </p>
        <Form {...form}>
          <form
            action=""
            className="flex flex-col mt-4 z-10 gap-y-2 md:gap-y-6  "
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold ">
                    {" "}
                    Email Adress
                  </FormLabel>
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
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="flex relative items-center [perspective:300px] transform-gpu max-sm:w-full">
              <Button
                disabled={isLoading}
                className={cn(
                  "w-full rounded-md my-3 dark:bg-white dark:text-primary",
                  isLoading ? "[&>div>span]:opacity-0" : ""
                )}
                type="submit"
                spinnerColor="#fff"
              >
                Continue
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
      </div>
    </>
  );
};

export default ForgetpasswordForm;
