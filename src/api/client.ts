import axios from "axios";
import { serverBaseURL } from "config";
import { getAuthHeaders, makeLogout } from "./utils";

export const server = axios.create({
  baseURL: serverBaseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

server.interceptors.request.use((request) => {
  const authHeaders = getAuthHeaders();

  request.headers = {
    ...authHeaders,
    ...request.headers,
  };
  return request;
});

server.interceptors.response.use(
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
