"use server";

import axios, { AxiosInstance } from "axios";

const Calls = (
  baseURL: string | undefined = "https://traverse-pgpw.onrender.com/api/v1"
): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: 300000,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
    },
  });
};

export default Calls;
