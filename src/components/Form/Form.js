import { useState } from "react";
import styled from "styled-components";
import { TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { themeColors } from "util/theme";
import { makeSignIn, makeSignUp } from "api/auth";
import { setToken } from "api/utils";
import { useAuthContext } from "context/authContext";

const StyledForm = styled.form`
  position: relative;
  max-width: 400px;
  margin: 10px;
  flex: 1;
  border-radius: 20px;
  border: 1px solid ${themeColors.ALICE_BLUE};
  padding: 30px;
  background: ${themeColors.CULTURED};
  filter: drop-shadow(0px 0px 37px rgba(7, 46, 91, 0.23));

  #action {
    color: ${themeColors.ORANGE} !important;
    font-weight: 600;
    cursor: pointer;
  }

  #btn-container {
    display: flex;
    justify-content: center;
    max-width: 150px;
  }
`;

const Form = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    server: "",
  });

  const { setUser } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({
      email: "",
      password: "",
      repeatPassword: "",
      server: "",
    });

    let hasError = false;

    if (!email || !RegExp(/^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$/).test(email)) {
      setErrors((state) => {
        return { ...state, email: "Please enter a valid email" };
      });
      hasError = true;
    }

    if (password.length < 3) {
      setErrors((state) => {
        return { ...state, password: "Must contain a minimum of 6 characters" };
      });
      hasError = true;
    }

    if (isSignUp && password !== repeatPassword) {
      setErrors((state) => {
        return { ...state, repeatPassword: "Passwords must match" };
      });
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setIsLoading(true);

    if (isSignUp) {
      makeSignUp({ email, password, repeatPassword })
        .then((res) => {
          setToken(res.token);
          setUser(res.user);
        })
        .catch((err) =>
          setErrors((state) => {
            return { ...state, server: err?.message || "Server error" };
          })
        )
        .finally(() => setIsLoading(false));
    } else {
      makeSignIn({ email, password })
        .then((res) => {
          setToken(res.token);
          setUser(res.user);
        })
        .catch((err) =>
          setErrors((state) => {
            return { ...state, server: err?.message || "Server error" };
          })
        )
        .finally(() => setIsLoading(false));
    }

    console.log("HIT");
  };

  const changeFormType = () => {
    setIsSignUp(!isSignUp);
    setErrors({
      email: "",
      password: "",
      repeatPassword: "",
      server: "",
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Typography variant="h5" color={themeColors.PRUSSIAN_BLUE}>
        <b>Sign-{isSignUp ? "up" : "in"}</b>
      </Typography>
      <div className="spacer-30" />
      <TextField
        label="Email"
        fullWidth
        id="email"
        name="email"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        error={errors.email}
        helperText={errors.email}
      />
      <div className="spacer-20" />
      <TextField
        label="Password"
        fullWidth
        id="password"
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        error={errors.password}
        helperText={errors.password}
      />
      {isSignUp && (
        <>
          <div className="spacer-20" />
          <TextField
            label="Repeat password"
            fullWidth
            id="repeat-password"
            name="repeat-password"
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            error={errors.repeatPassword}
            helperText={errors.repeatPassword}
          />
        </>
      )}
      {errors.server && (
        <>
          <div className="spacer-20" />
          <Typography textAlign="center" color="error" variant="body2">
            {errors.server}
          </Typography>
        </>
      )}
      <div className="spacer-20" />
      <div id="btn-container">
        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          loading={isLoading}
        >
          Submit
        </LoadingButton>
      </div>
      <div className="spacer-10" />
      <Typography textAlign="left">
        Need an account?{" "}
        <span id="action" onClick={changeFormType}>
          Sign{isSignUp ? "In" : "Up"}
        </span>
      </Typography>
    </StyledForm>
  );
};

export default Form;
