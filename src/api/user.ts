import { AxiosResponse } from "axios";
import { server } from "./client";
import { AxiosArgs, IUser, ThenArgs } from "./types";

// ------------------------------------------------

type GetUserResponse = Promise<AxiosArgs<ThenArgs<AxiosResponse<IUser>>>>;
type GetUser = () => GetUserResponse;

export const getUser: GetUser = () => {
  const path = `/user`;
  return server({
    method: "GET",
    url: path,
  }).then((res) => res.data);
};

// ------------------------------------------------
