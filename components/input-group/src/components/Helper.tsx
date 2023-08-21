import React from "react";
import { twMerge } from "tailwind-merge";

interface HelperProps {
	helperStyles?: string;
	helperText?: string;
}

const Helper: React.FC<HelperProps> = ({ helperStyles, helperText }) => {
	const finalHealperStyles = twMerge("font-light text-sm", helperStyles);
	return <label className={finalHealperStyles}>{helperText}</label>;
};

export default Helper;
