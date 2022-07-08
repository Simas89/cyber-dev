import styled from "styled-components";
import { TextField } from "@mui/material";
import { ThemeColors } from "util/theme";

interface TextInputProps {
  error?: boolean;
}

export const TextInput = styled(TextField)<TextInputProps>`
  outline: none;

  .MuiInputBase-root {
    background-color: white;
    border-radius: 0px;
  }
  input {
    padding: 13px 12px;
  }

  input,
  textarea {
    color: ${ThemeColors.PRUSSIAN_BLUE};
  }
  & input::placeholder,
  textarea::placeholder {
    color: ${ThemeColors.PRUSSIAN_BLUE};
    opacity: 0.7;
  }

  .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border: 1px solid
      ${({ error }) => (error ? ThemeColors.ERROR : ThemeColors.ALICE_BLUE)};
    border-radius: 0px;
  }
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border: 1px solid
      ${({ error }) => (error ? ThemeColors.ERROR : ThemeColors.PRUSSIAN_BLUE)};
    border-radius: 0px;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 2px solid
      ${({ error }) => (error ? ThemeColors.ERROR : ThemeColors.PRUSSIAN_BLUE)};
    border-radius: 0px;
  }

  .MuiFormHelperText-root {
    border: none;
    font-size: 12px;
  }

  &:focus-visible {
    box-shadow: 0 0 0px 4px orange;
  }
`;
