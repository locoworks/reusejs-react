import React, { InputHTMLAttributes } from "react";

export interface HeadlessInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  showPassword?: boolean;
}

const HeadlessInput: React.FC<HeadlessInputProps> = ({
  type,
  showPassword,
  ...props
}) => {
  return (
    <input
      type={showPassword && type === "password" ? "text" : type}
      {...props}
    />
  );
};

HeadlessInput.defaultProps = {
  type: "text",
  disabled: false,
  placeholder: "Placeholder",
  showPassword: false,
};

export default HeadlessInput;
