import GameOfLife from "components/GameOfLife";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateSelector } from "state";
import styled from "styled-components";
import { flexCenter } from "util/css";
import { CyberGraphic, GradientBackground } from "./comps";
import Form from "./comps/Form";

const Div = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  #left-container {
    position: relative;
    flex: 1;
    ${flexCenter()};
  }
  #right-container {
    position: relative;
    flex: 1;
    overflow: hidden;
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
      <div id="left-container">
        <Form />
        <GameOfLife />
      </div>
      <div id="right-container">
        <GradientBackground />
        {/* <CyberGraphic /> */}
      </div>
    </Div>
  );
};

export default AuthScreen;
