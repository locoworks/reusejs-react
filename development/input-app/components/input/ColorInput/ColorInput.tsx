import React from "react";
import { ReuseInput } from "@locoworks/reusejs-react-input";

const AcceptedInput = () => {
	return (
		<div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseInput
				type="text"
				className="border-blue-300 focus:ring-blue-300  focus:border-blue-300 ring ring-blue-300 text-blue-600"
				placeholder="Enter Email"
			/>
			<ReuseInput
				type="text"
				className="border-green-300 focus:ring-green-300  focus:border-green-300 ring ring-green-300 text-green-600"
				placeholder="Enter Email"
			/>
			<ReuseInput
				type="text"
				className="border-yellow-300 focus:ring-yellow-300  focus:border-yellow-300 ring ring-yellow-300 text-yellow-600"
				placeholder="Enter Email"
			/>
		</div>
	);
};

export default AcceptedInput;
