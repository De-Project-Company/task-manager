"use server";

import { AddTask } from "@/schemas";
import * as z from "zod";
import { cookies } from "next/headers";
import Calls from "./calls";
import { auth } from "@/auth";

const BaseUrl = process.env.BASEURL;

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
  const session = await auth();

  if (!authToken && !session) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }
  // @ts-ignore
  const token = session?.user?.token;

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || token}`,
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
  const session = await auth();

  if (!authToken && !session) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }
  // @ts-ignore
  const token = session?.user?.token;

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || token}`,
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
    return {
      error: e.response.data.message,
    };
  }
};

export const getTask = async (projectId?: string) => {
  const authToken = cookies()?.get("access_token")?.value;
  const session = await auth();

  if (!authToken && !session) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }
  // @ts-ignore
  const token = session?.user?.token;

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || token}`,
    },
  };

  try {
    const res = await $http.get(`/project/tasks`, config);
    if (res.status === 200) {
      return {
        success: "Project Accepted successfully",
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};

export const getAllTask = async () => {
  const authToken = cookies()?.get("access_token")?.value;
  const session = await auth();

  if (!authToken && !session) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }
  // @ts-ignore
  const token = session?.user?.token;

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || token}`,
    },
  };

  try {
    const res = await $http.get("/project/tasks", config);
    if (res.status === 200) {
      return {
        status: "success",
        tasks: res.data.tasks,
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};

export const updateTaskStatus = async (
  taskId: string,
  projectId: string,
  newStatus?: string
) => {
  const authToken = cookies()?.get("access_token")?.value;
  const session = await auth();

  if (!authToken && !session) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }
  // @ts-ignore
  const token = session?.user?.token;

  // console.log(taskId);

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || token}`,
    },
  };
  const requestBody = {
    status: newStatus,
  };

  try {
    const res = await $http.post(
      `/project/${projectId}/update-task-status?taskId=${taskId}`,
      requestBody,
      config
    );

    if (res.status === 200) {
      return {
        status: "success",
        project: res.data.project,
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};
