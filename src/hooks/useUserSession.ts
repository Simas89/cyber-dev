import { useLayoutEffect, useState } from "react";
import { getUser } from "api/user";
import { getToken } from "api/utils";
import { useQuery } from "react-query";
import { ServerError } from "api/types";
import useActionsUser from "state/actionHooks/useActionsUser";
import { useStateSelector } from "state";

const useUserSession = () => {
  const [hasToken, setHasToken] = useState(false);
  const isSessionLoading = useStateSelector(
    ({ user }) => user.isSessionLoading
  );

  const { setIsSessionLoading, setUserData } = useActionsUser();

  useQuery("user", getUser, {
    onSuccess: (res) => {
      setUserData(res);
      setIsSessionLoading(false);
    },
    onError: (err: ServerError) => {
      setIsSessionLoading(false);
    },
    retry: 0,
    enabled: hasToken,
  });

  useLayoutEffect(() => {
    const token = getToken();
    if (token) {
      setHasToken(true);
    } else {
      setIsSessionLoading(false);
    }
  }, [setIsSessionLoading]);

  return isSessionLoading;
};

export default useUserSession;
