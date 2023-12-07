import React, { useState } from "react";
import { $getRoot, $createTextNode, $createParagraphNode } from "lexical";
import { TextEditor } from "@locoworks/reusejs-react-text-editor";
import "@locoworks/reusejs-react-text-editor/css";

const PrepopulatedTextEditor = () => {
	const [editable, setEditable] = useState(false);
	const [data, setData] = useState("");

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

	function onChange(_editorRef, payload) {
		setData(payload["html"]);
	}

	function prepopulatedRichText() {
		const root = $getRoot();
		if (root.getFirstChild() === null) {
			const paragraph = $createParagraphNode();
			paragraph.append($createTextNode("Start here!"));
			root.append(paragraph);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 bg-gray-100 border rounded gap-x-3">
			<TextEditor
				prePopulate={prepopulatedRichText}
				editable={editable}
				setEditable={setEditable}
				useMentionLookupService={useMentionLookupService}
				convertFileToImageUrl={convertFileToImageUrl}
				onChangeCallback={onChange}
			/>
			{!editable && (
				<div
					className="w-full min-h-[50px] cursor-text bg-white"
					dangerouslySetInnerHTML={{ __html: data }}
					onClick={() => {
						setEditable(true);
					}}
				/>
			)}
		</div>
	);
};

export default PrepopulatedTextEditor;
