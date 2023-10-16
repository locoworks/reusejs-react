import React, { CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

type PreviewFooterProps = {
	handleStartRecording: () => void;
	customStartRecording?: (onStart: any) => React.ReactNode;
	footerContainerClasses?: string | CSSProperties;
	startRecordingbuttonClasses?: string | CSSProperties;
	previewFooterClasses?: string | CSSProperties;
	startLabel?: string;
};
export const PreviewFooter: React.FC<PreviewFooterProps> = ({
	handleStartRecording,
	customStartRecording,
	footerContainerClasses,
	startRecordingbuttonClasses,
	previewFooterClasses,
	startLabel,
}) => {
	const defaultFooterContainerClasses = "";
	const defaultPreviewFooterClasses = "flex gap-2 footer px-7 ";
	const defaultStartRecordingbuttonClasses =
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
					typeof previewFooterClasses === "string"
						? twMerge(defaultPreviewFooterClasses, previewFooterClasses)
						: defaultPreviewFooterClasses
				}
				style={
					typeof previewFooterClasses === "object" ? previewFooterClasses : {}
				}
			>
				{customStartRecording ? (
					customStartRecording(handleStartRecording)
				) : (
					<button
						className={
							typeof startRecordingbuttonClasses === "string"
								? twMerge(
										defaultStartRecordingbuttonClasses,
										startRecordingbuttonClasses,
								  )
								: defaultStartRecordingbuttonClasses
						}
						style={
							typeof startRecordingbuttonClasses === "object"
								? startRecordingbuttonClasses
								: {}
						}
						onClick={handleStartRecording}
					>
						{startLabel ?? "Start Recording"}
					</button>
				)}
			</div>
		</div>
	);
};
