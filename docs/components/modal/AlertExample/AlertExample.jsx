/* eslint-disable react/display-name */
import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import CancelIcon from "../icons/CancelIcon";
import AlertIcon from "../icons/AlertIcon";

const AlertExample = () => {
	const Modal = (props, ref) => {
		return (
			<div
				ref={ref}
				className="relative bg-red-50 text-red-700 px-2 py-8 rounded-lg border-2 border-red-700 flex flex-col items-center gap-y-5 w-[400px] font-bold text-lg"
			>
				<div
					className="text-gray-500 bg-transparent absolute top-2 right-2 p-0 cursor-pointer"
					onClick={() => {
						props.onAction(false);
					}}
				>
					<CancelIcon />
				</div>
				<AlertIcon />
				<label>This is a sample Alert!!</label>
				<ReuseButton
					className="rounded bg-red-400  text-red-700 px-3 py-1 w-fit hover:bg-red-500 font-bold"
					onClick={() => {
						props.onAction(true);
					}}
				>
					Confirm
				</ReuseButton>
			</div>
		);
	};
	const showModal = async () => {
		const result = await HeadlessModal({
			component: Modal,
			backdropClasses: "bg-black",
		});
		if (result) {
			setTimeout(() => {
				alert("Confirmed");
			}, 500);
		}
	};

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseButton className="bg-blue-500 px-2 py-1 mt-3" onClick={showModal}>
				Open modal
			</ReuseButton>
		</div>
	);
};

export default AlertExample;
