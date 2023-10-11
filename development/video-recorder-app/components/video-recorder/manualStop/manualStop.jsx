import React, { useRef } from "react";
import { HeadlessVideoRecorder } from "@locoworks/reusejs-react-video-recorder";

// Import New Component created here
// import <component-name> from "@locoworks/remark-folder-<component-name>"

const ManualStopVideoRecorder = () => {
	const videoRecorderRef = useRef(null);
	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 border rounded gap-x-3 bg-gray-50">
			<HeadlessVideoRecorder 
            	autoStop={false}
            />
		</div>
	);
};

export default ManualStopVideoRecorder;
