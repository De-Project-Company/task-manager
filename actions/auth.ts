"use server";

import {
  RegistrationSchema,
  LoginSchema,
  activateASchema,
  ForgetPasswordSchema,
  ResetPasswordSchema,
} from "@/schemas";
import * as z from "zod";
import { cookies } from "next/headers";
import { setCookie, deleteCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { UserDetails } from "@/types";
import Calls from "./calls";
import { DeleteFromSessionStorage, GetFromSessionStorage } from "@/utils";

const cookie = cookies();
const BaseUrl = process.env.BASEURL;

const $http = Calls(BaseUrl);

export const register = async (values: z.infer<typeof RegistrationSchema>) => {
  const validatedFields = RegistrationSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }

  const password = validatedFields.data.password;

  const confirmPassword = validatedFields.data.passwordConfirm;

  if (password !== confirmPassword) {
    return {
      error: "Password and Confirm Password do not match.",
    };
  }

  try {
    const res = await $http.post("/auth/signup", values);
    if (res?.status === 201) {
      return {
        success: "Account created successfully, check your email!",
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Login Failed. Please check your email and password.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const data = await fetch(`${BaseUrl}/auth/signin`, {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        Connection: "keep-alive",
        credentials: "include",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });
    const res = await data.json();

    if (data.status === 200 || res.ok) {
      cookie.set("access_token", res.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        path: "/",
        priority: "high",
      });
      cookies()?.set("access_token", res.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        path: "/",
        priority: "high",
      });
      setCookie("access_token", res.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        path: "/",
        priority: "high",
      });
      cookie.set("access_token", res.token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        path: "/",
        priority: "high",
      });
      const user = {
        id: res.data.user._id,
        name: res.data.user.name,
        email: res.data.user.email,
        companyName: res.data.user.companyName,
        website: res.data.user.website,
        role: res.data.user.role,
        // createdAt: res.user.createdAt,
      };

      const token = res.token;

      cookie.set("user", JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 1, // 1 day
        httpOnly: true,
        path: "/",
        priority: "high",
      });

      const decodedToken = jwtDecode(res.token) as UserDetails;
      if (decodedToken) {
        const userId = {
          UserId: decodedToken.UserId,
          token: res.token,
        };
        cookie.set("userId", JSON.stringify(userId), {
          maxAge: 60 * 60 * 24 * 1, // 1 day
          path: "/",
          priority: "high",
        });
      }

      return {
        user,

        res,
        token,
        success: "Login successful!",
        // redirect: DEFAULT_LOGIN_REDIRECT,
      };
    }
    if (data.status === 400) {
      return {
        error: "Email or Phone number already exist",
      };
    }
    if (data.status === 404) {
      return {
        error: "User not found, sign up instead!",
      };
    }
    if (data.status === 500) {
      return {
        error: "Something went wrong.",
      };
    }

    return {
      error: res.message,
    };
  } catch (error) {
    return {
      error: "Something went wrong.",
    };
  }
};

export const activateUser = async (values: z.infer<typeof activateASchema>) => {
  const validatedFields = activateASchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }

  try {
    const res = await $http.post("/auth/activate", values);

    if (res?.status === 200) {
      cookie.set("activation_token", res.data.token, {
        maxAge: 60 * 60 * 24 * 1, // 1 day
        httpOnly: true,
        path: "/",
        priority: "high",
      });
      return {
        success: "Account created successfully!",
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};

export const ForgetPassword = async (values: z.infer<typeof ForgetPasswordSchema>) => {
  const validatedFields = ForgetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }

  try {
    const res = await $http.post("/auth/forgotPassword", values);

    if (res?.status === 200) {
      return {
        success: "Token sent to email",
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};

export const ResetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>,
  token?: string
) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Validation failed. Please check your input.",
    };
  }

  const password = validatedFields.data.password;

  const confirmPassword = validatedFields.data.passwordConfirm;

  if (password !== confirmPassword) {
    return {
      error: "Password and Confirm Password do not match.",
    };
  }

  try {
    const res = await $http.patch(`/auth/resetPassword/${token}`, values);

    if (res?.status === 200) {
      return {
        success: "Password changed succesfully",
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};

export const signOut = async () => {
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
    const res = await $http.get("/auth/signout", config);

    if (res?.status === 200) {
      cookie.delete("access_token");
      DeleteFromSessionStorage("access_token");
      return {
        success: "Sign-out successful",
      };
    }
  } catch (e: any) {
    return {
      error: e.response.data.message,
    };
  }
};