import React, { forwardRef, InputHTMLAttributes } from "react";

export interface HeadlessInputProps
	extends InputHTMLAttributes<HTMLInputElement> {
	showPassword?: boolean;
}

const HeadlessInput: React.ForwardRefRenderFunction<
	HTMLInputElement,
	HeadlessInputProps
> = ({ type, showPassword, ...props }, ref) => {
	return (
		<input
			type={showPassword && type === "password" ? "text" : type}
			{...props}
			ref={ref}
		/>
	);
};

export default forwardRef<HTMLInputElement, HeadlessInputProps>(HeadlessInput);
