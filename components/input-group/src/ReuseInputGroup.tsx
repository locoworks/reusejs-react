import React from "react";
import HeadlessInputGroup, {
	HeadlessInputGroupProps,
} from "./HeadlessInputGroup";
import { twMerge } from "tailwind-merge";
import Header from "./components/Header";
import Helper from "./components/Helper";
import Error from "./components/Error";

export interface ReuseInputGroupProps extends HeadlessInputGroupProps {
	className?: string;
	header?: React.ReactNode;
	headerStyles?: string;
	headerText?: string;
	helper?: React.ReactNode;
	helperStyles?: string;
	helperText?: string;
	error?: React.ReactNode;
	errorStyles?: string;
	errorText?: string;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	errorInputStyles?: string;
	reuseinputref?: React.Ref<HTMLInputElement> | undefined;
}

const ReuseInputGroup: React.FC<ReuseInputGroupProps> = ({
	wrapperClasses,
	className,
	header,
	headerStyles,
	headerText,
	helper,
	helperStyles,
	helperText,
	error,
	errorStyles,
	errorText,
	errorInputStyles,
	prefix,
	suffix,
	reuseinputref,
	...rest
}) => {
	const defaultWrapperClasses = "relative w-1/2 flex flex-col";
	const defaultCommonClassName =
		"form-input w-full py-2 border-1 rounded focus:ring-0 border-black focus:border-blue-700 ";
	const defaultErrorClasses = "border-red-400 focus:border-red-500";

	const finalWrapperClasses = twMerge(defaultWrapperClasses, wrapperClasses);
	const finalClassName = twMerge(
		defaultCommonClassName,
		className,
		error || errorText ? twMerge(defaultErrorClasses, errorInputStyles) : "",
	);

	const footerLevel2Content = error ? (
		error
	) : errorText ? (
		<Error errorStyles={errorStyles} errorText={errorText} />
	) : helper ? (
		helper
	) : (
		helperText && <Helper helperStyles={helperStyles} helperText={helperText} />
	);

	return (
		<HeadlessInputGroup
			wrapperClasses={finalWrapperClasses}
			className={finalClassName}
			inputRef={reuseinputref}
			headerLevel1={
				header
					? header
					: headerText && (
							<Header headerStyles={headerStyles} headerText={headerText} />
					  )
			}
			headerLevel2={prefix && prefix}
			footerLevel1={suffix && suffix}
			footerLevel2={footerLevel2Content}
			{...rest}
		/>
	);
};

export default ReuseInputGroup;
