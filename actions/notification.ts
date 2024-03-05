"use server";

import { cookies } from "next/headers";
import Calls from "./calls";
import { GetFromSessionStorage } from "@/utils";

const BaseUrl =
  process.env.BASEURL ?? "https://traverse-pgpw.onrender.com/api/v1";

const $http = Calls(BaseUrl);

export const getnotifications = async () => {
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
    const res = await $http.get("/notification", config);
    if (res.status === 200) {
      return {
        status: "success",
        notifications: res.data.notifications,
      };
    }
  } catch (e: any) {
    console.log(e);
    if (e?.response?.status === 401) {
      return {
        error: "Unauthorized. Please check your access token.",
        status: 401,
      };
    } else if (e?.response?.status === 403) {
      return {
        error: "Forbidden. You don't have permission to create a project.",
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