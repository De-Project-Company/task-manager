"use server";

import { cookies } from "next/headers";
import Calls from "./calls";
import { auth } from "@/auth";

export const uploadFiles = async (
  values: any,
  projectId: string | undefined
) => {
  // token
  const authToken = cookies()?.get("access_token")?.value;
  const BaseUrl = process.env.BASEURL;
  const $http = Calls(BaseUrl);

  if (!authToken) {
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
      `/project/${projectId}/uploadFile`,
      values,
      config
    );

    if (res?.status === 201) {
      return {
        success: "Document uploaded successfully !!",
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};
