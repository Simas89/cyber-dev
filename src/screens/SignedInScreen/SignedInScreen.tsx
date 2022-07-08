import { makeLogout } from "api/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateSelector } from "state";

const SignedInScreen = () => {
  const { user, isSessionLoading } = useStateSelector(({ user }) => {
    return {
      user: user.data,
      isSessionLoading: user.isSessionLoading,
    };
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!Boolean(user) && !isSessionLoading) {
      navigate("/auth");
    }
  }, [user, isSessionLoading, navigate]);

  return (
    <div>
      {user?.email}
      <button onClick={makeLogout}>Logout</button>
    </div>
  );
};

export default SignedInScreen;
