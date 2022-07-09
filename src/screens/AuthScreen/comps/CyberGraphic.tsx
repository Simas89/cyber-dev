import styled from "styled-components";
import Lottie from "lottie-react";
import cyberAnimation from "assets/lottie/cyber.json";
// import cyberAnimation from "assets/lottie/sci-fi.json";
import { flexCenter } from "util/css";

const Div = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  ${flexCenter()};
  /* transform: translateX(-50%); */
`;

export const CyberGraphic = () => {
  return (
    <Div>
      <Lottie animationData={cyberAnimation} loop={true} />
    </Div>
  );
};
