import React, { useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { LexicalEditor } from "lexical";
import { twMerge } from "tailwind-merge";

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
	convertFilesToImageUrl: (files: FileList | null) => Array<string> | null;
	onChangeCallback?: (editorRef: LexicalEditor | null, payload: any) => void;
	wrapperClass?: string;
	editable: boolean;
	setEditable: React.Dispatch<React.SetStateAction<boolean>>;
	placeholderText?: string;
	htmlData?: string;
};

const TextEditor = ({
	useMentionLookupService,
	convertFilesToImageUrl,
	onChangeCallback,
	wrapperClass,
	editable,
	setEditable,
	placeholderText,
	htmlData,
}: Props) => {
	const editorRef = useRef<LexicalEditor>(null);

	const initialConfig = {
		editorState: null,
		namespace: "Editor",
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
		<div className={twMerge("w-full", wrapperClass)}>
			<LexicalComposer initialConfig={initialConfig}>
				<TableContext>
					<div className="editor-shell">
						<Editor
							htmlData={htmlData}
							convertFilesToImageUrl={convertFilesToImageUrl}
							useMentionLookupService={useMentionLookupService}
							onChangeCallback={onChangeCallback}
							editState={editable}
							setEditable={setEditable}
							editorRef={editorRef}
							placeholderText={placeholderText}
						/>
					</div>
				</TableContext>
			</LexicalComposer>
		</div>
	);
};

export default TextEditor;
