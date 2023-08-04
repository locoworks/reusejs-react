/* eslint-disable react/display-name */
import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const SuccessExample = () => {
	const Modal = (props, ref) => {
		return (
			<div
				ref={ref}
				className="relative bg-green-300 px-2 py-8 rounded-lg border-2 border-white flex flex-col items-center gap-y-5 w-[400px] font-bold text-lg"
			>
				<label>This is a sample Success Modal</label>
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

export default SuccessExample;
