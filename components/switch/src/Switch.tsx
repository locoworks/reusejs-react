import React from "react";

export interface SwitchInterface {
	checked: boolean;
	onChange: React.Dispatch<React.SetStateAction<boolean>>;
	className?: string;
	children?: React.ReactNode;
}

const Switch: React.FC<SwitchInterface> = ({
	checked,
	onChange,
	className,
	children,
}) => {
	return (
		<button
			onClick={() => {
				onChange(!checked);
			}}
			role=""
			className={className ? className : ""}
		>
			{children ? children : "Switch"}
		</button>
	);
};

export default Switch;
