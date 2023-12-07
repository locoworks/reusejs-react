import React, { ForwardedRef, forwardRef } from "react";

export interface HeadLessFileUploadProps {
	acceptedFileTypes?: Array<string>;
	allowsMultiple?: boolean;
	handleAfterFileUploadHook?: (files: FileList | null) => Promise<void>;
	children?: React.ReactNode;
	className?: string;
}

function HeadLessFileUpload(
	props: HeadLessFileUploadProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	const {
		handleAfterFileUploadHook,
		acceptedFileTypes,
		allowsMultiple,
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
				handleAfterFileUploadHook?.(e);
			}}
			multiple={allowsMultiple}
			{...rest}
		/>
	);
}

export default forwardRef(HeadLessFileUpload);
