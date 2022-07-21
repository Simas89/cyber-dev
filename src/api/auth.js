import { client } from "./client";

// ------------------------------------------------

export const makeSignIn = (params) => {
  const path = `/auth/signin`;
  return client({
    method: "POST",
    url: path,
    data: params,
  }).then((res) => res.data);
};

// ------------------------------------------------

export const makeSignUp = (params) => {
  const path = `/auth/signup`;
  return client({
    method: "POST",
    url: path,
    data: params,
  }).then((res) => res.data);
};
