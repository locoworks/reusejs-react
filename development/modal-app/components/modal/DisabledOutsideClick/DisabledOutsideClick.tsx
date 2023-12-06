/* eslint-disable react/display-name */
import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import CancelIcon from "../icons/CancelIcon";

const DisabledOutsideClick = () => {
	const Modal = (props: any, ref: any) => {
		return (
			<div
				ref={ref}
				className="relative bg-white text-black px-2 py-5 rounded border-2 flex flex-col items-center gap-y-5 w-[400px]"
			>
				<div
					className="text-gray-500 bg-transparent absolute top-2 right-2 p-0 cursor-pointer"
					onClick={() => {
						props.onAction(false);
					}}
				>
					<CancelIcon />
				</div>
				<label>This is a sample Modal!</label>
				<label>{`Saying to you ${props.inputValues.input}`}</label>
				<ReuseButton
					className="rounded bg-blue-400 px-3 py-1 w-fit"
					onClick={() => {
						props.onAction("Closed");
					}}
				>
					Close
				</ReuseButton>
			</div>
		);
	};

	const showModal = async () => {
		const result = await HeadlessModal({
			component: Modal,
			backdropClasses: "bg-gray-500",
			disableOutsideClick: true,
			inputValues: {
				input: "Hello",
			},
			animations: {
				modal: {
					initial: { opacity: 0, x: -400, y: -400 },
					animate: { opacity: 1, x: 0, y: 0 },
					exit: { opacity: 0, x: 400, y: 400 },
				},
			},
		});
		console.log(result);
	};

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseButton className="bg-blue-500 px-2 py-1 mt-3" onClick={showModal}>
				Open modal
			</ReuseButton>
		</div>
	);
};

export default DisabledOutsideClick;
