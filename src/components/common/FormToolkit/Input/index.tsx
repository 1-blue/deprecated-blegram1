import React from "react";

// style
import StyledInput from "./style";

// type
import type { UseFormRegister } from "react-hook-form";
import type { LoginForm, SignUpForm } from "@src/types";

interface Props {
  id: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  subText?: string;
  [index: string]: any;
}

/** 2023/03/25 - Input 컴포넌트 - by 1-blue */
const Input = React.forwardRef<
  HTMLInputElement,
  Props &
    (
      | ReturnType<UseFormRegister<SignUpForm>>
      | ReturnType<UseFormRegister<LoginForm>>
    )
>(({ id, type, placeholder, subText, ...props }, ref) => (
  <StyledInput>
    <label htmlFor={id}>{id}</label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete="current-password"
      {...props}
      ref={ref}
    />
    <span>{subText}</span>
  </StyledInput>
));

Input.displayName = "Input";

export default Input;
