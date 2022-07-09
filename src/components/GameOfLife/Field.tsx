import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateSelector } from "state";
import { useResizeDetector } from "react-resize-detector";
import useGameOfLife from "hooks/useGameOfLife";
import useActionsGameOfLife from "state/actionHooks/useActionsGameOfLife";
import { flexCenter } from "util/css";
import isEqual from "lodash.isequal";
import { FieldGrid, Row } from "./comps";
import { motion } from "framer-motion";

const Div = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  overflow: hidden;
  ${flexCenter()};

  #window {
    position: relative;
  }
`;

const MotionDiv = motion(Div);

const densitySelector = (x: number) => {
  return 25;
  if (x < 600) return 20;
  else if (x < 1000) return 30;
  else if (x < 1700) return 40;
  else return 50;
};

const GameWindow = () => {
  const [canDraw, setCanDraw] = useState(false);
  const { hBlocks, vBlocks, blockSize } = useStateSelector(({ gameOfLife }) => {
    return {
      hBlocks: gameOfLife.value.length,
      vBlocks: gameOfLife.value[0].length,
      blockSize: gameOfLife.blockSize,
    };
  }, isEqual);

  const { width, height, ref } = useResizeDetector();

  const { setHorizontalBlocks, setVerticalBlocks, setBlockSize } =
    useActionsGameOfLife();

  useEffect(() => {
    if (width && height) {
      const drawHBlocks = densitySelector(width);

      const newBlockSize = Math.ceil(width / drawHBlocks);
      const totalVBlocks = Math.ceil(height / newBlockSize);

      setBlockSize(newBlockSize);
      setHorizontalBlocks(drawHBlocks);
      setVerticalBlocks(totalVBlocks);

      setCanDraw(true);
    }
  }, [setVerticalBlocks, setHorizontalBlocks, blockSize, width, height]);

  useGameOfLife();

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div id="window">
        <FieldGrid />
        {canDraw &&
          Array.apply(null, Array(vBlocks)).map((_, idx) => (
            <Row key={"rKey" + idx} length={hBlocks} vBlock={idx} />
          ))}
      </div>
    </MotionDiv>
  );
};

export default GameWindow;
