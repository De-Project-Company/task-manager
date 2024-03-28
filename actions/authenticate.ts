"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import * as z from "zod";

export async function authenticate(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }

  const { email, password } = validatedFields.data;

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
