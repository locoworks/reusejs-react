import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { HeadlessOTPInput } from "@locoworks/reusejs-react-otp-input";
import { HeadlessOTPInputProps } from "./HeadlessOTPInput";

export interface ReuseOTPInputProps extends HeadlessOTPInputProps {
  wrapperClassName?: string;
  inputClassName?: string;
}

const defaultWrapperClassName =
  "flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50";

const defaultInputClassName =
  "w-12 h-14 bg-slate-300 border rounded-xl text-2xl font-semibold";

const ReuseOTPInput: React.FC<ReuseOTPInputProps> = (props) => {
  const finalWrapperClassName = twMerge(
    defaultWrapperClassName,
    props.wrapperClassName
  );

  const finalInputClassName = twMerge(
    defaultInputClassName,
    props.inputClassName
  );

  return (
    <div className={finalWrapperClassName}>
      <HeadlessOTPInput {...props} inputStyle={finalInputClassName} />
    </div>
  );
};
export default ReuseOTPInput;
