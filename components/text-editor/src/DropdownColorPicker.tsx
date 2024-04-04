import * as React from "react";

import ColorPicker from "./ColorPicker";
import DropDown from "./DropDown";

type Props = {
	disabled?: boolean;
	buttonAriaLabel?: string;
	buttonClassName: string;
	buttonIconClassName?: string;
	buttonLabel?: string;
	title?: string;
	stopCloseOnClickSelf?: boolean;
	color: string;
	icon?: any;
	onChange?: (color: string, skipHistoryStack: boolean) => void;
};

export default function DropdownColorPicker({
	disabled = false,
	stopCloseOnClickSelf = true,
	color,
	onChange,
	icon,
	...rest
}: Props) {
	return (
		<DropDown
			{...rest}
			disabled={disabled}
			stopCloseOnClickSelf={stopCloseOnClickSelf}
			icon={icon}
		>
			<ColorPicker color={color} onChange={onChange} />
		</DropDown>
	);
}
