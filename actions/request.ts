"use server";

import Calls from "./calls";
import * as z from "zod";
import { RequestSchema } from "@/schemas";

const BaseUrl = process.env.BASEURL;

const $http = Calls(BaseUrl);

export const requestDemo = async (values: z.infer<typeof RequestSchema>) => {
  const validatedFields = RequestSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }
  try {
    const res = await $http.post("/request", values);
    console.log("Registration successful:", res.data);
    if (res?.status === 201) {
      return {
        success: "Request has been submitted successfully.",
      };
    }
  } catch (e: any) {
    console.log("signup call error from api call", e);
    if (e?.response?.status === 400) {
      return {
        error: "this email already exist",
      };
    } else {
      return {
        error: "An error occurred. Please try again later.",
      };
    }
  }
};
