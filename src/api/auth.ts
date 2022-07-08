import { AxiosResponse } from "axios";
import { server } from "./client";
import { AxiosArgs, ThenArgs, IUser } from "./types";

interface IAuthUser {
  token: string;
  user: IUser;
}

// ------------------------------------------------

type MakeSignInResponse = Promise<
  AxiosArgs<ThenArgs<AxiosResponse<IAuthUser>>>
>;
type MakeSignIn = (a: {
  email: string;
  password: string;
}) => MakeSignInResponse;

export const makeSignIn: MakeSignIn = (params) => {
  const path = `/auth/signin`;
  return server({
    method: "POST",
    url: path,
    data: params,
  }).then((res) => res.data);
};

// ------------------------------------------------

type MakeSignUpResponse = Promise<
  AxiosArgs<ThenArgs<AxiosResponse<IAuthUser>>>
>;
type MakeSignUp = (a: {
  email: string;
  password: string;
}) => MakeSignUpResponse;

export const makeSignUp: MakeSignUp = (params) => {
  const path = `/auth/signup`;
  return server({
    method: "POST",
    url: path,
    data: params,
  }).then((res) => res.data);
};
