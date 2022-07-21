import axios from "axios";
import { getAuthHeaders, makeLogout } from "./utils";

export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((request) => {
  const authHeaders = getAuthHeaders();

  request.headers = {
    ...authHeaders,
    ...request.headers,
  };
  return request;
});

client.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response) {
      if (err.response.status === 401) {
        makeLogout();
      }
    }

    return Promise.reject(err.response?.data);
  }
);
