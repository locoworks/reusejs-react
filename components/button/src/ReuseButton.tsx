import React, { FC } from "react";
import HeadlessButton, { HeadlessButtonProps } from "./HeadlessButton";
import { twMerge } from "tailwind-merge";

export interface ReuseButtonProps extends HeadlessButtonProps {
  buttonPrefix?: React.ReactNode;
  buttonSuffix?: React.ReactNode;
}

const ReuseButton: FC<ReuseButtonProps> = ({
  className,
  buttonPrefix,
  buttonSuffix,
  children,
  ...rest
}) => {
  const defaultStyleClasses =
    "inline-flex justify-center items-center focus:outline-none font-normal text-sm bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 border border-transparent";

  const finalClassNames = twMerge(defaultStyleClasses, className);

  return (
    <HeadlessButton className={finalClassNames} {...rest}>
      {buttonPrefix ? buttonPrefix : <></>}
      {children}
      {buttonSuffix ? buttonSuffix : <></>}
    </HeadlessButton>
  );
};

export default ReuseButton;
