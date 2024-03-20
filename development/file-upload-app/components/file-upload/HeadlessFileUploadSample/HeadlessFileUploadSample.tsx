import React from "react";
import { HeadLessFileUpload } from "@locoworks/reusejs-react-file-upload";

const HeadlessFileUploadSample = () => {
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<HeadLessFileUpload />
		</div>
	);
};

export default HeadlessFileUploadSample;
