"use server";

import { cookies } from "next/headers";
import Calls from "./calls";
import { GetFromSessionStorage } from "@/utils";

const BaseUrl =
  process.env.BASEURL ?? "https://traverse-pgpw.onrender.com/api/v1";

const $http = Calls(BaseUrl);

export const createEvent = async (values: {} | any) => {
  const authToken = cookies()?.get("access_token")?.value;
  const hasToken = GetFromSessionStorage("access_token");
  if (!authToken && !hasToken) {
    return {
      error: "You are not authorized, Missing access token",
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
    const res = await $http.post("/calendar", values, config);
    if (res?.status === 200) {
      return {
        success: "Event created sucessfully",
      };
    }
  } catch (e: any) {
    console.log(e);
    if (e?.response?.status === 401) {
      error: "Unauthorized. Please check your access token.";
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

export const getAllEvents = async () => {
  const authToken = cookies()?.get("access_token")?.value;
  const hasToken = GetFromSessionStorage("access_token");
  if (!authToken && !hasToken) {
    return {
      error: "You are not authorized, Missing access token",
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
    const res = await $http.get("/calendar", config);

    if (res.status === 200) {
      console.log(res);
      return {
        status: "success",
        event: res.data.calendar,
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
        error: "Forbidden. You don't have permission to create a new event.",
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