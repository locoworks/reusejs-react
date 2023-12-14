import React, { useRef } from "react";
import {
	HeadlessVideoRecorder,
	HeadlessVideoRecorderRef,
} from "@locoworks/reusejs-react-video-recorder";

const Example = () => {
	const videoRecorderRef = useRef<HeadlessVideoRecorderRef>(null);
	const mediaConstraints = {
		video: {
			width: { ideal: 440, max: 440 },
			height: { ideal: 280, max: 280 },
		},
		audio: false,
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
			<button className="p-2 bg-blue-300 border" onClick={showPreview}>
				Show Preview
			</button>
			<HeadlessVideoRecorder
				ref={videoRecorderRef}
				mediaConstraints={mediaConstraints}
				autoPreview={false}
			/>
		</div>
	);
};

export default Example;
