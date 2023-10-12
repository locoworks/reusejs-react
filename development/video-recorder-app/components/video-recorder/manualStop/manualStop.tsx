import React, { useRef, useState } from "react";
import {
	HeadlessVideoRecorder,
	HeadlessVideoRecorderRef,
	VideoState,
} from "@locoworks/reusejs-react-video-recorder";

const ManualStopVideoRecorder: React.FC = () => {
	const videoRecorderRef = useRef<HeadlessVideoRecorderRef>(null);
	const [recordingState, setRecordingState] = useState<VideoState>("inactive");

	const showPreview = () => {
		if (videoRecorderRef.current) {
			videoRecorderRef.current.showPreview();
		} else {
			console.error("videoRecorderRef is null");
		}
	};

	const RetakeButton = ({ onRetake }: any) => {
		return (
			<button className="w-auto p-2 bg-blue-200 border " onClick={onRetake}>
				Retake Recording
			</button>
		);
	};

	const DownloadButton = ({ onDownload }: any) => {
		return (
			<button className="p-2 bg-blue-200 border" onClick={onDownload}>
				Download Recording
			</button>
		);
	};

	const CountDown = ({ count }: any) => {
		return (
			<div className="flex p-2 font-semibold border">
				00:{count < 10 ? `0${count}` : count}
			</div>
		);
	};

	const StopRecording = ({ onStop }: any) => {
		return (
			<button className="p-2 bg-blue-200 border" onClick={onStop}>
				Stop Recording
			</button>
		);
	};

	const StartRecording = ({ onStart }: any) => {
		return (
			<button className="p-2 bg-blue-200 border" onClick={onStart}>
				Start Recording
			</button>
		);
	};

	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 border rounded gap-x-3 bg-gray-50">
			<HeadlessVideoRecorder
				ref={videoRecorderRef}
				autoStop={false}
				autoPreview={false}
				handleStateChange={(state) => setRecordingState(state)}
				customRetakeButton={(onRetake: any) => (
					<RetakeButton onRetake={onRetake} />
				)}
				customDownloadButton={(onDownload) => (
					<DownloadButton onDownload={onDownload} />
				)}
				customCountDown={(count) => <CountDown count={count} />}
				customStopRecording={(onStop) => <StopRecording onStop={onStop} />}
				customStartRecording={(onStart) => <StartRecording onStart={onStart} />}
			/>

			{recordingState == "inactive" && (
				<button className="p-2 bg-blue-300 border" onClick={showPreview}>
					Show Preview
				</button>
			)}
		</div>
	);
};

export default ManualStopVideoRecorder;
