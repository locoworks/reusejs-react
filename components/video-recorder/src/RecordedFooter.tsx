import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

type RecordedFooterProps = {
	onRetake: () => void;
	customRetakeButton?: (onRetake: any) => React.ReactNode;
	onDownload: () => void;
	customDownloadButton?: (onDownload: any) => React.ReactNode;
	footerContainerClasses?: string | CSSProperties;
	recordedFooterClasses?: string | CSSProperties;
	retakeButtonClasses?: string | CSSProperties;
	downloadButtonClasses?: string | CSSProperties;
	retakeLabel?: string;
	downloadLabel?: string;
};
export const RecordedFooter: React.FC<RecordedFooterProps> = ({
	onRetake,
	customRetakeButton,
	onDownload,
	customDownloadButton,
	footerContainerClasses,
	recordedFooterClasses,
	retakeButtonClasses,
	downloadButtonClasses,
	retakeLabel,
	downloadLabel,
}) => {
	const defaultFooterContainerClasses = "py-5 mt-2 footer px-7";
	const defaultRecordedClasses = "flex justify-between";
	const defaultButtonClasses =
		"p-3 bg-blue-400 border border-red-200 rounded-lg";
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
					typeof recordedFooterClasses === "string"
						? twMerge(defaultRecordedClasses, recordedFooterClasses)
						: defaultRecordedClasses
				}
			>
				{customRetakeButton ? (
					customRetakeButton(onRetake)
				) : (
					<button
						className={
							typeof retakeButtonClasses === "string"
								? twMerge(defaultButtonClasses, retakeButtonClasses)
								: defaultButtonClasses
						}
						style={
							typeof retakeButtonClasses === "object" ? retakeButtonClasses : {}
						}
						onClick={onRetake}
					>
						{retakeLabel ?? "Retake Video"}
					</button>
				)}
				{customDownloadButton ? (
					customDownloadButton(onDownload)
				) : (
					<button
						className={
							typeof downloadButtonClasses === "string"
								? twMerge(defaultButtonClasses, downloadButtonClasses)
								: defaultButtonClasses
						}
						style={
							typeof downloadButtonClasses === "object"
								? downloadButtonClasses
								: {}
						}
						onClick={onDownload}
					>
						{downloadLabel ?? "Download Video"}
					</button>
				)}
			</div>
		</div>
	);
};
