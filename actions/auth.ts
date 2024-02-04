"use server";

import { RegistrationSchema, LoginSchema } from "@/schemas";
import * as z from "zod";
import { cookies } from "next/headers";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { jwtDecode } from "jwt-decode";

import Calls from "./calls";

const BaseUrl =
  process.env.BASEURL ?? "https://traverse-pgpw.onrender.com/api/v1";

const $http = Calls(BaseUrl);

export const register = async (values: z.infer<typeof RegistrationSchema>) => {
  const validatedFields = RegistrationSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }
  try {
    const res = await $http.post("/auth/signup", values);
    console.log("Registration successful:", res.data);
    if (res?.status === 201) {
      return {
        success: "Account created successfully, check your email!",
      };
    }
  } catch (e: any) {
    console.log("signup call error from api call", e);
    if (e?.response?.status === 400) {
      return {
        error: "user already exist",
      };
    } else {
      return {
        error: "An error occurred. Please try again later.",
      };
    }
  }
};
