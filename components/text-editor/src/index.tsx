import React, { useRef } from "react";
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
	editable: boolean;
	prePopulate?: () => void;
};

const TextEditor = ({
	useMentionLookupService,
	convertFileToImageUrl,
	onChangeCallback,
	wrapperClass,
	editable,
	prePopulate,
}: Props) => {
	const editorRef = useRef<LexicalEditor>(null);
	const initialConfig = {
		editorState: prePopulate || null,
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
		<div className={wrapperClass || "w-full"}>
			<LexicalComposer initialConfig={initialConfig}>
				<TableContext>
					<div className="editor-shell">
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
		</div>
	);
};

export default TextEditor;
