import { useEffect } from "react";
import styled from "styled-components";
import Spacer from "components/Spacer";
import { Nunito } from "components/typography";
import { ThemeColors } from "util/theme";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FormProvider, FormType, useFormContext } from "./context";
import { SignUpForm, SignInForm, Background } from "./comps";
import { SuccessAnimation } from "./comps/SuccessAnimation";

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 400px;
  margin: 10px;
  flex: 1;
  border-radius: 20px;
  border: 1px solid ${ThemeColors.ALICE_BLUE};
  background: rgba(255, 255, 255, 0.4);
  padding: 30px;
  overflow: hidden;
  background: ${ThemeColors.CULTURED};
  /* backdrop-filter: blur(5px); */

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
  const { formType, setFormType, isSuccess, isFailure, setIsFailure } =
    useFormContext();

  const mv = useMotionValue(`drop-shadow(0px 0px 37px rgba(7, 46, 91, 0.3))`);

  const shadow = useSpring(mv, { damping: 30 });

  useEffect(() => {
    if (isSuccess) {
      shadow.set(`drop-shadow(0px 0px 37px rgba(44, 218, 148, 0.5))`);
    }
  }, [isSuccess, shadow]);

  useEffect(() => {
    if (isFailure) {
      shadow.set(`drop-shadow(0px 0px 37px rgba(211, 47, 47, 0.5))`);
    } else {
      shadow.set(`drop-shadow(0px 0px 37px rgba(7, 46, 91, 0.3))`);
    }

    setTimeout(() => {
      setIsFailure(false);
    }, 1000);
  }, [isFailure, setIsFailure, shadow]);

  return (
    <MotionWrapper
      layout="position"
      transition={{ type: "spring" }}
      style={{ filter: shadow }}
    >
      <SuccessAnimation />
      <Background />
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
