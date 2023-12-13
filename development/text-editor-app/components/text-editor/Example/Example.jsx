import React, { useEffect, useState } from "react";
import { TextEditor } from "@locoworks/reusejs-react-text-editor";
import "@locoworks/reusejs-react-text-editor/css";

const Example = () => {
	const [editable, setEditable] = useState(false);
	const [data, setData] = useState("Here");

	const dummyMentionsData = [
		"Aayla Secura",
		"Adi Gallia",
		"Niima the Hutt",
		"Nines",
		"Norra Wexley",
		"Nute Gunray",
		"Val Beckett",
		"Vanden Willard",
		"Vice Admiral Amilyn Holdo",
		"Vober Dand",
		"WAC-47",
		"Wedge Antilles",
		"Wes Janson",
		"Wicket W. Warrick",
		"Wilhuff Tarkin",
		"Wollivan",
		"Wuher",
		"Wullf Yularen",
		"Xamuel Lennox",
		"Yaddle",
		"Yarael Poof",
		"Yoda",
		"Zam Wesell",
		"Zev Senesca",
		"Ziro the Hutt",
		"Zuckuss",
	].map((name) => ({
		mentionName: `user_${name}`,
		label: name,
	}));

	function useMentionLookupService(mentionString, mentionsData) {
		const [results, setResults] = useState([]);

		useEffect(() => {
			if (mentionString === null) {
				setResults([]);
			} else {
				setResults(
					mentionsData.filter((mention) =>
						mention.label.toLowerCase().includes(mentionString.toLowerCase()),
					),
				);
			}
		}, [mentionString]);

		return results;
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
				editable={editable}
				setEditable={setEditable}
				mentionsData={dummyMentionsData}
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

export default Example;
