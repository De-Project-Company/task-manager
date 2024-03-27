"use server";

import { cookies } from "next/headers";
import Calls from "./calls";
import { auth } from "@/auth";

const BaseUrl = process.env.BASEURL;

const $http = Calls(BaseUrl);

export const getcomment = async (id: string) => {
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
    const res = await $http.get(`/comment/${id}`, config);
    if (res.status === 200) {
      return {
        status: "success",
        comments: res.data.comments,
      };
    }
  } catch (e: any) {
    // console.log(e);
    return {
      error: e.response.data.message,
    };
  }
};

export const makecomment = async (id: string, comment: string) => {
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

  const commentData = {
    comment,
  };

  try {
    const res = await $http.post(`/comment/${id}`, commentData, config);

    if (res.status === 200) {
      return {
        status: "success",
      };
    }
  } catch (e: any) {
    // console.log(e);
    return {
      error: e.response.data.message,
    };
  }
};
