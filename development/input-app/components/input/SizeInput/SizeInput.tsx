import React from "react";
import { ReuseInput } from "@locoworks/reusejs-react-input";

const SizeInput = () => {
	return (
		<div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseInput
				type="text"
				className="text-xl  px-4 py-3"
				placeholder="Big Email Input"
			/>
			<ReuseInput
				type="text"
				className="text-base px-3 py-2"
				placeholder="Medium Email Input"
			/>
			<ReuseInput
				type="text"
				className="text-sm px-3 py-1"
				placeholder="Small Email Input"
			/>
		</div>
	);
};

export default SizeInput;
