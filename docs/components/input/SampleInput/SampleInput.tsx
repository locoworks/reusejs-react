import React from "react";
import { ReuseInput } from "@locoworks/reusejs-react-input";

const SampleInput = () => {
	return (
		<div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseInput className="focus:border-red-600 focus:ring-red-600 " />
		</div>
	);
};

export default SampleInput;
