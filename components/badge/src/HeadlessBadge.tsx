import React, { CSSProperties } from "react";

export interface HeadlessBadgeProps {
	as?: "div" | "span" | "label" | "button";
	label?: string;
	children?: React.ReactNode;
	className?: string;
	style?: CSSProperties;
	[key: string]: any;
}

const HeadlessBadge: React.FC<HeadlessBadgeProps> = ({
	as,
	children,
	label,
	className,
	style,
	...rest
}) => {
	return React.createElement(
		as as string,
		{ className: className, style: style ? style : undefined, ...rest },
		children ? children : label,
	);
};

export default HeadlessBadge;

HeadlessBadge.defaultProps = {
	as: "div",
};
