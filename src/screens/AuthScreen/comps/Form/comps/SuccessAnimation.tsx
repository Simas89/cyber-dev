import Lottie from "lottie-react";
import successAnimation from "assets/lottie/success.json";
import styled from "styled-components";
import { motion } from "framer-motion";
import { flexCenter } from "util/css";
import { useFormContext } from "../context";
import { useEffect, useState } from "react";

const Div = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  padding: 50px;
  ${flexCenter()};
`;

const MotionDiv = motion(Div);

export const SuccessAnimation = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { isSuccess } = useFormContext();

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsEnabled(true);
        clearTimeout(timer);
      }, 750);
    }
  }, [isSuccess]);

  if (!isEnabled) return null;

  return (
    <MotionDiv
      initial={{ y: -200, opacity: 0 }}
      animate={{ y: isSuccess ? 0 : -200, opacity: isSuccess ? 1 : 0 }}
    >
      <Lottie animationData={successAnimation} loop={false} />
    </MotionDiv>
  );
};
