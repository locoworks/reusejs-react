import React, { useEffect, useState } from "react";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import {
	AutoLinkPlugin,
	createLinkMatcherWithRegExp,
} from "@lexical/react/LexicalAutoLinkPlugin";
import useLexicalEditable from "@lexical/react/useLexicalEditable";
import { HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
	$getRoot,
	$isElementNode,
	$nodesOfType,
	EditorState,
	LexicalEditor,
	LexicalNode,
} from "lexical";

import { EditorTheme } from "../theme";
import { MentionNode } from "../plugins/MentionPlugin/MentionNode";
import { ImageNode } from "../plugins/ImagePlugin/ImageNode";
import { TablePlugin as NewTablePlugin } from "../plugins/TablePlugin/TablePlugin";
import MentionPlugin from "../plugins/MentionPlugin/MentionPlugin";
import ImagesPlugin from "../plugins/ImagePlugin/ImagePlugin";
import ToolbarPlugin from "./Toolbar";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { $isTableNode, Cell } from "../plugins/TablePlugin/TableNode";
import { DraggableBlockPlugin } from "../plugins/DraggableBlockPlugin/DraggableBlock";

type EditorProps = {
	editorRef: React.MutableRefObject<LexicalEditor | null>;
	editState: boolean;
	setEditable?: React.Dispatch<React.SetStateAction<boolean>>;
	mentionsData: Array<{
		mentionName: string;
		label: string;
	}>;
	useMentionLookupService?: (
		mentionString: string | null,
		mentionsData: Array<{
			mentionName: string;
			label: string;
		}>,
	) => Array<{
		mentionName: string;
		label: string;
	}>;
	convertFilesToImageUrl: (files: FileList | null) => Array<string> | null;
	onChangeCallback?: (editorRef: LexicalEditor | null, payload: any) => void;
	placeholderText?: string;
	htmlData?: string;
};
function Editor({
	editorRef,
	editState,
	setEditable,
	mentionsData,
	useMentionLookupService,
	convertFilesToImageUrl,
	onChangeCallback,
	placeholderText = "Start Typing...",
	htmlData,
}: EditorProps): JSX.Element {
	const [editor] = useLexicalComposerContext();
	const isEditable = useLexicalEditable();
	const [floatingAnchorElem, setFloatingAnchorElem] =
		useState<HTMLDivElement | null>(null);

	const onRef = (_floatingAnchorElem: HTMLDivElement) => {
		if (_floatingAnchorElem !== null) {
			setFloatingAnchorElem(_floatingAnchorElem);
		}
	};

	useEffect(() => {
		if (setEditable) editor.setEditable(editState);
	}, [editState, editor]);

	const placeholder = <div className="placeholder">{placeholderText}</div>;

	function getTextContent(rootNode: LexicalNode) {
		let textContent = "";
		if ($isTableNode(rootNode)) {
			let tableContent = "";
			rootNode.__rows.map((row) => {
				let rowContent = "";
				row.cells.map((cell: Cell) => {
					rowContent += cell.text + " ";
				});
				tableContent += rowContent;
			});
			textContent += tableContent;
		} else {
			const children = rootNode.getChildren();
			const childrenLength = children.length;
			for (let i = 0; i < childrenLength; i++) {
				const child = children[i];

				if ($isElementNode(child) && !child.isInline()) {
					textContent += getTextContent(child) + " , ";
				} else {
					textContent += child.getTextContent();
				}
			}
		}
		return textContent;
	}

	function getTableTextContent() {
		const rootNodes = $getRoot().getChildren();
		const rootTexts = rootNodes.map(getTextContent);
		return rootTexts;
	}
	const onChange = (_editorState: EditorState, editor: LexicalEditor) => {
		editor.update(() => {
			const payload: any = {};
			const htmlString = $generateHtmlFromNodes(editor, null);
			payload["html"] = htmlString;
			payload["json"] = JSON.stringify(editor.getEditorState());
			payload["mentions"] = $nodesOfType(MentionNode);
			payload["content"] = getTableTextContent();

			onChangeCallback?.(editorRef.current, payload);
		});

		return (editorRef.current = editor);
	};

	useEffect(() => {
		editor.update(() => {
			if (htmlData) {
				const parser = new DOMParser();
				const dom = parser.parseFromString(htmlData, "text/html");

				const nodes = $generateNodesFromDOM(editor, dom);
				if ($getRoot().getFirstChild() !== null) {
					$getRoot().clear();
				}
				$getRoot().append(...nodes);
			}
		});
	}, [htmlData]);

	const URL_REGEX =
		/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|http:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|http:\/\/www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|http:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|http:\/\/www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
	const EMAIL_REGEX =
		/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

	const MATCHERS = [
		createLinkMatcherWithRegExp(URL_REGEX, (text) => {
			return text;
		}),
		createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
			return `mailto:${text}`;
		}),
	];

	const cellEditorConfig = {
		namespace: "Table",
		nodes: [
			HeadingNode,
			ListNode,
			ListItemNode,
			LinkNode,
			AutoLinkNode,
			MentionNode,
			ImageNode,
		],
		onError: (error: Error) => {
			throw error;
		},
		theme: EditorTheme,
	};

	return (
		<>
			{isEditable && (
				<div className="editor-container">
					<ToolbarPlugin
						convertFilesToImageUrl={convertFilesToImageUrl}
						setEditable={setEditable}
					/>
					<ListPlugin />
					<RichTextPlugin
						contentEditable={
							<div className="editor-scroller">
								<div className="editor" ref={onRef}>
									<ContentEditable className="editor-contentEditable" />
								</div>
							</div>
						}
						placeholder={placeholder}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					<AutoLinkPlugin matchers={MATCHERS} />
					<TabIndentationPlugin />
					<ImagesPlugin />
					<MentionPlugin
						mentionsData={mentionsData}
						useMentionLookupService={useMentionLookupService}
					/>
					<NewTablePlugin cellEditorConfig={cellEditorConfig}>
						<RichTextPlugin
							contentEditable={
								<ContentEditable className="TableNode__contentEditable" />
							}
							placeholder={null}
							ErrorBoundary={LexicalErrorBoundary}
						/>
						<HistoryPlugin />
						<AutoFocusPlugin />
						<LexicalClickableLinkPlugin />
					</NewTablePlugin>
					<LexicalClickableLinkPlugin />
					{floatingAnchorElem && (
						<DraggableBlockPlugin anchorElem={floatingAnchorElem} />
					)}
					<OnChangePlugin onChange={onChange} />
				</div>
			)}
		</>
	);
}

export default Editor;
