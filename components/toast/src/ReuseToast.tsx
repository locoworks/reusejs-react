import React, { useEffect, useState } from "react";
import { useProgress } from "@locoworks/reusejs-toolkit-react-hooks";
import { motion, AnimatePresence } from "framer-motion";
import { twMerge } from "tailwind-merge";
import HeadlessToast from "./HeadlessToast";

export interface ReuseToastProps {
	timeout: number;
	label: string;
	toastClasses?: string;
	icon?: React.ReactNode;
	showProgress?: boolean;
	progressClasses?: string;
	position?:
		| "top-left"
		| "top-centre"
		| "top-right"
		| "centre-right"
		| "bottom-right"
		| "bottom-centre"
		| "bottom-left"
		| "centre-left";
	customToastPosition?: string;
	customAnimation?: {
		initial: any;
		animate: any;
		exit: any;
		transition: any;
	};
}

const ANIMATIONS_CONFIG = {
	positiveX: {
		initial: { x: 300 },
		animate: { x: 0 },
		exit: { x: 300 },
		transition: { type: "spring", duration: 0.2 },
	},
	negativeX: {
		initial: { x: -300 },
		animate: { x: 0 },
		exit: { x: -300 },
		transition: { type: "spring", duration: 0.2 },
	},
	positiveY: {
		initial: { y: 300 },
		animate: { y: 0 },
		exit: { y: 300 },
		transition: { type: "spring", duration: 0.2 },
	},
	negativeY: {
		initial: { y: -300 },
		animate: { y: 0 },
		exit: { y: -300 },
		transition: { type: "spring", duration: 0.2 },
	},
};

const POSITION_CONFIG = {
	"top-left": {
		position: "absolute top-4 left-4 m-auto w-fit",
		animations: { ...ANIMATIONS_CONFIG["negativeX"] },
	},
	"top-centre": {
		position: "absolute top-4 left-0 right-0 m-auto w-fit",
		animations: { ...ANIMATIONS_CONFIG["negativeY"] },
	},
	"top-right": {
		position: "absolute top-4 right-4 m-auto w-fit",
		animations: { ...ANIMATIONS_CONFIG["positiveX"] },
	},
	"centre-right": {
		position: "absolute top-0 bottom-0 right-4 m-auto h-fit",
		animations: { ...ANIMATIONS_CONFIG["positiveX"] },
	},
	"bottom-right": {
		position: "absolute bottom-4 right-4 m-auto w-fit",
		animations: { ...ANIMATIONS_CONFIG["positiveX"] },
	},
	"bottom-centre": {
		position: "absolute bottom-10 left-0 right-0 m-auto h-fit w-fit",
		animations: { ...ANIMATIONS_CONFIG["positiveY"] },
	},
	"bottom-left": {
		position: "absolute bottom-4 left-4 m-auto w-fit",
		animations: { ...ANIMATIONS_CONFIG["negativeX"] },
	},
	"centre-left": {
		position: "absolute top-0 bottom-0 left-4 m-auto h-fit w-fit",
		animations: { ...ANIMATIONS_CONFIG["negativeX"] },
	},
};

const ExportableComponent: React.FC<ReuseToastProps> = ({
	timeout,
	label,
	toastClasses,
	icon,
	showProgress = true,
	progressClasses,
	position = "bottom-centre",
	customToastPosition,
	customAnimation,
}: ReuseToastProps) => {
	const defaultToastClasses =
		"absolute bg-black text-white px-3 py-2 flex items-center gap-x-2 rounded";
	const defaultToastPositionClasses = POSITION_CONFIG[position].position;
	const defaultProgressClasses = "absolute top-0 left-0 bg-white h-1";

	const { progress } = useProgress({
		progressInterval: timeout,
		running: true,
	});

	//This show state is here so that we can animate the exit animation which is of duration 0.2 seconds
	//Without this the exit animation was not working as the div is unmounted from the UI
	const [show, setShow] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setShow(false);
		}, timeout - 200);
	}, []);

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={
						customAnimation
							? customAnimation.initial
							: POSITION_CONFIG[position].animations.initial
					}
					animate={
						customAnimation
							? customAnimation.animate
							: POSITION_CONFIG[position].animations.animate
					}
					exit={
						customAnimation
							? customAnimation.exit
							: POSITION_CONFIG[position].animations.exit
					}
					transition={
						customAnimation
							? customAnimation.transition
							: POSITION_CONFIG[position].animations.transition
					}
					className={twMerge(
						defaultToastClasses,
						toastClasses ? toastClasses : "",
						customToastPosition
							? customToastPosition
							: defaultToastPositionClasses,
					)}
				>
					{showProgress && (
						<div
							className={
								progressClasses ? progressClasses : defaultProgressClasses
							}
							style={{
								width: `${100 - progress}%`,
							}}
						/>
					)}
					{icon}
					{label}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const ReuseToast = async (props: ReuseToastProps) => {
	return await HeadlessToast({
		component: <ExportableComponent {...props} />,
		timeout: props.timeout + 100,
	});
};

export default ReuseToast;
