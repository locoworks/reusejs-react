import React, { ForwardedRef, forwardRef } from "react";

export interface HeadlessFileUploadProps {
	acceptedFileTypes?: Array<string>;
	allowsMultiple?: boolean;
	handleAfterFileUploadHook?: (files: FileList | null) => Promise<void>;
	children?: React.ReactNode;
	className?: string;
}

function HeadlessFileUpload(
	props: HeadlessFileUploadProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	const {
		handleAfterFileUploadHook,
		acceptedFileTypes,
		allowsMultiple = false,
		className = "",
		...rest
	} = props;

	const acceptAttribute = acceptedFileTypes?.length
		? acceptedFileTypes.join(",")
		: undefined;

	return (
		<input
			type="file"
			ref={ref}
			className={className}
			accept={acceptAttribute}
			onChange={async (e: any) => {
				console.log("on change is running");
				await handleAfterFileUploadHook?.(e);
			}}
			multiple={allowsMultiple}
			{...rest}
		/>
	);
}

export default forwardRef(HeadlessFileUpload);
