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
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters long" }),
  email: z.string().email(),
  companyName: z
    .string()
    .min(4, { message: "Company name must be at least 4 characters long" }),
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

export const ForgetPasswordSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
  passwordConfirm: z.string().min(5, {
    message: "Password confirmation must be at least 5 characters long",
  }),
});

export const AddTeamMembersSchema = z.object({
  teamMembers: z
    .array(z.string().email())
    .refine((data) => data.length > 0, {
      message: "At least one email is required",
    })
    .default([]),
  teamMemberEmail: z
    .string()
    .email({ message: "Invalid email format" })
    .nullable(),
});

const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.string(),
});

export const CreateTaskschema = z.object({
  task: taskSchema,
  email: z.string(),
  name: z.string(),
});

export const AddTask = z.object({
  task: taskSchema,
  email: z.string(),
  name: z.string(),
  dueDate: z.date({
    required_error: "DueDate is required.",
  }),
});

// Add calender event zod validation
export const AddEvent = z.object({
  title: z.string(),
  start: z.date(),
  end: z.date(),
  color: z.string(),
});

export const ProjectData = z.object({
  title: z.string(),
  start: z.date(),
  end: z.date(),
  color: z.string(),
});

// title: "",
// description: "",
// price: undefined,
// teamMembers: [],
// startDate: "",
// endDate: "",
