"use server";

import { cookies } from "next/headers";
import Calls from "./calls";
import { auth } from "@/auth";

const BaseUrl = process.env.BASEURL;

const $http = Calls(BaseUrl);

export const getUser = async () => {
  const authToken = cookies()?.get("access_token")?.value;
  const session = await auth();

  if (session) {
    // @ts-ignore
    cookies()?.set("access_token", session?.user?.token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      path: "/",
      priority: "high",
    });
  }

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
    const res = await $http.get("/auth/me", config);
    if (res.status === 200) {
      return {
        status: "success",
        user: res.data.user,
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};

// reset?token=deec926603a69ac110cad7affe57d19f6a21810adb50674a8f51ae056d5a2729
