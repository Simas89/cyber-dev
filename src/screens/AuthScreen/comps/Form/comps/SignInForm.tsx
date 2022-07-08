import { makeSignIn } from "api/auth";
import { setToken } from "api/utils";
import { Button, TextInput } from "components/form";
import Spacer from "components/Spacer";
import { Nunito } from "components/typography";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import useActionsUser from "state/actionHooks/useActionsUser";
import { ThemeColors } from "util/theme";
import { yupEmail, yupPassword } from "util/yup";
import * as Yup from "yup";
import { useFormContext } from "../context";

const validationSchema = Yup.object({
  email: yupEmail,
  password: yupPassword,
});

export const SignInForm = () => {
  const [err, setErr] = useState("");
  const { email, setEmail, setIsSuccess } = useFormContext();
  const { setUserData } = useActionsUser();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    setTouched,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email,
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setErr("");
      return makeSignIn(values)
        .then((res) => {
          setIsSuccess(true);
          setToken(res.token);

          const timer = setTimeout(() => {
            clearTimeout(timer);
            setUserData(res.user);
          }, 3200);
        })
        .catch((err) => setErr(err.message));
    },
    isInitialValid: false,
  });

  const memoizedTouched = useMemo(() => touched, []);

  useEffect(() => {
    setEmail(values.email);

    if (values.email) {
      setTouched({ email: true, ...memoizedTouched });
    }
    // @ts-ignore react-hooks/exhaustive-deps
  }, [values.email, setTouched, setEmail, memoizedTouched]);

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        fullWidth
        id="email"
        name="email"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        placeholder="Email"
        error={Boolean(touched.email && errors.email)}
        helperText={touched.email && errors.email}
      />
      <Spacer xs={10} />
      <TextInput
        fullWidth
        id="password"
        name="password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        placeholder="Password"
        error={Boolean(touched.password && errors.password)}
        helperText={touched.password && errors.password}
      />
      <Spacer xs={20} />

      {Boolean(err) && (
        <>
          <Nunito themeColor={ThemeColors.ERROR}>{err}</Nunito>
          <Spacer xs={10} />
        </>
      )}
      <Button type="submit" disabled={!isValid} loading={isSubmitting}>
        Sign In
      </Button>
    </form>
  );
};
