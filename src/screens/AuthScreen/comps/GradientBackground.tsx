import { useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Div = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;

const MotionDiv = motion(Div);

const generateRandom = (maxLimit: number) => {
  let rand = Math.random() * maxLimit;

  rand = Math.floor(rand);

  return rand;
};

export const GradientBackground = () => {
  const mv = useMotionValue(
    `linear-gradient(100deg, #E62E78 0.01%, #FD5630 98.53%)`
  );

  const background = useSpring(mv, { damping: 150 });

  useEffect(() => {
    const interval = setInterval(() => {
      const deg = generateRandom(360);

      background.set(`linear-gradient(${deg}deg, #E62E78 0%, #FD5630 100%)`);
    }, 5000);

    return () => clearInterval(interval);
  }, [background]);

  return (
    <MotionDiv
      style={{
        background,
      }}
    />
  );
};
