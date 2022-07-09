import { useCallback, memo } from "react";
import useActionsGameOfLife from "state/actionHooks/useActionsGameOfLife";
import { useStateSelector } from "state";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { flexCenter } from "util/css";
import isEqual from "lodash.isequal";
import { ThemeColors } from "util/theme";

interface DivProps {
  isAlive: boolean;
  blockSize: number;
}

const Div = styled.div<DivProps>`
  border-radius: 20%;
  ${flexCenter()};

  background: ${({ isAlive }) =>
    isAlive ? ThemeColors.CADE_BLUE : "rgba(0, 0, 0, 0)"};

  ${({ blockSize }) => css`
    width: ${blockSize}px;
    height: ${blockSize}px;
  `};
`;

const MotionDiv = motion(Div);

interface BlockProps {
  hBlock: number;
  vBlock: number;
}

export const Block = memo<BlockProps>(({ hBlock, vBlock }) => {
  const { isAlive, blockSize } = useStateSelector(({ gameOfLife }) => {
    return {
      isAlive: gameOfLife.value[hBlock][vBlock].isAlive,
      blockSize: gameOfLife.blockSize,
    };
  }, isEqual);

  const { setAlive } = useActionsGameOfLife();

  const handleMouseEnter = useCallback(() => {
    setAlive({ vBlock, hBlock, alive: true });
  }, []);

  return (
    <MotionDiv
      initial={{ opacity: 0.2 }}
      animate={{
        opacity: isAlive ? 0.7 : 0.2,
      }}
      transition={{ duration: isAlive ? 2 : 0 }}
      onMouseEnter={handleMouseEnter}
      isAlive={isAlive}
      blockSize={blockSize}
    ></MotionDiv>
  );
});
