import React, { useRef, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { LexicalEditor } from "lexical";

import Editor from "./Editor";
import { EditorTheme } from "../theme";
import { TableNode as NewTableNode } from "../plugins/TablePlugin/TableNode";
import { MentionNode } from "../plugins/MentionPlugin/MentionNode";
import { TableContext } from "../plugins/TablePlugin/TablePlugin";
import { ImageNode } from "../plugins/ImagePlugin/ImageNode";

type Props = {
	useMentionLookupService: (mentionString: string | null) => Array<{
		mentionName: string;
		label: string;
	}>;
	convertFileToImageUrl: (files: FileList | null) => string | null;
	onChangeCallback?: (editorRef: LexicalEditor | null, payload: any) => void;
	wrapperClass?: string;
};
const TextEditor = ({
	useMentionLookupService,
	convertFileToImageUrl,
	onChangeCallback,
	wrapperClass,
}: Props) => {
	const editorRef = useRef<LexicalEditor>(null);
	const [editable, setEditable] = useState<boolean>(false);

	const initialConfig = {
		namespace: "MyEditor",
		theme: EditorTheme,
		onError: (error: Error) => {
			throw error;
		},
		nodes: [
			HeadingNode,
			ListNode,
			ListItemNode,
			LinkNode,
			AutoLinkNode,
			NewTableNode,
			MentionNode,
			ImageNode,
		],
		editable: true,
	};

	return (
		<div
			className={
				(wrapperClass || "w-full bg-gray-50 ") +
				`${editable ? " cursor-pointer" : " cursor-text"}`
			}
		>
			<LexicalComposer initialConfig={initialConfig}>
				<TableContext>
					<div
						className="editor-shell"
						onClick={() => {
							setEditable(true);
						}}
					>
						<Editor
							convertFileToImageUrl={convertFileToImageUrl}
							useMentionLookupService={useMentionLookupService}
							onChangeCallback={onChangeCallback}
							editState={editable}
							editorRef={editorRef}
						/>
					</div>
				</TableContext>
			</LexicalComposer>
			{editable && (
				<button
					className="px-4 py-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100"
					onClick={() => {
						setEditable(false);
					}}
				>
					Save
				</button>
			)}
		</div>
	);
};

export default TextEditor;
