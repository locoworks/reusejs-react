import React, { createElement } from "react";
import HeadlessBadge from "./HeadlessBadge";
import { HeadlessBadgeProps } from "./HeadlessBadge";
import { twMerge } from "tailwind-merge";

export interface ReuseBadgeProps extends HeadlessBadgeProps {
	prefixIcon?: React.ReactNode;
	suffixIcon?: React.ReactNode;
}

const ReuseBadge: React.FC<ReuseBadgeProps> = ({
	className,
	label,
	prefixIcon,
	suffixIcon,
	style,
	...rest
}) => {
	const innerElements = (
		<>
			{prefixIcon && prefixIcon}
			{label}
			{suffixIcon && suffixIcon}
		</>
	);

	const defaultBadgeClasses =
		"border rounded-full border-blue-700 bg-blue-200 text-blue-700 px-3 py-1";

	const finalBadgeClasses = twMerge(defaultBadgeClasses, className);

	return createElement(
		HeadlessBadge,
		{
			className: style ? undefined : finalBadgeClasses,
			style: style ? style : undefined,
			...rest,
		},
		innerElements,
	);
};

export default ReuseBadge;

ReuseBadge.defaultProps = {
	as: "div",
};

// toasUIConfig: {
//   error: {
//     backgroundColorClass: '',
//     textColor: ''
//     icon: ''
//   },
//   success: {
//     backgroundColorClass: '',
//     textColor: ''
//     icon: ''
//   },
//   warning: {
//     backgroundColorClass: '',
//     textColor: ''
//     icon: ''
//   },
//   neutral: {
//     backgroundColorClass: '',
//     textColor: ''
//     icon: ''
//   }
// }
