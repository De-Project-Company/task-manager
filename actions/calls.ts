import axios, { AxiosInstance } from "axios";

const Calls = (
  baseURL: string | undefined = "https://traverse-pgpw.onrender.com/api/v1",
  authorization?: string
): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      Connection: "keep-alive",
      credentials: "include",
      Authorization: authorization || "",
    },
    withCredentials: true,
  });
};

export default Calls;
