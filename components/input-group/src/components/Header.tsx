import React from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  headerStyles?: string;
  headerText?: string;
}

const Header: React.FC<HeaderProps> = ({ headerStyles, headerText }) => {
  const finalHeaderStyles = twMerge("font-bold text-lg", headerStyles);
  return <label className={finalHeaderStyles}>{headerText}</label>;
};

export default Header;
