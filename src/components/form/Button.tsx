import styled from "styled-components";
import { LoadingButton as ExternalButton } from "@mui/lab";

interface ButtonProps {
  padding?: number;
  minwidth?: number;
  sbl?: boolean;
}

export const Button = styled(ExternalButton).attrs((props) => {
  return {
    variant: "contained",
    ...props,
  };
})<ButtonProps>`
  text-transform: none !important;
  letter-spacing: 1.5px;
  border-radius: 3px !important;

  background: linear-gradient(106.11deg, #e62e78 0.01%, #fd5630 98.53%);

  &.Mui-disabled {
    background: rgba(0, 0, 0, 0.14);
  }
`;
