import { memo } from "react";
import styled from "styled-components";
import { Block } from "./Block";

const Div = styled.div`
  display: flex;
`;

interface RowProps {
  length: number;
  vBlock: number;
}

export const Row = memo<RowProps>(({ length, vBlock }) => {
  return (
    <Div>
      {Array.apply(null, Array(length)).map((_, idx) => (
        <Block key={"iKey" + idx + vBlock} vBlock={vBlock} hBlock={idx} />
      ))}
    </Div>
  );
});
