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
	function OnChange(editorRef: any, payload: any) {
		console.log(payload, "payload", editorRef, "editorRef");
	}
	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 bg-gray-100 border rounded gap-x-3">
			<TextEditor
				useMentionLookupService={useMentionLookupService}
				convertFileToImageUrl={convertFileToImageUrl}
				onChangeCallback={OnChange}
			/>
		</div>
	);
};

export default Example;
