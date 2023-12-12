import React, { useEffect, useState } from "react";
import { LexicalEditor } from "lexical";
import { TextEditor } from "@locoworks/reusejs-react-text-editor";
import "@locoworks/reusejs-react-text-editor/css";

const PrepopulatedTextEditor = () => {
	const payload: string = `<table>
	 	<tr>
	 	  <th>Company</th>
	 	  <th>Contact</th>
	 	  <th>Country</th>
	 	</tr>
	 	<tr>
	 	  <td>Alfreds Futterkiste</td>
	 	  <td>Maria Anders</td>
	 	  <td>Germany</td>
	 	</tr>
	 	<tr>
	 	  <td>Centro comercial Moctezuma</td>
	 	  <td>Francisco Chang</td>
	 	  <td>Mexico</td>
	 	</tr>
	 	<tr>
	 	  <td>Ernst Handel</td>
	 	  <td>Roland Mendel</td>
	 	  <td>Austria</td>
	 	</tr>
	 	<tr>
	 	  <td>Island Trading</td>
	 	  <td>Helen Bennett</td>
	 	  <td>UK</td>
	 	</tr>
	 	<tr>
	 	  <td>Laughing Bacchus Winecellars</td>
	 	  <td>Yoshi Tannamuri</td>
	 	  <td>Canada</td>
	 	</tr>
	 	<tr>
	 	  <td>Magazzini Alimentari Riuniti</td>
	 	  <td>Giovanni Rovelli</td>
	 	  <td>Italy</td>
	 	</tr>
	   </table>
	  `;
	const [htmlData, setHtmlData] = useState(`<p>Here hello</p>`);

	setTimeout(() => {
		setHtmlData(payload);
	}, 5000);

	useEffect(() => {
		setData(htmlData);
	}, [htmlData]);

	const [editable, setEditable] = useState<boolean>(false);
	const [data, setData] = useState<string | TrustedHTML>(htmlData);
	const dummyData = [
		{ mentionName: "user_xxx", label: "xxx" },
		{ mentionName: "user_yyy", label: "yyy" },
		{ mentionName: "user_zzz", label: "zzz" },
		{ mentionName: "user_www", label: "www" },
		{ mentionName: "user_vvv", label: "vvv" },
	];

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
				htmlData={htmlData}
				editable={true}
				setEditable={setEditable}
				mentionsData={dummyData}
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
