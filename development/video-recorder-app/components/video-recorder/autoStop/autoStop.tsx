import React, { useRef, useState } from "react";
import { HeadlessVideoRecorder } from "@locoworks/reusejs-react-video-recorder";

interface HeadlessVideoRecorderRef {
	recording: string;
	handleDownload: () => void;
	showPreview: () => void;
}
const AutoStopVideoRecorder: React.FC = () => {
	const videoRecorderRef = useRef<HeadlessVideoRecorderRef>(null);
	const [recordingState, setRecordingState] = useState<string>(
		videoRecorderRef.current?.recording || "inactive",
	);

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
				handleStateChange={(state) => setRecordingState(state)}
			/>

			{recordingState == "inactive" && (
				<button className="p-2 bg-blue-300 border" onClick={showPreview}>
					Show Preview
				</button>
			)}
			{recordingState == "recorded" && (
				<button className="p-2 bg-blue-300 border" onClick={downloadHandler}>
					Download Video
				</button>
			)}
		</div>
	);
};

export default AutoStopVideoRecorder;
