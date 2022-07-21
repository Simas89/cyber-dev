import Form from "components/Form";
import { useAuthContext } from "context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { themeColors } from "util/theme";

const Div = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  #left-container {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #right-container {
    position: relative;
    flex: 1;
    overflow: hidden;
    background: ${themeColors.GRADIENT};
  }
`;

const AuthScreen = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Div>
      <div id="left-container">
        <Form />
      </div>
      <div id="right-container"></div>
    </Div>
  );
};

export default AuthScreen;
