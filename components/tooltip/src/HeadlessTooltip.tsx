import React, { useEffect, useState } from "react";

/* Controlled Tooltip
 * Will have properties like open which will control the tooltip from outside, or pass the values outside
 * onOpen and onClose functions will be used for pass callbacks which will be ran on call
 *
 */

export enum TriggerEnum {
	HOVER, //0
	CLICK, //1
}

export interface HeadlessToolTipProps {
	trigger?: TriggerEnum;
	children: React.ReactNode;
	tooltip: () => JSX.Element;
	open?: boolean;
	onOpen?: (args?: any) => any;
	onClose?: (args?: any) => any;
}

const HeadlessTooltip: React.FC<HeadlessToolTipProps> = ({
	trigger = TriggerEnum.HOVER,
	children,
	tooltip,
	open = undefined,
	onOpen,
	onClose,
}) => {
	const [showTooltip, setShowTooltip] = useState(open);
	const isNotControlled = open === undefined;
	// console.log(">>>", trigger);

	useEffect(() => {
		open !== undefined && setShowToolTipFunction(open);
	}, [open]);

	const setShowToolTipFunction = (value: boolean) => {
		console.log(">>>>>>", value);
		if (value) {
			onOpen && onOpen();
		} else {
			onClose && onClose();
		}
		setShowTooltip(value);
	};

	const handleMouseEnter = () => {
		isNotControlled && !trigger && setShowToolTipFunction(true);
	};

	const handleMouseLeave = () => {
		isNotControlled && !trigger && setShowToolTipFunction(false);
	};

	const handleMouseClick = () => {
		isNotControlled && trigger && setShowToolTipFunction(!showTooltip);
	};

	// console.log(">>>>>>>", typeof tooltip);

	return (
		<div
			id="headless-tooltip-wrapper"
			className="relative w-fit h-fit"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleMouseClick}
			onTouchStart={handleMouseEnter}
			onTouchEnd={handleMouseLeave}
		>
			{showTooltip && (typeof tooltip === "object" ? tooltip : tooltip())}
			{children}
		</div>
	);
};

export default HeadlessTooltip;
