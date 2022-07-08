import * as Yup from "yup";

const REGEX_NO_WHITE_SPACE = /^\S*$/;
const REGEX_PASSWORD =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#!@$%^&*()+=]).{8,20}$/;

export const yupEmail = Yup.string()
  .email("Invalid email")
  .required("Required");

export const yupPassword = Yup.string()
  .matches(REGEX_NO_WHITE_SPACE, "Whitespace is not allowed")
  //   .matches(
  //     REGEX_PASSWORD,
  //     "Password must contain 8-20 characters, have at least one  upper case alphabet, lower case alphabet and special character"
  //   )
  .min(3, "Must be at least 3 characters")
  .required("Required");

export const yupPasswordRepeat = Yup.string()
  .oneOf([Yup.ref("password"), undefined], "Passwords do not match")
  .required("Required");
