import Spacer from "components/Spacer";
import { Nunito } from "components/typography";
import styled from "styled-components";
import { ThemeColors } from "util/theme";
import { motion } from "framer-motion";
import { FormProvider, FormType, useFormContext } from "./context";
import { Background } from "./comps/Background";
import { SignUpForm } from "./comps/SignUpForm";
import { SignInForm } from "./comps/SignInForm";
import { SuccessAnimation } from "./comps/SuccessAnimation";

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 400px;
  margin: 10px;
  flex: 1;
  border-radius: 20px;
  border: 1px solid ${ThemeColors.ALICE_BLUE};
  background: ${ThemeColors.CULTURED};
  filter: drop-shadow(0px 0px 37px rgba(7, 46, 91, 0.23));
  padding: 30px;
  overflow: hidden;

  transition: height 1s;

  .MuiTypography-root {
    user-select: none;
  }
  .action {
    color: ${ThemeColors.ORANGE} !important;
    font-weight: 600;
    cursor: pointer;
  }
`;

const MotionWrapper = motion(Wrapper);

const Main = () => {
  const { formType, setFormType, isSuccess } = useFormContext();

  return (
    <MotionWrapper layout="position" transition={{ type: "spring" }}>
      <SuccessAnimation />
      {/* <Background /> */}
      <motion.div
        animate={{ y: isSuccess ? 300 : 0, opacity: isSuccess ? 0 : 1 }}
        transition={{
          type: "tween",
          duration: 0.5,
        }}
      >
        <Nunito
          weight="800"
          fontSize={30}
          themeColor={ThemeColors.PRUSSIAN_BLUE}
        >
          SIGN-{formType === FormType.signUp ? "UP" : "IN"}
        </Nunito>
        <Spacer xs={20} />
        {formType === FormType.signUp ? <SignUpForm /> : <SignInForm />}

        <Spacer xs={20} />
        {formType === FormType.signUp ? (
          <Nunito textAlign="center">
            Already a user?{" "}
            <span
              className="action"
              onClick={() => setFormType(FormType.signIn)}
            >
              SignIn
            </span>
          </Nunito>
        ) : (
          <Nunito textAlign="center">
            Need an account?{" "}
            <span
              className="action"
              onClick={() => setFormType(FormType.signUp)}
            >
              SignUp
            </span>
          </Nunito>
        )}
      </motion.div>
    </MotionWrapper>
  );
};

const Form = () => {
  return (
    <FormProvider>
      <Main />
    </FormProvider>
  );
};

export default Form;
