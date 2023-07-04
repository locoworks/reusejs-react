import React, { forwardRef } from "react";
import HeadlessInput, { HeadlessInputProps } from "./HeadlessInput";
import { twMerge } from "tailwind-merge";

export interface ReuseInputProps extends HeadlessInputProps {
  inputRef?: React.Ref<HTMLInputElement>;
}

const ReuseInput: React.FC<ReuseInputProps> = ({ className, inputRef, ...rest }) => {

  const defaultStyleClasses =
    "form-input border px-2 py-1 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900";

  const finalClassNames = twMerge(defaultStyleClasses, className);
  return <HeadlessInput className={finalClassNames} {...rest} ref={inputRef} />;
};

export default ReuseInput;
