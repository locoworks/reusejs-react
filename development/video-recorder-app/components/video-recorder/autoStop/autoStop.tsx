import React, { useEffect, useRef } from "react";
import { HeadlessVideoRecorder } from "@locoworks/reusejs-react-video-recorder";

// Import New Component created here
// import <component-name> from "@locoworks/remark-folder-<component-name>"
interface HeadlessVideoRecorderRef {
	recording: string;
	handleDownload: () => void;
	showPreview: () => void;
}
const AutoStopVideoRecorder: React.FC = () => {
	const videoRecorderRef = useRef<HeadlessVideoRecorderRef>(null);
	const [isLoading, setIsLoading] = React.useState(true);

	useEffect(() => {
		console.log(
			"Recording in PARENT changed",
			videoRecorderRef.current?.recording,
		);
		console.log(videoRecorderRef.current, "___obj__");

		if (videoRecorderRef.current?.recording === "inactive") {
			setIsLoading(false);
		}
	}, [videoRecorderRef.current?.recording]);

	const downloadHandler = () => {
		if (videoRecorderRef.current) {
			videoRecorderRef.current.handleDownload();
		} else {
			console.error("videoRecorderRef is null");
		}
	};

	const showPreview = () => {
		if (videoRecorderRef.current) {
			videoRecorderRef.current.showPreview();
		} else {
			console.error("videoRecorderRef is null");
		}
	};

	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 border rounded gap-x-3 bg-gray-50">
			<HeadlessVideoRecorder
				ref={videoRecorderRef}
				autoStop={true}
				timeInMs={10000}
				// handleDownloadCallback={(setRecording) => {
				// 	console.log(setRecording);
				// 	setRecording("preview");
				// }}
			/>
			{!isLoading && videoRecorderRef.current && (
				<>
					{videoRecorderRef.current.recording === "inactive" && (
						<button className="p-2 bg-blue-300 border" onClick={showPreview}>
							Show Preview
						</button>
					)}
					{videoRecorderRef.current.recording === "recorded" && (
						<button
							className="p-2 bg-blue-300 border"
							onClick={downloadHandler}
						>
							Download Video
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default AutoStopVideoRecorder;
