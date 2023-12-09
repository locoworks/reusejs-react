import React, { useState } from "react";
import { TextEditor } from "@locoworks/reusejs-react-text-editor";
import "@locoworks/reusejs-react-text-editor/css";

const PrepopulatedTextEditor = () => {
	const htmlData = `<p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Delivery was increasing prior to 2020 and became particularly important during the COVID-19 pandemic. The Delivery Experience tracker helps Chick-fil-A identify best in class delivery brands in and out of the QSR industry. This research also helps Chick-fil-A determine drivers of excellent delivery experiences across QSRs and then track Chick-fil-A performance vs competitors on those drivers over time.</span></p><table class="html_table"><colgroup><col><col><col><col><col></colgroup><tbody><tr><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">fsdjhfksfdsf</span></p></th><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dsdddd</span></p></th><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">sdsakjdsn</span></p></th><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dsdsadasdas</span></p></th><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dadsadas</span></p></th></tr><tr><th class="html_cell"><p class="EditorTheme__paragraph"><span style="white-space: pre-wrap;">fsdjhfksfdsf</span></p></th><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dsadbmnad</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dsadbmnad</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dsadbmnad</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dsadbmnad</span></p></td></tr><tr><th class="html_cell"><p class="EditorTheme__paragraph"><span style="white-space: pre-wrap;">fsdjhfksfdsf</span></p></th><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">sdadad</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">sdadad</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">sdadad</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">sdadad</span></p></td></tr></tbody></table><p class="EditorTheme__paragraph"><img src="https://plus.unsplash.com/premium_photo-1668104454442-a251cc42ee58?q=80&amp;w=1887&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="random" width="205" height="307.55126876831054"></p>`;

	const [editable, setEditable] = useState(false);
	const [data, setData] = useState(htmlData);

	function useMentionLookupService() {
		return [
			{ mentionName: "user_xxx", label: "xxx" },
			{ mentionName: "user_yyy", label: "yyy" },
		];
	}

	function convertFilesToImageUrl(files) {
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

	function onChange(_editorRef, payload) {
		setData(payload["html"]);
	}

	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 bg-gray-100 border rounded gap-x-3">
			<TextEditor
				htmlData={htmlData}
				editable={editable}
				setEditable={setEditable}
				useMentionLookupService={useMentionLookupService}
				convertFilesToImageUrl={convertFilesToImageUrl}
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
