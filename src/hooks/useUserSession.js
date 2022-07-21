import { useEffect, useState } from "react";
import { getUser } from "api/user";
import { getToken, makeLogout } from "api/utils";
import { useAuthContext } from "context/authContext";

const useUserSession = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useAuthContext();

  useEffect(() => {
    const token = getToken();
    if (token) {
      getUser()
        .then((res) => setUser(res))
        .catch(() => makeLogout())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [setUser]);

  return isLoading;
};

export default useUserSession;
