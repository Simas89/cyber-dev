import { Button, Typography } from "@mui/material";
import { makeLogout } from "api/utils";
import { useAuthContext } from "context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignedInScreen = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);
  return (
    <div>
      <Typography>{user?.email}</Typography>
      <Button variant="contained" onClick={makeLogout}>
        Logout
      </Button>
    </div>
  );
};

export default SignedInScreen;
