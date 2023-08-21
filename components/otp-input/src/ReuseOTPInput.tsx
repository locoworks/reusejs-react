import React from "react";
import { twMerge } from "tailwind-merge";

import HeadlessOTPInput, { HeadlessOTPInputProps } from "./HeadlessOTPInput";

export interface ReuseOTPInputProps extends HeadlessOTPInputProps {
	inputClassName?: string;
}

const defaultInputClassName =
	"w-12 h-14 bg-slate-300 border rounded-xl text-2xl font-semibold";

const ReuseOTPInput: React.FC<ReuseOTPInputProps> = (props) => {
	const finalInputClassName = twMerge(
		defaultInputClassName,
		props.inputClassName,
	);

	return <HeadlessOTPInput {...props} inputStyle={finalInputClassName} />;
};

export default ReuseOTPInput;
