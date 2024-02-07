import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, {
    message: "Password is required",
  }),
});

export const createProjectSchema = z.object({
  name: z.string().min(3),
  summary: z.string().min(10),
  objective: z.string(),
  currentPhase: z.string(),
});

export const RegistrationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  companyName: z.string(),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
  passwordConfirm: z.string().min(5, {
    message: "Password confirmation must be at least 5 characters long",
  }),
});

export const RequestADemoSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string().min(15, {message: "Must be atleast 15 characters long"})
})
