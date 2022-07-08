import { createContext, useContext, useState } from "react";

interface FormContextInterface {
  formType: FormType;
  email: string;
  isSuccess: boolean;
  setEmail: (a: string) => void;
  setFormType: (a: FormType) => void;
  setIsSuccess: (a: boolean) => void;
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

  return (
    <FormContext.Provider
      value={{
        formType,
        email,
        isSuccess,
        setEmail,
        setFormType,
        setIsSuccess,
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
