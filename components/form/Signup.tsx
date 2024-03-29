"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import * as z from "zod";
import { RegistrationSchema } from "@/schemas";
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
import { useStateCtx } from "@/context/StateCtx";
import FormError from "./Error";
import FormSuccess from "./Success";
import { register } from "@/actions/auth";
import Link from "next/link";

function SignupForm() {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const { setOTPModal } = useStateCtx();

  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      companyName: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegistrationSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        if (data?.success) {
          setOTPModal(true);
        }
        setSuccess(data?.success);
        setError(data?.error);
      });
    });
  };
  return (
    <div
      className="relative py-10 rounded-[16px] transition-colors duration-500  dark:text-white 
    dark:bg-primary shadow-lg px-4 sm:px-6 md:shadow-none z-20 w-full max-w-[600px] mx-auto"
    >
      <div className="w">
        <Link href="/">
          <Image
            src="/assets/traverseLogo.png"
            alt="traverse logo"
            width={150}
            height={150}
            className="dark:hidden block"
          />
          {/* <Image
          src="/logo.svg"
          alt="traverse logo"
          width={150}
          height={150}
          className="dark:block hidden"
        /> */}
        </Link>
      </div>
      <h1 className=" text-2xl lg:text-[36px] text-[#1B0354]  font-bold w-full  mb-2 dark:text-white">
        Signup
      </h1>

      <h1 className="text-center font-[600] text-2xl  min-[370px]:text-[28px]">
        Let us know you better
      </h1>
      <span className="block text-center font-[400] text-[14px] mt-2 ">
        Fill the following to continue
      </span>

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
                <FormLabel className="font-semibold ">Business Email</FormLabel>
                <FormControl>
                  <div className="flex items-center w-full relative">
                    <FormInput
                      disabled={isLoading}
                      type="email"
                      {...field}
                      placeholder="Enter Business Email Address"
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
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold ">
                  Company Name (if none add NILL)
                </FormLabel>
                <FormControl>
                  <div className="flex items-center w-full relative">
                    <FormInput
                      disabled={isLoading}
                      type="text"
                      {...field}
                      placeholder="Enter your company name"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold ">Password</FormLabel>
                <FormControl>
                  <div className="flex w-full relative items-center">
                    <FormInput
                      disabled={isLoading}
                      {...field}
                      name="password"
                      type="password"
                      placeholder="Enter Password"
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
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold ">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <div className="flex w-full relative items-center">
                    <FormInput
                      disabled={isLoading}
                      {...field}
                      name="password"
                      type="password"
                      placeholder="Enter Password"
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

          <div className="flex relative items-center [perspective:300px] transform-gpu max-sm:w-full  dark:bg-white  dark:rounded-md">
            <Button
              disabled={isLoading}
              className={cn(
                "w-full rounded-md my-3",
                isLoading ? "[&>div>span]:opacity-0" : ""
              )}
              type="submit"
              spinnerColor="#fff"
            >
              Sign up
            </Button>
            {isLoading && (
              <div className="button--loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        </form>
      </Form>
      <div className="seperator flex items-center space-x-2 my-2 min-[850px]:my-10">
        <span className="seperate h-[1px] bg-[#C7C7C7] w-full" />
        <h4 className="text-gray/80"> Or</h4>
        <span className="seperate h-[1px] bg-[#C7C7C7] w-full" />
      </div>

      <Button
        className=" text-black flex items-center w-full my-3 border-[#C7C7C7]  transition-colors duration-300	border rounded-md bg-[#fff] py-1"
        leftIcon={
          <Image
            src="/assets/google.svg"
            alt="google_logo_icon"
            width={20}
            height={20}
          />
        }
      >
        Continue with Google
      </Button>

      <span className=" w-full text-header  mt-5 md:mt-8 text-sm  relative block text-center md:text-black z-10 dark:text-white">
        Already have an account?
        <Link href="/auth/signin" className="ml-1 underline font-medium">
          Log in
        </Link>
      </span>
    </div>
  );
}

export default SignupForm;
