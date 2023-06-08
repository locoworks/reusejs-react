import React from "react";
import { twMerge } from "tailwind-merge";

interface ErrorProps {
  errorStyles?: string;
  errorText?: string;
}

const Error: React.FC<ErrorProps> = ({ errorStyles, errorText }) => {
  const finalErrorStyles = twMerge("font-light text-red-400", errorStyles);
  return <label className={finalErrorStyles}>{errorText}</label>;
};

export default Error;
