import React, { CSSProperties, useEffect, useState } from "react";
import { useProgress } from "@locoworks/reusejs-toolkit-react-hooks";
import { twMerge } from "tailwind-merge";

interface CircularProgressInterface {
	progressInterval: number;
	defaultProgress: number;
	running: boolean;
	totalFileSize?: number;
	processedFileSize?: number;
	progressClasses?: string | CSSProperties;
	progressContainerClasses?: string | CSSProperties;
	progressText?: (progressValue: number) => React.ReactNode | string;
	progressTextClasses?: string | CSSProperties;
	radius?: number;
	circleRadiusInPercentage?: string;
	circleClasses?: string | CSSProperties;
	circleContainerClasses?: string | CSSProperties;
	innerCircleClasses?: string | CSSProperties;
	outerCircleClasses?: string | CSSProperties;
	progressLoop?: boolean;
}

const CircularProgressBar = ({
	progressClasses,
	progressContainerClasses,
	progressInterval,
	running,
	defaultProgress,
	totalFileSize = 0,
	processedFileSize = 0,
	progressText,
	progressTextClasses,
	radius = 95,
	circleRadiusInPercentage = "45%",
	circleContainerClasses,
	innerCircleClasses,
	outerCircleClasses,
}: CircularProgressInterface) => {
	const defaultProgressContainerClasses =
		"flex h-full w-full justify-center items-center flex h-2 rounded-md mx-1 overflow-hidden";

	const defaultCircleContainerClasses =
		"relative flex flex-col justify-center items-center";

	const defaultProgressClasses = "w-52 h-52 rounded-full ";
	const defaultCircleClasses =
		"fill-transparent stroke-[10] -rotate-90 origin-center stroke-gray-300";

	const [progressStyle, setProgressStyle] = useState({});
	const [statusStyle, setStatusStyle] = useState({});

	const { progress } = useProgress({
		progressInterval,
		running,
		defaultProgress,
		totalFileSize,
		processedFileSize,
	});

	useEffect(() => {
		const circumference = 2 * Math.PI * radius;
		const offset = circumference - (progress / 100) * circumference;

		setProgressStyle({
			strokeDasharray: `${circumference} ${circumference}`,
			strokeDashoffset: offset,
		});

		setStatusStyle({
			strokeDasharray: `${circumference} ${circumference}`,
			strokeDashoffset: 0,
		});
	}, [progress]);
	return (
		<div
			className={
				typeof progressContainerClasses === "string"
					? twMerge(defaultProgressContainerClasses, progressContainerClasses)
					: defaultProgressContainerClasses
			}
			style={
				typeof progressContainerClasses === "object"
					? progressContainerClasses
					: {}
			}
		>
			<div
				className={
					typeof circleContainerClasses === "string"
						? twMerge(defaultCircleContainerClasses, circleContainerClasses)
						: defaultCircleContainerClasses
				}
				style={
					typeof circleContainerClasses === "object"
						? circleContainerClasses
						: {}
				}
			>
				<svg
					className={
						typeof progressClasses === "string"
							? twMerge(defaultProgressClasses, progressClasses)
							: defaultProgressClasses
					}
					style={typeof progressClasses === "object" ? progressClasses : {}}
				>
					<circle
						className={
							typeof innerCircleClasses === "string"
								? twMerge(defaultCircleClasses, innerCircleClasses)
								: defaultCircleClasses
						}
						cx="50%"
						cy="50%"
						r={circleRadiusInPercentage}
						style={
							typeof innerCircleClasses === "object"
								? { ...innerCircleClasses, ...statusStyle }
								: statusStyle
						}
					></circle>
					<circle
						className={
							typeof outerCircleClasses === "string"
								? twMerge(defaultCircleClasses, outerCircleClasses)
								: defaultCircleClasses
						}
						cx="50%"
						cy="50%"
						r={circleRadiusInPercentage}
						style={
							typeof outerCircleClasses === "object"
								? { ...outerCircleClasses, ...progressStyle }
								: progressStyle
						}
					></circle>
				</svg>
				{progressText ? (
					<div
						className={
							typeof progressTextClasses === "string" ? progressTextClasses : ""
						}
						style={
							typeof progressTextClasses === "object" ? progressTextClasses : {}
						}
					>
						{progressText(progress)}
					</div>
				) : (
					<div
						className={` ${
							typeof progressTextClasses === "string" ? progressTextClasses : ""
						}`}
					>
						{progress}%
					</div>
				)}
			</div>
		</div>
	);
};

export default CircularProgressBar;
