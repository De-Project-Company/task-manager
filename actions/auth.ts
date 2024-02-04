"use server";

import { RegistrationSchema } from "@/schemas";
import * as z from "zod";
import Calls from "./calls";

const BaseUrl = process.env.BASEURL;

const $http = Calls(BaseUrl);

export const register = async (values: z.infer<typeof RegistrationSchema>) => {
  const validatedFeilds = RegistrationSchema.safeParse(values);
  if (!validatedFeilds.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }

  try {
    const res = await $http.post("/auth/signup", validatedFeilds.data);
    console.log(res);
    return res.data;
  } catch (error) {}
};
