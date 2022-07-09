import styled from "styled-components";
import { ThemeColors } from "util/theme";
import { motion } from "framer-motion";
import { FormType, useFormContext } from "../context";
import { useEffect, useRef, useState } from "react";

const Div = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: blue; */
  z-index: -1;

  #stripe-a {
    background-color: ${ThemeColors.ALICE_BLUE};
    height: 500px;
    top: -30px;
    left: -20px;
    opacity: 0.8;
  }

  #stripe-b {
    background: ${ThemeColors.CADE_BLUE};
    height: 500px;
    left: 20px;
    top: -30px;
    opacity: 0.6;
    z-index: 1;
  }

  #stripe-c {
    background-color: ${ThemeColors.ALICE_BLUE};
    height: 500px;
    left: 20px;
    top: -30px;
    opacity: 0.8;
  }
`;
const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  backdrop-filter: blur(5px);
`;

const Absolute = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const MotionDiv = motion(Div);
const MotionAbsolute = motion(Absolute);

export const Background = () => {
  const [isThin, setIsThin] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const { formType, isSuccess } = useFormContext();
  const isForm = formType === FormType.signIn;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formType === FormType.signUp) {
      setIsThin(false);
    }
  }, [formType]);

  useEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current.offsetWidth);
    }
  }, []);
  return (
    <MotionDiv
      ref={ref}
      animate={{ scale: isSuccess ? 5 : 1, opacity: isSuccess ? 0 : 1 }}
      transition={{ type: "spring" }}
    >
      <MotionAbsolute
        id="stripe-a"
        initial={{ x: containerWidth, rotateZ: 20, width: 0 }}
        animate={{
          x: isForm ? containerWidth : "0px",
          width: isThin ? 0 : "20px",
        }}
        transition={{
          type: "spring",
          stiffness: 20,
          damping: 10,
          restDelta: 0.001,
          restSpeed: 0.001,
        }}
      />
      <MotionAbsolute
        id="stripe-b"
        initial={{ x: containerWidth * 0.78, rotateZ: 20, width: 0 }}
        animate={{
          x: isForm ? containerWidth * 0.78 : "0px",
          width: isThin ? 0 : "30px",
        }}
        transition={{
          delay: 0.3,
          type: "spring",
          stiffness: 20,
          damping: 10,
          restDelta: 0.001,
          restSpeed: 0.001,
        }}
      />

      <MotionAbsolute
        id="stripe-c"
        initial={{ x: containerWidth * 0.62, rotateZ: 20, width: 0 }}
        animate={{
          x: isForm ? containerWidth * 0.62 : "50px",
          width: isThin ? 0 : "40px",
        }}
        transition={{
          delay: 0.6,
          type: "spring",
          stiffness: 20,
          damping: 10,
          restDelta: 0.001,
          restSpeed: 0.001,
        }}
      />
      <Blur />
    </MotionDiv>
  );
};
