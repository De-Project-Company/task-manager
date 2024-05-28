"use server";

import { cookies } from "next/headers";
import Calls from "./calls";
import { auth } from "@/auth";

const BaseUrl = process.env.BASEURL;
const $http = Calls(BaseUrl);
{
  /* Create Project */
}
export const CreateProject = async (values: any) => {
  const authToken = cookies()?.get("access_token")?.value;
  const session = await auth();

  if (!authToken && !session) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }
  // @ts-ignore
  const token = session.user.accessToken;

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || token}`,
    },
  };
  try {
    const res = await $http.post("/project", values, config);
    if (res?.status === 200) {
      return {
        success: "Project created successfully, check your email!",
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};

export const getProject = async () => {
  const authToken = cookies()?.get("access_token")?.value;
  const session = await auth();

  if (!authToken && !session) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }
  // @ts-ignore
  const token = session.user.accessToken;

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || token}`,
    },
  };

  try {
    const res = await $http.get("/project", config);
    if (res.status === 200) {
      return {
        status: "success",
        project: res.data.projects,
        count: res.data.count,
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};

export const AddMembers = async (
  values: { teamMembers: string[] },
  projectId: string
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
  const token = session.user.accessToken;

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || token}`,
    },
  };
  try {
    const res = await $http.post(
      `/project/${projectId}/addMember`,
      values,
      config
    );
    if (res.status === 200) {
      return {
        status: "Team members added successfully",
        success: "Team members added successfully",
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};

export const getPojectdetails = async (id: string) => {
  const authToken = cookies()?.get("access_token")?.value;
  const session = await auth();

  if (!authToken && !session) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }
  // @ts-ignore
  const token = session.user.accessToken;

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || token}`,
    },
  };
  try {
    const res = await $http.get(`/project/${id}`, config);
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

export const deleteProject = async (projectId: string) => {
  const authToken = cookies()?.get("access_token")?.value;
  const session = await auth();

  if (!authToken && !session) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }
  // @ts-ignore
  const token = session.user.accessToken;

  const config = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${authToken || token}`,
    },
  };

  try {
    const res = await $http.delete(`/project/${projectId}`, config);

    if (res.status === 204) {
      return {
        status: "success",
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};

export const updateProjectStatus = async (
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
  const token = session.user.accessToken;

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
    const res = await $http.patch(`/project/${projectId}`, requestBody, config);

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
