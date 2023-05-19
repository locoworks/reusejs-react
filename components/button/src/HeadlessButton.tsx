import React, { FC } from "react";

export interface HeadlessButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  busy?: boolean;
  busyText?: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  onFocus?: (e: React.FocusEvent<HTMLButtonElement, Element>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement, Element>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const HeadlessButton: FC<HeadlessButtonProps> = (props) => {
  return (
    <button
      type={props.type}
      disabled={props.disabled || props.busy}
      className={props.className}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      {props.busy ? props.busyText : props.children}
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
