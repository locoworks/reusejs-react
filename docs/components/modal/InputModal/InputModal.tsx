/* eslint-disable react/display-name */
import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import CancelIcon from "../icons/CancelIcon";

const InputModal = () => {
	const Modal = (props: any, ref: any) => {
		let nameValue = "";
		let emailValue = "";
		return (
			<div
				ref={ref}
				className="relative bg-white px-2 py-8 rounded-lg border-2 border-blue-500 flex flex-col items-center gap-y-5 w-[400px] font-bold text-lg"
			>
				<div
					className="text-gray-500 bg-transparent absolute top-2 right-2 p-0 cursor-pointer"
					onClick={() => {
						props.onAction(false);
					}}
				>
					<CancelIcon />
				</div>
				<label>Please Enter the following Fields</label>
				<input
					className="px-2 py-1 font-normal text-base border-black rounded border"
					placeholder="Enter Name"
					name="name"
					onChange={(e) => {
						nameValue = e.target.value;
					}}
				/>
				<input
					className="px-2 py-1 font-normal text-base border-black rounded border"
					placeholder="Enter E-Mail"
					name="email"
					onChange={(e) => {
						emailValue = e.target.value;
					}}
				/>
				<ReuseButton
					className="px-3 py-1 rounded "
					onClick={() => {
						if (nameValue === "" || emailValue === "") {
							props.onAction(false);
						} else {
							props.onAction({ name: nameValue, email: emailValue });
						}
					}}
				>
					Submit
				</ReuseButton>
			</div>
		);
	};

	const showModal = async () => {
		const result = await HeadlessModal({
			component: Modal,
			backdropClasses: "bg-black",
		});
		console.log("result", result);
	};

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseButton className="bg-blue-500 px-2 py-1 mt-3" onClick={showModal}>
				Open modal
			</ReuseButton>
		</div>
	);
};

export default InputModal;
