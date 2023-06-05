import React, { CSSProperties, FC, ButtonHTMLAttributes } from "react";

export interface HeadlessButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  busyText?: string;
  busy?: boolean;
}

const HeadlessButton: FC<HeadlessButtonProps> = ({
  children,
  busyText,
  busy,
  ...rest
}) => {
  return <button {...rest}>{busy ? busyText : children}</button>;
};

HeadlessButton.defaultProps = {
  busyText: "Loading...",
  disabled: false,
  busy: false,
  type: "button",
};

export default HeadlessButton;
