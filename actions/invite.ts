"use server";

import { cookies } from "next/headers";
import Calls from "./calls";

const BaseUrl =
  process.env.BASEURL ?? "https://traverse-pgpw.onrender.com/api/v1";

const $http = Calls(BaseUrl);

export const acceptInvite = async (projectId?: string) => {
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
    const res = await $http.get(`/project/accept?id=${projectId}`, config);
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
