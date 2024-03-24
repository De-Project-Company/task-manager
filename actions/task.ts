"use server";

import { AddTask } from "@/schemas";
import * as z from "zod";
import { cookies } from "next/headers";
import Calls from "./calls";

const BaseUrl =
  process.env.BASEURL ?? "https://traverse-pgpw.onrender.com/api/v1";

const $http = Calls(BaseUrl);

export const assignTask = async (
  values: z.infer<typeof AddTask>,
  projectId: string
) => {
  const validatedFields = AddTask.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }

  const authToken = cookies()?.get("access_token")?.value;

  if (!authToken) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const res = await $http.patch(
      `/project/${projectId}/assignTask`,
      values,
      config
    );

    // console.log(res);

    if (res?.status === 200) {
      return {
        success: "Task assigned successfully!",
      };
    }
  } catch (e: any) {
    // console.log(e);
    return {
      error: e.response.data.message,
    };
  }
};

export const CreateTask = async (
  values: z.infer<typeof AddTask>,
  projectId: string
) => {
  const validatedFields = AddTask.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }

  const authToken = cookies()?.get("access_token")?.value;

  if (!authToken) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken}`,
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

export const getTask = async (projectId?: string) => {
  const authToken = cookies()?.get("access_token")?.value;

  if (!authToken) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const res = await $http.get(`/project/tasks`, config);
    // console.log(res);
    if (res.status === 200) {
      return {
        success: "Project Accepted successfully",
      };
    }
  } catch (e: any) {
    // console.log(e.response.data);
    return {
      error: e.response.data.message,
    };
  }
};
