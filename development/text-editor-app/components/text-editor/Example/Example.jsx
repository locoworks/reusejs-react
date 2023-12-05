import React, { useState } from "react";
import { TextEditor } from "@locoworks/reusejs-react-text-editor";
import "@locoworks/reusejs-react-text-editor/css";

const Example = () => {
	const [editable, setEditable] = useState(false);
	const [data, setData] = useState("Here");

	function useMentionLookupService() {
		return [
			{ mentionName: "user_xxx", label: "xxx" },
			{ mentionName: "user_yyy", label: "yyy" },
		];
	}

	function convertFileToImageUrl(files) {
		if (files) {
			const imgUrl = URL.createObjectURL(files[0]);
			return imgUrl;
		}
		return null;
	}

	function OnChange(_editorRef, payload) {
		setData(payload["html"]);
	}

	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 bg-gray-100 border rounded gap-x-3">
			<TextEditor
				editable={editable}
				useMentionLookupService={useMentionLookupService}
				convertFileToImageUrl={convertFileToImageUrl}
				onChangeCallback={OnChange}
			/>
			{editable ? (
				<button
					className="button"
					onClick={() => {
						setEditable(false);
					}}
				>
					Save
				</button>
			) : (
				<div
					className="w-full min-h-[50px] cursor-text"
					dangerouslySetInnerHTML={{ __html: data }}
					onClick={() => {
						setEditable(true);
					}}
				/>
			)}
		</div>
	);
};

export default Example;
