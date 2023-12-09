import React, { useEffect, useState } from "react";
import { LexicalEditor } from "lexical";
import { TextEditor } from "@locoworks/reusejs-react-text-editor";
import "@locoworks/reusejs-react-text-editor/css";

const Example = () => {
	const [editable, setEditable] = useState<boolean>(false);
	const [data, setData] = useState<string | TrustedHTML>("Here");

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

	const dummyLookupService = {
		search(
			string: string,
			callback: (
				results: Array<{ mentionName: string; label: string }>,
			) => void,
		): void {
			setTimeout(() => {
				const results = dummyMentionsData.filter((mention) =>
					mention.label.toLowerCase().includes(string.toLowerCase()),
				);
				callback(results);
			}, 500);
		},
	};

	function useMentionLookupService(mentionString: string | null) {
		const [results, setResults] = useState<
			Array<{ mentionName: string; label: string }>
		>([]);

		useEffect(() => {
			if (mentionString === null) {
				setResults([]);
			} else {
				dummyLookupService.search(mentionString, (newResults) => {
					setResults(newResults);
				});
			}
		}, [mentionString]);

		return results;
	}

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
