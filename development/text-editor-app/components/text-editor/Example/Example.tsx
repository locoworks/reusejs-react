import React, { useEffect, useState } from "react";
import { LexicalEditor } from "lexical";
import { TextEditor } from "@locoworks/reusejs-react-text-editor";
import "@locoworks/reusejs-react-text-editor/css";

const Example = () => {
	const [editable, setEditable] = useState<boolean>(false);
	// const htmlData: string = `<table class="html_table"><colgroup><col><col><col></colgroup><tbody><tr><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Company</span></p></th><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Contact</span></p></th><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Country</span></p></th></tr><tr><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Alfreds Futterkiste</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Maria Anders</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Germany</span></p></td></tr><tr><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Centro comercial Moctezuma</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Francisco Chang</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Mexico</span></p></td></tr><tr><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Ernst Handel</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Roland Mendel</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Austria</span></p></td></tr><tr><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Island Trading</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Helen Bennett</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">UK</span></p></td></tr><tr><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Laughing Bacchus Winecellars</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Yoshi Tannamuri</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Canada</span></p></td></tr><tr><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Magazzini Alimentari Riuniti</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Giovanni Rovelli</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Italy</span></p></td></tr></tbody></table>`;
	const [data, setData] = useState<string | TrustedHTML>("");

	// useEffect(() => {
	// 	console.log(data, "___data");
	// 	setData(htmlData);
	// }, [data]);

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
		console.log(payload["html"], "____________payload");
	}

	const htmlData = `<p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">Delivery was increasing prior to 2020 and became particularly important during the COVID-19 pandemic. The Delivery Experience tracker helps Chick-fil-A identify best in class delivery brands in and out of the QSR industry. This research also helps Chick-fil-A determine drivers of excellent delivery experiences across QSRs and then track Chick-fil-A performance vs competitors on those drivers over time.</span></p><table class="html_table"><colgroup><col><col><col><col><col></colgroup><tbody><tr><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">fsdjhfksfdsf</span></p></th><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dsdddd</span></p></th><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">sdsakjdsn</span></p></th><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dsdsadasdas</span></p></th><th class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dadsadas</span></p></th></tr><tr><th class="html_cell"><p class="EditorTheme__paragraph"><span style="white-space: pre-wrap;">fsdjhfksfdsf</span></p></th><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dsadbmnad</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dsadbmnad</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dsadbmnad</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">dsadbmnad</span></p></td></tr><tr><th class="html_cell"><p class="EditorTheme__paragraph"><span style="white-space: pre-wrap;">fsdjhfksfdsf</span></p></th><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">sdadad</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">sdadad</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">sdadad</span></p></td><td class="html_cell"><p class="EditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">sdadad</span></p></td></tr></tbody></table>`;

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

export default Example;
