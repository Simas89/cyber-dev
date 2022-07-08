import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateSelector } from "state";
import { useResizeDetector } from "react-resize-detector";
import useGameOfLife from "hooks/useGameOfLife";
import useActionsGameOfLife from "state/actionHooks/useActionsGameOfLife";
import { flexCenter } from "util/css";
import isEqual from "lodash.isequal";
import { FieldGrid, Row } from "./comps";

const FieldDiv = styled.div`
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

const densitySelector = (x: number) => {
  return 50;
  if (x < 600) return 20;
  else if (x < 1000) return 30;
  else if (x < 1700) return 40;
  else return 50;
};

const GameWindow = () => {
  const [drawHBlocks, setDrawHBlocks] = useState(1);
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
      const newBlockSize = Math.ceil(width / drawHBlocks);
      const totalVBlocks = Math.ceil(height / newBlockSize);

      setDrawHBlocks(densitySelector(width));

      setBlockSize(newBlockSize);
      setHorizontalBlocks(drawHBlocks);
      setVerticalBlocks(totalVBlocks);
    }
  }, [
    setVerticalBlocks,
    setHorizontalBlocks,
    blockSize,
    width,
    height,
    drawHBlocks,
  ]);

  useGameOfLife();

  return (
    <FieldDiv ref={ref}>
      <div id="window">
        <FieldGrid />
        {drawHBlocks !== 1 &&
          Array.apply(null, Array(vBlocks)).map((_, idx) => (
            <Row key={"rKey" + idx} length={hBlocks} vBlock={idx} />
          ))}
      </div>
    </FieldDiv>
  );
};

export default GameWindow;
