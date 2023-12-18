import React from "react";
import { ReuseFileUpload } from "@locoworks/reusejs-react-file-upload";
import { useRef } from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const DragAndDrop = () => {
	const ref = useRef<HTMLInputElement>(null);
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseFileUpload
				ref={ref}
				allowsMultiple
				fileSize={999999999}
				showChildren
				acceptedFileTypes={["image/png", "image/svg", "application/pdf"]}
				enableDragAndDrop={true}
				handleAfterFileUploadHook={async (e) => {
					console.log(e);
				}}
			>
				<ReuseButton
					className="border border-black px-2 py-1 cursor-pointer rounded-xl text-black"
					onClick={() => {
						ref.current?.click();
					}}
				>
					Browse
				</ReuseButton>
			</ReuseFileUpload>
		</div>
	);
};

export default DragAndDrop;
