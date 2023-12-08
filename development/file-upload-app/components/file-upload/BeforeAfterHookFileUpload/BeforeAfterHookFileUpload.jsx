import React from "react";
import { ReuseFileUpload } from "@locoworks/reusejs-react-file-upload";
import { useRef } from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const BeforeAfterHookFileUpload = () => {
	const ref = useRef < HTMLInputElement > null;

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseFileUpload
				ref={ref}
				fileSize={39804}
				handleBeforeFileUploadHook={async () => {
					await new Promise((resolve) => {
						setTimeout(() => {
							console.log("before function");
							resolve();
						}, 1);
					});
				}}
				handleAfterFileUploadHook={async (e) => {
					console.log(e, "this is the file type");
				}}
				baseClassName="hidden"
				showChildren
				onSelect={(e) => {
					console.log(e);
				}}
			>
				<ReuseButton
					className="border border-black px-2 py-1 cursor-pointer rounded-xl text-black"
					onClick={() => {
						console.log("hi this is the onclick of the component");
					}}
				>
					Browse
				</ReuseButton>
			</ReuseFileUpload>
		</div>
	);
};

export default BeforeAfterHookFileUpload;
