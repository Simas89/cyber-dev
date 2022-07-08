import { useStateSelector } from "state";
import styled from "styled-components";
import isEqual from "lodash.isequal";

const StyledSvg = styled.svg`
  position: absolute;
  /* border: 1px solid gray; */
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
  line {
    shape-rendering: crispEdges !important;
    stroke-width: 1px !important;
    stroke: rgb(248, 248, 248);
  }
`;

const shift = (idx: number, size: number) => {
  if (idx === 0) {
    return "1px";
  }
  return `${idx * size}px`;
};

export const FieldGrid = () => {
  const { vBlocks, hBlocks, blockSize } = useStateSelector(({ gameOfLife }) => {
    return {
      vBlocks: gameOfLife.value[0].length,
      hBlocks: gameOfLife.value.length,
      blockSize: gameOfLife.blockSize,
    };
  }, isEqual);

  return (
    <StyledSvg>
      {Array.apply(null, Array(hBlocks + 1)).map((_, idx) => {
        return (
          <line
            key={"hKey" + idx}
            x1={shift(idx, blockSize)}
            y1="0"
            x2={shift(idx, blockSize)}
            y2={vBlocks * blockSize}
          />
        );
      })}
      {Array.apply(null, Array(vBlocks + 1)).map((_, idx) => {
        return (
          <line
            key={"hKey" + idx}
            x1="0"
            y1={shift(idx, blockSize)}
            x2={hBlocks * blockSize}
            y2={shift(idx, blockSize)}
          />
        );
      })}
    </StyledSvg>
  );
};
