import React, { useState } from "react";
import { LexicalEditor } from "lexical";
import { TextEditor } from "@locoworks/reusejs-react-text-editor";
import "@locoworks/reusejs-react-text-editor/css";

const Example = () => {
	const [editable, setEditable] = useState<boolean>(false);
	const [data, setData] = useState<string | TrustedHTML>("Here");

	function convertFilesToImageUrl(files: FileList | null) {
		if (!files || files.length === 0) {
			return null;
		}
		const imageUrls = [];

		for (let i = 0; i < files.length; i++) {
			const file = files[i];

			const imageUrl = URL.createObjectURL(file);
			imageUrls.push(imageUrl);
		}
		return imageUrls.length > 0 ? imageUrls : null;
	}

	function onChange(_editorRef: LexicalEditor | null, payload: any) {
		setData(payload["html"]);
	}

	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 bg-gray-100 border rounded gap-x-3">
			<TextEditor
				editable={editable}
				setEditable={setEditable}
				convertFilesToImageUrl={convertFilesToImageUrl}
				onChangeCallback={onChange}
				hideToolbar={false}
				showToolbarText={true}
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

export default Example;
