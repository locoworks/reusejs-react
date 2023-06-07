import React from "react";
import { HeadlessInput } from "@locoworks/reusejs-react-input";
// import { HeadlessInputProps } from "@locoworks/reusejs-react-input/dist/types/src/HeadlessInput";

// export interface HeadlessInputGroupProps
//   extends Omit<HeadlessInputProps, "prefix"> {
//   header?: React.ReactNode;
//   prefix?: React.ReactNode;
//   suffix?: React.ReactNode;
//   error?: React.ReactNode;
//   helper?: React.ReactNode;
//   wrapperClasses?: string;
// }

export interface HeadlessInputGroupProps {
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
      {header && header}
      <div className={wrapperClasses}>
        {prefix && prefix}
        <HeadlessInput {...rest} />
        {suffix && suffix}
      </div>
      {error && error}
      {helper && helper}
    </>
  );
};

export default HeadlessInputGroup;
