import React from "react";
import {
	$isListNode,
	INSERT_UNORDERED_LIST_COMMAND,
	ListNode,
	REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
	$createHeadingNode,
	$isHeadingNode,
	HeadingTagType,
} from "@lexical/rich-text";
import {
	$findMatchingParent,
	$getNearestNodeOfType,
	mergeRegister,
} from "@lexical/utils";
import {
	$createParagraphNode,
	$getSelection,
	$isRangeSelection,
	$isRootOrShadowRoot,
	CAN_REDO_COMMAND,
	CAN_UNDO_COMMAND,
	COMMAND_PRIORITY_CRITICAL,
	DEPRECATED_$isGridSelection,
	FORMAT_TEXT_COMMAND,
	LexicalEditor,
	REDO_COMMAND,
	SELECTION_CHANGE_COMMAND,
	UNDO_COMMAND,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { useCallback, useEffect, useState } from "react";

import useModal from "../utils/useModal";
import { getSelectedNode } from "../utils/getSelectedNode";
import { $isTableNode } from "../plugins/TablePlugin/TableNode";
import { InsertNewTableDialog } from "../plugins/TablePlugin/TablePlugin";
import { InsertImageDialog } from "../plugins/ImagePlugin/ImagePlugin";
import {
	BoldIcon,
	BulletListIcon,
	HeadingIcon,
	ImageIcon,
	ItalicIcon,
	ParagraphIcon,
	RedoIcon,
	TableIcon,
	UnderlineIcon,
	UndoIcon,
} from "../icons";

const blockTypeToBlockName = {
	bullet: "Bulleted List",
	h1: "Heading 1",
	paragraph: "Normal",
};

const rootTypeToRootName = {
	root: "Root",
	table: "Table",
};
function buttonActiveClass(active: boolean) {
	if (active) return "active dropdown-item-active";
	else return "";
}
const toolbarTextClass = (isActive: boolean) => {
	return isActive ? "text-gray-700" : "text-gray-500";
};

function BlockTextFormat({
	editor,
	blockType,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	rootType,
	disabled = false,
}: {
	blockType: keyof typeof blockTypeToBlockName;
	rootType: keyof typeof rootTypeToRootName;
	editor: LexicalEditor;
	disabled?: boolean;
}): JSX.Element {
	const formatParagraph = () => {
		editor.update(() => {
			const selection = $getSelection();
			if (
				$isRangeSelection(selection) ||
				DEPRECATED_$isGridSelection(selection)
			) {
				$setBlocksType(selection, () => $createParagraphNode());
			}
		});
	};

	const formatHeading = (headingSize: HeadingTagType) => {
		if (blockType !== headingSize) {
			editor.update(() => {
				const selection = $getSelection();
				if (
					$isRangeSelection(selection) ||
					DEPRECATED_$isGridSelection(selection)
				) {
					$setBlocksType(selection, () => $createHeadingNode(headingSize));
				}
			});
		}
	};

	const formatBulletList = () => {
		if (blockType !== "bullet") {
			editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
		} else {
			editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
		}
	};

	return (
		<>
			<button
				disabled={disabled}
				className={
					"toolbar-item " + buttonActiveClass(blockType === "paragraph")
				}
				onClick={formatParagraph}
			>
				<i className="icon">
					<ParagraphIcon />
				</i>
				<span className={"text " + toolbarTextClass(blockType === "paragraph")}>
					Normal
				</span>
			</button>
			<button
				disabled={disabled}
				className={"toolbar-item " + buttonActiveClass(blockType === "h1")}
				onClick={() => formatHeading("h1")}
			>
				<i className="icon ">
					<HeadingIcon />
				</i>
				<span className="text">Heading 1</span>
			</button>
			<button
				disabled={disabled}
				className={"toolbar-item " + buttonActiveClass(blockType === "bullet")}
				onClick={formatBulletList}
			>
				<i className="icon ">
					<BulletListIcon />
				</i>
				<span className="text">Bullet List</span>
			</button>
		</>
	);
}

function Divider(): JSX.Element {
	return <div className="w-[1px] bg-gray-300 mx-1" />;
}
export default function ToolbarPlugin({
	convertFileToImageUrl,
}: {
	convertFileToImageUrl: (files: FileList | null) => string | null;
}): JSX.Element {
	const [editor] = useLexicalComposerContext();
	const [activeEditor, setActiveEditor] = useState(editor);
	const [blockType, setBlockType] =
		useState<keyof typeof blockTypeToBlockName>("paragraph");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [rootType, setRootType] =
		useState<keyof typeof rootTypeToRootName>("root");

	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);
	const [canUndo, setCanUndo] = useState(false);
	const [canRedo, setCanRedo] = useState(false);
	const [modal, showModal] = useModal();
	const [isEditable, setIsEditable] = useState(() => editor.isEditable());

	const $updateToolbar = useCallback(() => {
		const selection = $getSelection();
		if ($isRangeSelection(selection)) {
			const anchorNode = selection.anchor.getNode();
			let element =
				anchorNode.getKey() === "root"
					? anchorNode
					: $findMatchingParent(anchorNode, (e) => {
							const parent = e.getParent();
							return parent !== null && $isRootOrShadowRoot(parent);
					  });

			if (element === null) {
				element = anchorNode.getTopLevelElementOrThrow();
			}

			const elementKey = element.getKey();
			const elementDOM = activeEditor.getElementByKey(elementKey);

			setIsBold(selection.hasFormat("bold"));
			setIsItalic(selection.hasFormat("italic"));
			setIsUnderline(selection.hasFormat("underline"));

			const node = getSelectedNode(selection);
			const tableNode = $findMatchingParent(node, $isTableNode);
			if ($isTableNode(tableNode)) {
				setRootType("table");
			} else {
				setRootType("root");
			}

			if (elementDOM !== null) {
				if ($isListNode(element)) {
					const parentList = $getNearestNodeOfType<ListNode>(
						anchorNode,
						ListNode,
					);
					const type: any = parentList
						? parentList.getListType()
						: element.getListType();
					setBlockType(type);
				} else {
					const type = $isHeadingNode(element)
						? element.getTag()
						: element.getType();
					if (type in blockTypeToBlockName) {
						setBlockType(type as keyof typeof blockTypeToBlockName);
					}
				}
			}
		}
	}, [activeEditor]);

	useEffect(() => {
		return editor.registerCommand(
			SELECTION_CHANGE_COMMAND,
			(_payload, newEditor) => {
				$updateToolbar();
				setActiveEditor(newEditor);
				return false;
			},
			COMMAND_PRIORITY_CRITICAL,
		);
	}, [editor, $updateToolbar]);

	useEffect(() => {
		return mergeRegister(
			editor.registerEditableListener((editable) => {
				setIsEditable(editable);
			}),
			activeEditor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					$updateToolbar();
				});
			}),
			activeEditor.registerCommand<boolean>(
				CAN_UNDO_COMMAND,
				(payload) => {
					setCanUndo(payload);
					return false;
				},
				COMMAND_PRIORITY_CRITICAL,
			),
			activeEditor.registerCommand<boolean>(
				CAN_REDO_COMMAND,
				(payload) => {
					setCanRedo(payload);
					return false;
				},
				COMMAND_PRIORITY_CRITICAL,
			),
		);
	}, [$updateToolbar, activeEditor, editor]);

	return (
		<div className="toolbar">
			<button
				disabled={!canUndo || !isEditable}
				onClick={() => {
					activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
				}}
				className="toolbar-item spaced"
				aria-label="Undo"
			>
				<i className="format ">
					<UndoIcon />
				</i>
			</button>
			<button
				disabled={!canRedo || !isEditable}
				onClick={() => {
					activeEditor.dispatchCommand(REDO_COMMAND, undefined);
				}}
				className="toolbar-item spaced"
				aria-label="Redo"
			>
				<i className="format ">
					<RedoIcon />
				</i>
			</button>
			<Divider />
			{blockType in blockTypeToBlockName && activeEditor === editor && (
				<>
					<BlockTextFormat
						disabled={!isEditable}
						blockType={blockType}
						rootType={rootType}
						editor={editor}
					/>
					<Divider />
				</>
			)}
			<button
				disabled={!isEditable}
				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
				}}
				className={"toolbar-item spaced " + (isBold ? "active" : "")}
				aria-label={`Format text as bold`}
			>
				<i className="format ">
					<BoldIcon />
				</i>
			</button>
			<button
				disabled={!isEditable}
				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
				}}
				className={"toolbar-item spaced " + (isItalic ? "active" : "")}
				aria-label={`Format text as Italic`}
			>
				<i className="format ">
					<ItalicIcon />
				</i>
			</button>
			<button
				disabled={!isEditable}
				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
				}}
				className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
				aria-label={`Format text with underline`}
			>
				<i className="format ">
					<UnderlineIcon />
				</i>
			</button>
			<Divider />
			<button
				disabled={!isEditable}
				className="toolbar-item"
				onClick={() => {
					showModal("Insert Table", (onClose) => (
						<InsertNewTableDialog
							activeEditor={activeEditor}
							onClose={onClose}
						/>
					));
				}}
			>
				<i className="icon ">
					<TableIcon />
				</i>
				<span className="text">Table (Experimental)</span>
			</button>
			<Divider />
			<button
				disabled={!isEditable}
				className="toolbar-item "
				onClick={() => {
					showModal("Insert Image", (onClose) => (
						<InsertImageDialog
							activeEditor={activeEditor}
							onClose={onClose}
							convertFileToImageUrl={convertFileToImageUrl}
						/>
					));
				}}
			>
				<i className="icon ">
					<ImageIcon />
				</i>
				<span className="text">Image</span>
			</button>
			{modal}
		</div>
	);
}
