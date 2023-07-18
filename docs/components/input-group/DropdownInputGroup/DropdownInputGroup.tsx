import React from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { ReuseSelectDropdown } from "@locoworks/reusejs-react-select-dropdown";

const Prefix = () => {
	const options = [
		{ label: "+91", value: "+91" },
		{ label: "+81", value: "+81" },
		{ label: "+774", value: "+774" },
		{ label: "+54", value: "+54" },
	];
	return (
		<div className="absolute top-1/2 -translate-y-1/2 left-2 font-bold">
			<ReuseSelectDropdown
				dropDownText={"+91"}
				optionsWrapper="bg-gray-900 text-white w-full rounded-md shadow-lg w-[100px] flex justify-center items-center flex-col"
				selectButtonStyles={"border border-transparent"}
				options={options}
				valueKey={"label"}
				displayKey={"value"}
			/>
		</div>
	);
};

const DropdownInputGroup = () => {
	return (
		<div className="flex  items-center gap-x-3 justify-center py-10 px-32 mt-10 border rounded bg-gray-50">
			<ReuseInputGroup
				className="pl-10 px-16"
				placeholder="Enter the number"
				prefix={<Prefix />}
			/>
		</div>
	);
};

export default DropdownInputGroup;
