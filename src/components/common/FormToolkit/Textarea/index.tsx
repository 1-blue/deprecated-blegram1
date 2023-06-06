import React from "react";

// style
import StyledTextarea from "./style";

// type
import type { UseFormRegister } from "react-hook-form";
import type { SignUpForm, ProfileUpdateForm } from "@src/types";

interface Props {
  id: string;
  placeholder: string;
  subText?: string;
  [index: string]: any;
}

/** 2023/03/25 - Textarea 컴포넌트 - by 1-blue */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  Props &
    (
      | ReturnType<UseFormRegister<SignUpForm>>
      | ReturnType<UseFormRegister<ProfileUpdateForm>>
    )
>(({ id, placeholder, subText, ...props }, ref) => {
  return (
    <StyledTextarea>
      <label htmlFor={id}>{id}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        rows={5}
        {...props}
        ref={ref}
      />
      <span>{subText}</span>
    </StyledTextarea>
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
