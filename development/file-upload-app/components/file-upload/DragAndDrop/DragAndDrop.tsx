import React, { useState } from "react";
import { ReuseFileUpload } from "@locoworks/reusejs-react-file-upload";
import { useRef } from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const DragAndDrop = () => {
	const ref = useRef<HTMLInputElement>(null);
	const dragAndDropRef = useRef<HTMLInputElement>(null);
	const [isDraggedOver, setIsDraggedOver] = useState(false);

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10  rounded bg-gray-50">
			<div
				ref={dragAndDropRef}
				className="border border-red-300 rounded-md px-[200px] py-[100px]"
			>
				<ReuseFileUpload
					ref={ref}
					dragAndDropRef={dragAndDropRef}
					allowsMultiple
					fileSize={999999999}
					showChildren
					acceptedFileTypes={["image/png", "image/svg", "application/pdf"]}
					enableDragAndDrop={true}
					setIsDraggedOver={setIsDraggedOver}
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
						{isDraggedOver ? "Drop Your File Here " : ""}
						Browse
					</ReuseButton>
				</ReuseFileUpload>
			</div>
		</div>
	);
};

export default DragAndDrop;
