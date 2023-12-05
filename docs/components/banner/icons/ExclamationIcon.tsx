import React from "react";

export interface ExclamationIconInterface {
	color?: string;
}

const ExclamationIcon = ({ color = "#8E4B10" }: ExclamationIconInterface) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="19"
			fill="none"
			viewBox="0 0 18 19"
		>
			<path
				fill={color}
				d="M9 2a7.5 7.5 0 107.5 7.5A7.509 7.509 0 009 2zm0 11.25a.75.75 0 110-1.5.75.75 0 010 1.5zm.75-3a.75.75 0 11-1.5 0V6.5a.75.75 0 011.5 0v3.75z"
			></path>
		</svg>
	);
};

export default ExclamationIcon;
