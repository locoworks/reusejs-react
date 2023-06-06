import React, { FC, ButtonHTMLAttributes } from "react";

export interface HeadlessButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  busyText?: string;
  busy?: boolean;
  buttonPrefix?: React.ReactNode;
  buttonSuffix?: React.ReactNode;
}

const HeadlessButton: FC<HeadlessButtonProps> = ({
  children,
  busyText,
  busy,
  disabled,
  buttonPrefix,
  buttonSuffix,
  ...rest
}) => {
  return (
    <button disabled={busy ? true : disabled} {...rest}>
      {busy ? (
        busyText
      ) : (
        <>
          {buttonPrefix ? buttonPrefix : <></>}
          {children}
          {buttonSuffix ? buttonSuffix : <></>}
        </>
      )}
    </button>
  );
};

HeadlessButton.defaultProps = {
  busyText: "Loading...",
  disabled: false,
  busy: false,
  type: "button",
};

export default HeadlessButton;
