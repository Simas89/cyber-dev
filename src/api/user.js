import { client } from "./client";

export const getUser = () => {
  const path = `/user`;
  return client({
    method: "GET",
    url: path,
  }).then((res) => res.data);
};
