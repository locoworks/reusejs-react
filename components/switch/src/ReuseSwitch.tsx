import React, { CSSProperties } from "react";
import HeadlessSwitch from "./HeadlessSwitch";
import { twMerge } from "tailwind-merge";

interface ReuseSwitchInterface {
	isSwitch: boolean;
	onChange: (value: boolean) => void;
	containerClassName?: string | CSSProperties;
	trackClassName?: string | CSSProperties;
	thumbClassName?: string | CSSProperties;
}

const ReuseSwitch: React.FC<ReuseSwitchInterface> = ({
	isSwitch,
	onChange,
	containerClassName,
	trackClassName,
	thumbClassName,
}) => {
	const defaultContainerClass = "flex w-10 h-5";
	const defaultTrackClass =
		"flex switch-track bg-gray-400 dark:bg-gray-700 rounded-full";
	const defaultThumbClass = "h-3 w-3 rounded-full bg-white m-1";

	return (
		<HeadlessSwitch
			initialChecked={isSwitch}
			onChange={onChange}
			containerClassName={
				typeof containerClassName === "string"
					? twMerge(defaultContainerClass, containerClassName)
					: containerClassName
			}
			trackClassName={
				typeof trackClassName === "string"
					? twMerge(defaultTrackClass, trackClassName)
					: trackClassName
			}
			thumbClassName={
				typeof thumbClassName === "string"
					? twMerge(defaultThumbClass, thumbClassName)
					: thumbClassName
			}
		/>
	);
};

export default ReuseSwitch;
