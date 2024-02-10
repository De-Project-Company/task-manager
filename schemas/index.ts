import * as z from "zod";

type requestDemoData = {
  name: string;
  email: string;
  message: string;
};

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

export const RequestADemoSchema: z.ZodType<requestDemoData> = z.object({
  name: z.string().min(3, { message: "Minimum of 3 characters required" }),
  email: z.string().email(),
  message: z
    .string()
    .min(15, { message: "Must be atleast 15 characters long" }),
});

export const activateASchema = z.object({
  licence: z
    .string()
    .min(3, { message: "license must be at least 3 characters long" }),
});

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  teamMembers: z.array(z.string()),
  startDate: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Invalid date format.",
    }),
  endDate: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Invalid date format.",
    }),
});

export const RequestSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at  3 characters required" }),
  email: z.string().email(),
  message: z
    .string()
    .min(15, { message: "Must be atleast 15 characters long" }),
});
