"use server";

import { cookies } from "next/headers";

interface CookiesResponse {
  token: string | null;
}

export const getCookies = async (): Promise<CookiesResponse> => {
  try {
    const authToken = cookies()?.get("access_token")?.value;

    if (authToken) {
      return { token: authToken };
    } else {
      return { token: null };
    }
  } catch (e: any) {
    return { token: null };
  }
};
