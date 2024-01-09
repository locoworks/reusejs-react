import React from "react";
import { ReuseSelectDropdown } from "@locoworks/reusejs-react-select-dropdown";

const ReuseSample = () => {
	const options = [
		{ label: "One", value: "1" },
		{ label: "Two", value: "2" },
		{ label: "Three", value: "3" },
		{ label: "Four", value: "4" },
	];
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseSelectDropdown
				options={options}
				valueKey={"value"}
				selectWrapper={"bg-red-500 text-blue-500"}
				dropDownText="Select Filter"
			/>
		</div>
	);
};

export default ReuseSample;
