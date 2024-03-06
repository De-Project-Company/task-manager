"use server";

import { cookies } from "next/headers";
import Calls from "./calls";

const BaseUrl =
  process.env.BASEURL ?? "https://traverse-pgpw.onrender.com/api/v1";

const $http = Calls(BaseUrl);

export const getcomment = async (id: string) => {
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
    const res = await $http.get(`/comment/${id}`, config);
    if (res.status === 200) {
      return {
        status: "success",
        comments: res.data.comments,
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

export const makecomment = async (id: string, comment: string) => {
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

  const commentData = {
    comment,
  };

  try {
    const res = await $http.post(`/comment/${id}`, commentData, config);

    if (res.status === 201) {
      return {
        status: "success",
        // comment: res.data.comment, // Assuming the server returns the created comment
      };
    }
  } catch (e: any) {
    console.error(e);

    if (e?.response?.status === 401) {
      return {
        error: "Unauthorized. Please check your access token.",
        status: 401,
      };
    } else if (e?.response?.status === 403) {
      return {
        error: "Forbidden. You don't have permission to create a comment.",
      };
    } else if (e?.response?.status === 404) {
      return {
        error: "Not Found. The project or comment endpoint was not found.",
      };
    } else {
      return {
        error: "An error occurred. Please try again later.",
      };
    }
  }
};
