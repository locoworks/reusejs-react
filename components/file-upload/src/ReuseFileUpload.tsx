import React, { ForwardedRef, forwardRef, useState } from "react";
import { HeadlessFileUploadProps } from "./HeadlessFileUpload";
import HeadlessFileUpload from "./HeadlessFileUpload";
import { twMerge } from "tailwind-merge";
export interface ReuseFileUploadProps extends HeadlessFileUploadProps {
	baseClassName?: string;
	wrapperClassName?: string;
	showChildren?: boolean;
	handleBeforeFileUploadHook?: () => Promise<void>;
	handleAfterFileUploadHook?: (files: FileList | null) => Promise<void>;
	children?: React.ReactNode | React.ReactNode[];
	loaderStyles?: string;
	customLoader?: React.ReactNode | React.ReactNode[];
	fileSize?: number;
	setCustomError?: (e: any) => void;
}

function ReuseFileUpload(
	props: ReuseFileUploadProps,
	ref: ForwardedRef<HTMLInputElement>,
) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const {
		baseClassName = "",
		wrapperClassName = "",
		showChildren = false,
		children = <></>,
		handleBeforeFileUploadHook,
		handleAfterFileUploadHook,
		loaderStyles = "",
		customLoader = null,
		fileSize = 5242880, //5mb
		setCustomError = () => {},
		...rest
	} = props;

	const readFile = (file: File) => {
		return new Promise<string | ArrayBuffer | null>((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.readAsDataURL(file);
		});
	};
	const loadFile = async (files: FileList) => {
		try {
			for (let i = 0; i < files.length; i++) {
				await readFile(files[i]);
			}
		} catch (error) {
			console.log(error);
			setCustomError(error);
		} finally {
			setIsLoading(false);
		}
	};
	const LoaderFunction = async (e: any) => {
		if (typeof ref === "object" && ref !== null && ref.current !== null) {
			const files = e.target.files;
			if (files && files.length > 0) {
				try {
					setIsLoading(true);
					const isValid = await validateInput(e, files);
					if (!isValid) {
						e.target.value = "";
					}
					if (isValid) {
						await loadFile(files);
					}
					setIsLoading(false);
				} catch (error) {
					console.log({ error });
				} finally {
					setIsLoading(false);
				}
			}
		}
	};

	const validateInput = async (e: any, files: FileList) => {
		const input = e.target;
		const allowedTypes = input.accept.split(",");

		if (props.acceptedFileTypes && props?.acceptedFileTypes?.length > 0) {
			try {
				for (let i = 0; i < files.length; i++) {
					const file = files[i];
					if (allowedTypes.indexOf(file.type) === -1) {
						throw new Error("File Type Not Allowed");
					}
				}
			} catch (error) {
				console.log(error);

				setCustomError("File Type Not Allowed");
				return false;
			}
		}

		try {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				if (file.size > fileSize) {
					throw new Error(`File Size Exceeded by file ${i + 1} `);
				}
			}
		} catch (error) {
			setCustomError(`file Size Exceeded by file`);
			console.log({ error });
			return false;
		}
		return true;
	};

	const prepareOnChange = async (e: any) => {
		await LoaderFunction(e);
		if (handleAfterFileUploadHook) {
			handleAfterFileUploadHook(e.target.files);
		}
	};
	const prepareOnClick = async () => {
		if (handleBeforeFileUploadHook) {
			await handleBeforeFileUploadHook();
		}

		if (typeof ref === "object" && ref !== null && ref.current !== null) {
			ref.current.click();
			if (handleAfterFileUploadHook) {
				ref.current.onchange = () => {
					async (files: FileList | null) => {
						handleAfterFileUploadHook(files);
					};
				};
			}
		}
	};
	const childrenWithProps = React.Children.map(children, (child: any) =>
		React.cloneElement(child, {
			onClick: async (e: any) => {
				if (child.props.onClick) {
					await child.props.onClick(e);
				}
				prepareOnClick();
			},
		}),
	);

	return (
		<div className={wrapperClassName}>
			{isLoading ? (
				customLoader ? (
					customLoader
				) : (
					<div
						className={twMerge(
							"flex h-20 w-20 justify-center items-center rounded-full border-4 border-white border-t-gray-600 opacity-100 animate-spin text-[40px] text-blue-900",
							loaderStyles,
						)}
					></div>
				)
			) : (
				<>
					{showChildren ? childrenWithProps : <></>}
					<HeadlessFileUpload
						ref={ref}
						className={twMerge("hidden " + baseClassName)}
						handleAfterFileUploadHook={prepareOnChange}
						{...rest}
					/>
				</>
			)}
		</div>
	);
}

export default forwardRef(ReuseFileUpload);
