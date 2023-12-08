import React from "react";
import { HeadlessFileUpload } from "@locoworks/reusejs-react-file-upload";

const HeadlessFileUploadSample = () => {
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<HeadlessFileUpload />
		</div>
	);
};

export default HeadlessFileUploadSample;
