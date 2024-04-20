/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useTransition } from "react";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { activateASchema } from "@/schemas";
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
import { activateUser } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { DEFAULT_SIGNUP_REDIRECT } from "@/routes";
import { useStateCtx } from "@/context/StateCtx";

const ActivateForm = () => {
  const router = useRouter();
  const { setOTPModal } = useStateCtx();

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof activateASchema>>({
    resolver: zodResolver(activateASchema),
    defaultValues: {
      licence: "",
    },
  });

  const onSubmit = (values: z.infer<typeof activateASchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      activateUser(values).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
        if (data?.success) {
          setTimeout(() => {
            setSuccess("Redirecting....");
          }, 1000);
          setTimeout(() => {
            setOTPModal(false);
            router.push(DEFAULT_SIGNUP_REDIRECT);
          }, 2000);
        }
      });
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          action=""
          className="flex flex-col mt-4 z-10 gap-y-2 md:gap-y-6 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="licence"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold ">
                  {" "}
                  Licence Number
                </FormLabel>
                <FormControl>
                  <div className="flex items-center w-full relative">
                    <FormInput
                      disabled={isLoading}
                      {...field}
                      placeholder="Enter Licence Number"
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
                "w-full rounded-md my-3",
                isLoading ? "[&>div>span]:opacity-0" : ""
              )}
              type="submit"
              spinnerColor="#fff"
            >
              Activate Account
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
};

export default ActivateForm;
