import React from "react";
import { HeadlessVideoRecorder } from "@locoworks/reusejs-react-video-recorder";

const Example = () => {
	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 border rounded gap-x-3 bg-gray-50">
			<HeadlessVideoRecorder />
		</div>
	);
};

export default Example;
