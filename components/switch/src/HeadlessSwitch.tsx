import React, { useState, CSSProperties } from "react";

interface SwitchButtonProps {
	initialChecked?: boolean;
	onChange?: (isChecked: boolean) => void;
	containerClassName?: string | CSSProperties;
	trackClassName?: string | CSSProperties;
	thumbClassName?: string | CSSProperties;
}

const HeadlessSwitch: React.FC<SwitchButtonProps> = ({
	initialChecked = false,
	onChange,
	containerClassName = "",
	trackClassName = "",
	thumbClassName = "",
}) => {
	const [isChecked, setIsChecked] = useState(initialChecked);

	const toggleSwitch = () => {
		const newChecked = !isChecked;
		setIsChecked(newChecked);
		if (onChange) {
			onChange(newChecked);
		}
	};

	return (
		<div
			className={
				typeof containerClassName === "string" ? containerClassName : ""
			}
			onClick={toggleSwitch}
			role="button"
			style={typeof containerClassName === "object" ? containerClassName : {}}
		>
			<div
				className={`${
					typeof trackClassName === "string" ? trackClassName : ""
				} ${isChecked ? "justify-end" : "justify-start"}`}
				style={typeof trackClassName === "object" ? trackClassName : {}}
			>
				<div
					className={typeof thumbClassName === "string" ? thumbClassName : ""}
					style={typeof thumbClassName === "object" ? thumbClassName : {}}
				></div>
			</div>
		</div>
	);
};

export default HeadlessSwitch;
