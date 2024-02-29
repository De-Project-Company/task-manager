"use server";

import { CreateTaskschema } from "@/schemas";
import * as z from "zod";
import { cookies } from "next/headers";
import Calls from "./calls";
import { GetFromSessionStorage } from "@/utils";

const BaseUrl =
  process.env.BASEURL ?? "https://traverse-pgpw.onrender.com/api/v1";

const $http = Calls(BaseUrl);

export const assignTask = async (
  values: z.infer<typeof CreateTaskschema>,
  projectId: string
) => {
  const validatedFields = CreateTaskschema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }

  const authToken = cookies()?.get("access_token")?.value;
  const hasToken = GetFromSessionStorage("access_token");

  if (!authToken && !hasToken) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || hasToken}`,
    },
  };

  try {
    const res = await $http.patch(
      `/project/${projectId}/assignTask`,
      values,
      config
    );

    if (res?.status === 200) {
      return {
        success: "Task assigned successfully!",
      };
    }
  } catch (e: any) {
    console.log(e);
    if (e?.response?.status === 401) {
      return {
        error: "Unauthorized. Please check your access token.",
      };
    } else if (e?.response?.status === 403) {
      return {
        error: "Forbidden. You don't have permission to assign a task.",
      };
    } else if (e?.response?.status === 404) {
      return {
        error: "Not Found. The requested endpoint was not found.",
      };
    } else {
      return {
        error: "An error occurred. Please try again later.",
      };
    }
  }
};
