import React from "react";
import { TextEditor } from "@locoworks/reusejs-react-text-editor";
import "@locoworks/reusejs-react-text-editor/css";

const Example = () => {
	function useMentionLookupService() {
		return [
			{ mentionName: "user_xxx", label: "Rajiv" },
			{ mentionName: "user_yyy", label: "Upneet" },
		];
	}

	function convertFileToImageUrl(files: FileList | null) {
		if (files) {
			const imgUrl = URL.createObjectURL(files[0]);
			return imgUrl;
		}
		return null;
	}

	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 border rounded gap-x-3 bg-gray-50">
			<TextEditor
				useMentionLookupService={useMentionLookupService}
				convertFileToImageUrl={convertFileToImageUrl}
			/>
		</div>
	);
};

export default Example;
