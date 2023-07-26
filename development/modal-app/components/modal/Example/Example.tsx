/* eslint-disable react/display-name */
import React from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const Example = () => {
	const Modal = (props: any, ref: any) => {
		console.log("Props>>>>>", props);
		console.log("Ref>>>>>", ref);
		return (
			<div
				ref={ref}
				className="relative bg-white text-black px-2 py-5 rounded border-2 flex flex-col items-center gap-y-5 w-[400px]"
			>
				<ReuseButton
					className="text-gray-500 bg-transparent absolute top-0 right-1 p-0"
					onClick={() => {
						props.onAction(false);
					}}
				>
					X
				</ReuseButton>
				<input
					value={props.inputValues.input}
					className="w-full px-3 py-2 rounded border"
				/>
				<label>This is a sample Modal!</label>
				<ReuseButton
					className="rounded bg-blue-400 px-3 py-1 w-fit"
					onClick={() => {
						console.log("Props>>>>", props.onAction);
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
			backdropClasses: "bg-green-500",
			inputValues: {
				input: "Hello",
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

export default Example;
