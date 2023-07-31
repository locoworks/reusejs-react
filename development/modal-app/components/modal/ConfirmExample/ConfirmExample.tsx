/* eslint-disable react/display-name */
import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import CancelIcon from "../icons/CancelIcon";

const ConfirmExample = () => {
	const Modal = (props: any, ref: any) => {
		return (
			<div
				ref={ref}
				className="relative bg-white text-black px-2 py-8 rounded border-2 flex flex-col items-center gap-y-5 w-[400px]"
			>
				<div
					className="text-gray-500 bg-transparent absolute top-2 right-2 p-0 cursor-pointer"
					onClick={() => {
						props.onAction(false);
					}}
				>
					<CancelIcon />
				</div>
				<label>Are you sure you want to perform this action!!</label>
				<div className="w-1/2 flex justify-between">
					<ReuseButton
						className="rounded bg-red-400 px-3 py-1 w-fit"
						onClick={() => {
							props.onAction(false);
						}}
					>
						Cancel
					</ReuseButton>
					<ReuseButton
						className="rounded bg-green-400 px-3 py-1 w-fit"
						onClick={() => {
							props.onAction(true);
						}}
					>
						Confirm
					</ReuseButton>
				</div>
			</div>
		);
	};
	const showModal = async () => {
		const result = await HeadlessModal({
			component: Modal,
			backdropClasses: "bg-red-500",
		});
		if (result) {
			setTimeout(() => {
				alert("Confirmed");
			}, 500);
		}
		// console.log(result);
	};

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseButton className="bg-blue-500 px-2 py-1 mt-3" onClick={showModal}>
				Open modal
			</ReuseButton>
		</div>
	);
};

export default ConfirmExample;
