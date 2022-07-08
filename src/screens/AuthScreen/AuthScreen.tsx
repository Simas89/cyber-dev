import GameOfLife from "components/GameOfLife";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateSelector } from "state";
import styled from "styled-components";
import { flexCenter } from "util/css";
import { ThemeColors } from "util/theme";
import Form from "./comps/Form";

const Div = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  #form-container {
    position: relative;
    flex: 1;
    ${flexCenter()};
  }
  #bg-container {
    flex: 1;
    background: ${ThemeColors.GRADIENT};
  }
`;

const AuthScreen = () => {
  const isSignedIn = useStateSelector(({ user }) => Boolean(user.data));
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, navigate]);

  return (
    <Div>
      <div id="form-container">
        <Form />
        <GameOfLife />
      </div>
      <div id="bg-container"></div>
    </Div>
  );
};

export default AuthScreen;
