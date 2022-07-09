import { createContext, useContext, useState } from "react";

interface FormContextInterface {
  formType: FormType;
  email: string;
  isSuccess: boolean;
  isFailure: boolean;
  setEmail: (a: string) => void;
  setFormType: (a: FormType) => void;
  setIsSuccess: (a: boolean) => void;
  setIsFailure: (a: boolean) => void;
}

const FormContext = createContext<Partial<FormContextInterface>>({});

export enum FormType {
  signIn,
  signUp,
}

const FormProvider = (props: any) => {
  const [formType, setFormType] = useState(FormType.signIn);
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  return (
    <FormContext.Provider
      value={{
        formType,
        email,
        isSuccess,
        isFailure,
        setEmail,
        setFormType,
        setIsSuccess,
        setIsFailure,
      }}
      {...props}
    />
  );
};

const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context as FormContextInterface;
};

export { FormProvider, useFormContext };
