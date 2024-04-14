"use server";

import { cookies } from "next/headers";
import Calls from "./calls";
import { auth } from "@/auth";

const BaseUrl = process.env.BASEURL;

const $http = Calls(BaseUrl);

export const uploadFile = async (projectId: string, file: File) => {
  const authToken = cookies()?.get("access_token")?.value;
  const session = await auth();

  if (!authToken && !session) {
    return {
      error: "Unauthorized. Missing access token.",
      status: 401,
    };
  }

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await $http.post(
      `/project/${projectId}/uploadFile`,
      formData,
      config
    );

    if (res.status === 200) {
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
