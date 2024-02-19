"use server";

import { cookies } from "next/headers";
import { getCredentials } from "@/auth";

export const checkSession = async () => {
  const authenticated = cookies().has("access_token");

  if (!authenticated) {
    return {
      error: "Unauthorized access",
      status: 401,
    };
  }

  const cookie = cookies();
  // Get the user credentials
  const credentials = await getCredentials(cookie);

  const oneDayInMillis = 24 * 60 * 60 * 1000;
  const currentTime = Date.now();

  // Check if credentials exist and credentials.expires is a valid timestamp
  if (
    credentials &&
    credentials.expires &&
    credentials.expires - currentTime <= oneDayInMillis
  ) {
    cookies().delete("access_token");
    return {
      error: "Unauthorized. Session about to expire within one day.",
      status: 401,
    };
  }

  if (authenticated) {
    return {
      success: "User is Logged in",
      status: 200,
    };
  }
};
