import React from "react";
import { HeadlessInput } from "@locoworks/reusejs-react-input";
import { HeadlessInputProps } from "@locoworks/reusejs-react-input/dist/types/src/HeadlessInput";

type ExtendedHeadlessInputInterface = Omit<HeadlessInputProps, "prefix">;
export interface HeadlessInputGroupProps
  extends ExtendedHeadlessInputInterface {
  header?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: React.ReactNode;
  helper?: React.ReactNode;
  wrapperClasses?: string;
}

const HeadlessInputGroup: React.FC<HeadlessInputGroupProps> = ({
  header,
  prefix,
  suffix,
  error,
  helper,
  wrapperClasses,
  ...rest
}) => {
  return (
    <>
      <div className={wrapperClasses}>
        {header}
        {prefix && prefix}
        <HeadlessInput {...rest} />
        {suffix && suffix}
        {error || helper}
      </div>
    </>
  );
};

export default HeadlessInputGroup;
