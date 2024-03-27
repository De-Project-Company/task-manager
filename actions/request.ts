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
    if (res?.status === 201) {
      return {
        success: "Request has been submitted successfully.",
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};
