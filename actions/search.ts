"use server";

import { cookies } from "next/headers";
import Calls from "./calls";
import { auth } from "@/auth";

const BaseUrl =
  process.env.BASEURL ?? "https://traverse-pgpw.onrender.com/api/v1";

const $http = Calls(BaseUrl);

export const searchTeam = async (query?: string) => {
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
    const res = await $http.post("/user/search", query, config);
    console.log(res.data);
    const data = res.data;
    return {
      data,
    };
  } catch (e: any) {
    // console.log(e);
    return {
      error: e.response.data.message,
    };
  }
};
