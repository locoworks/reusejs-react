import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

type RecordingFooterProps = {
	countDown: number;
	autoStop: boolean;
	onStop: () => void;
	customCountDown?: (count: number) => React.ReactNode;
	customStopRecording?: (onStop: any) => React.ReactNode;
	footerContainerClasses?: string | CSSProperties;
	recordingFooterClasses?: string | CSSProperties;
	stopLabel?: string;
};
export const RecordingFooter: React.FC<RecordingFooterProps> = ({
	countDown,
	customCountDown,
	autoStop,
	onStop,
	customStopRecording,
	footerContainerClasses,
	recordingFooterClasses,
	stopLabel,
}) => {
	const defaultFooterContainerClasses = "py-5 mt-2 footer px-7";
	const defaultRecordingFooterClasses = "flex justify-between";
	return (
		<div
			className={
				typeof footerContainerClasses === "string"
					? twMerge(defaultFooterContainerClasses, footerContainerClasses)
					: defaultFooterContainerClasses
			}
			style={
				typeof footerContainerClasses === "object" ? footerContainerClasses : {}
			}
		>
			<div
				className={
					typeof recordingFooterClasses === "string"
						? twMerge(defaultRecordingFooterClasses, recordingFooterClasses)
						: defaultRecordingFooterClasses
				}
				style={
					typeof recordingFooterClasses === "object"
						? recordingFooterClasses
						: {}
				}
			>
				{customCountDown ? (
					customCountDown(countDown)
				) : (
					<span className="block font-semibold text-neutral-0">
						00:{countDown < 10 ? `0${countDown}` : countDown}
					</span>
				)}
				{!autoStop &&
					(customStopRecording ? (
						customStopRecording(onStop)
					) : (
						<button
							className="p-3 bg-blue-400 border border-red-200 rounded-lg"
							onClick={onStop}
						>
							{stopLabel ?? "Stop Recording"}
						</button>
					))}
			</div>
		</div>
	);
};
