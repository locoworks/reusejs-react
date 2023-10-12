import React from "react";
import { HeadlessVideoRecorder } from "@locoworks/reusejs-react-video-recorder";

const Example = () => {
	const mediaConstraints = {
		video: {
			width: 440,
			height: 280,
		},
		audio: false,
	};
	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 border rounded gap-x-3 bg-gray-50">
			<HeadlessVideoRecorder mediaConstraints={mediaConstraints} />
		</div>
	);
};

export default Example;
