import React from "react";
import { HeadlessInput } from "@locoworks/reusejs-react-input";
import { HeadlessInputProps } from "@locoworks/reusejs-react-input/dist/types/src/HeadlessInput";

type ExtendedHeadlessInputInterface = Omit<HeadlessInputProps, "prefix">;
export interface HeadlessInputGroupProps
  extends ExtendedHeadlessInputInterface {
  headerLevel1?: React.ReactNode;
  headerLevel2?: React.ReactNode;
  footerLevel1?: React.ReactNode;
  footerLevel2?: React.ReactNode;
  wrapperClasses?: string;
}

const HeadlessInputGroup: React.FC<HeadlessInputGroupProps> = ({
  wrapperClasses,
  headerLevel1,
  headerLevel2,
  footerLevel1,
  footerLevel2,
  ...rest
}) => {
  return (
    <>
      <div className={wrapperClasses}>
        {headerLevel1 && headerLevel1}
        {headerLevel2 && headerLevel2}
        <HeadlessInput {...rest} />
        {footerLevel1 && footerLevel1}
        {footerLevel2 && footerLevel2}
      </div>
    </>
  );
};

export default HeadlessInputGroup;
