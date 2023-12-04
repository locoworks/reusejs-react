import React, { useEffect, useRef, useState } from "react";
import {
	$createParagraphNode,
	$insertNodes,
	$isRootOrShadowRoot,
	COMMAND_PRIORITY_EDITOR,
	createCommand,
	LexicalCommand,
	LexicalEditor,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils";

import { $createImageNode, ImageNode, ImagePayload } from "./ImageNode";

export type InsertImagePayload = Readonly<ImagePayload>;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
	createCommand("INSERT_IMAGE_COMMAND");

export function InsertImageUriDialogBody({
	onClick,
}: {
	onClick: (payload: InsertImagePayload) => void;
}) {
	const [src, setSrc] = useState("");
	const [altText, setAltText] = useState("");

	const isDisabled = src === "";

	return (
		<>
			<div className="Input__wrapper">
				<label className="Input__label">Image URL</label>
				<input
					type="text"
					className="Input__input"
					placeholder="i.e. https://source.unsplash.com/random"
					value={src}
					onChange={(e) => {
						setSrc(e.target.value);
					}}
					data-test-id="image-modal-url-input"
				/>
			</div>

			<div className="Input__wrapper">
				<label className="Input__label">Alt Text</label>
				<input
					type="text"
					className="Input__input"
					placeholder="Random unsplash image"
					value={altText}
					onChange={(e) => {
						setAltText(e.target.value);
					}}
					data-test-id="image-modal-alt-text-input"
				/>
			</div>

			<div className="flex justify-end mt-5">
				<button
					disabled={isDisabled}
					className={
						"bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
					}
					onClick={() => {
						onClick({ altText, src });
					}}
					aria-label="Confirm"
				>
					Confirm
				</button>
			</div>
		</>
	);
}

export function InsertImageUploadedDialogBody({
	onClick,
	convertFileToImageUrl,
}: {
	onClick: (payload: InsertImagePayload) => void;
	convertFileToImageUrl: (files: FileList | null) => string | null;
}) {
	const [src, setSrc] = useState("");
	const [altText, setAltText] = useState("");

	const isDisabled = src === "";

	const loadImage = (files: FileList | null) => {
		if (files && files.length > 0) {
			const imageUrl = convertFileToImageUrl(files);
			if (imageUrl) setSrc(imageUrl);
			else {
				throw new Error("Could not find image url");
			}
		}
	};

	return (
		<>
			<div className="flex items-center mb-2.5">
				<label className="flex-1 text-gray-600">Image Upload</label>
				<input
					type="file"
					multiple={false}
					accept="image/*"
					className="flex-1 min-w-0 px-5 py-2 text-base border rounded-md"
					onChange={(e) => loadImage(e.target.files)}
					data-test-id="image-modal-file-upload"
				/>
			</div>
			<div className="Input__wrapper">
				<label className="Input__label">Alt Text</label>
				<input
					type="text"
					className="Input__input"
					placeholder=""
					onChange={(e) => {
						setAltText(e.target.value);
					}}
					value={altText}
					data-test-id="image-modal-alt-text-input"
				/>
			</div>

			<div className="flex justify-end mt-5">
				<button
					data-test-id="image-modal-file-upload-btn"
					disabled={isDisabled}
					onClick={() => onClick({ altText, src })}
				>
					Confirm
				</button>
			</div>
		</>
	);
}

export function InsertImageDialog({
	activeEditor,
	onClose,
	convertFileToImageUrl,
}: {
	activeEditor: LexicalEditor;
	onClose: () => void;
	convertFileToImageUrl: (files: FileList | null) => string | null;
}): JSX.Element {
	const [mode, setMode] = useState<null | "url" | "file">(null);
	const hasModifier = useRef(false);

	useEffect(() => {
		hasModifier.current = false;
		const handler = (e: KeyboardEvent) => {
			hasModifier.current = e.altKey;
		};
		document.addEventListener("keydown", handler);
		return () => {
			document.removeEventListener("keydown", handler);
		};
	}, [activeEditor]);

	const onClick = (payload: InsertImagePayload) => {
		activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
		onClose();
	};

	return (
		<>
			{!mode && (
				<div className="flex flex-col justify-end">
					<button
						data-test-id="image-modal-option-sample"
						onClick={() =>
							onClick({
								altText: "Pink flowers",
								src: "https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
							})
						}
					>
						Sample
					</button>
					<button
						data-test-id="image-modal-option-url"
						onClick={() => setMode("url")}
					>
						URL
					</button>
					<button
						data-test-id="image-modal-option-file"
						onClick={() => setMode("file")}
					>
						File
					</button>
				</div>
			)}
			{mode === "url" && <InsertImageUriDialogBody onClick={onClick} />}
			{mode === "file" && (
				<InsertImageUploadedDialogBody
					onClick={onClick}
					convertFileToImageUrl={convertFileToImageUrl}
				/>
			)}
		</>
	);
}

export default function ImagesPlugin({
	captionsEnabled,
}: {
	captionsEnabled?: boolean;
}): JSX.Element | null {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		if (!editor.hasNodes([ImageNode])) {
			throw new Error("ImagesPlugin: ImageNode not registered on editor");
		}

		return mergeRegister(
			editor.registerCommand<InsertImagePayload>(
				INSERT_IMAGE_COMMAND,
				(payload) => {
					const imageNode = $createImageNode(payload);
					$insertNodes([imageNode]);
					if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
						$wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
					}
					return true;
				},
				COMMAND_PRIORITY_EDITOR,
			),
		);
	}, [captionsEnabled, editor]);

	return null;
}
