"use server";

import { ProjectSchema } from "@/schemas";
import * as z from "zod";
import { cookies } from "next/headers";
import Calls from "./calls";

const cookie = cookies();
const BaseUrl =
  process.env.BASEURL ?? "https://traverse-pgpw.onrender.com/api/v1";

const $http = Calls(BaseUrl);

export const CreateProject = async (values: any) => {
  const authToken = cookies()?.get("access_token")?.value;

  if (!authToken) {
    return {
      error: "Unauthorized. Missing access token.",
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
    const res = await $http.post("/project", values, config);
    console.log("Registration successful:", res.data);
    if (res?.status === 201) {
      return {
        success: "Project created successfully, check your email!",
      };
    }
  } catch (e: any) {
    console.log("signup call error from api call", e);
    if (e?.response?.status === 401) {
      return {
        error: "Unauthorized. Please check your access token.",
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
