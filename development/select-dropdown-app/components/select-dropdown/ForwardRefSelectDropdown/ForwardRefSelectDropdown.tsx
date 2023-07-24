import React, { useEffect, useRef, useState, Ref } from "react";
import { ReuseSelectDropdown } from "@locoworks/reusejs-react-select-dropdown";

const ForwardRefInputGroup = () => {
	const selectRef: any = useRef<Ref<HTMLInputElement> | undefined>(null);
	useEffect(() => {
		if (selectRef.current) {
			const current = selectRef.current;
			const inputElement = current.childNodes[0]
				.childNodes[0] as HTMLInputElement;
			inputElement.style.border = "solid blue 3px";
		}
	}, []);

	const option3 = [
		{
			fname: "John",
			lname: "Doe",
			id: "1001",
			age: "25",
		},
		{
			fname: "Alice",
			lname: "Smith",
			id: "1002",
			age: "30",
		},
		{
			fname: "Michael",
			lname: "Johnson",
			id: "1003",
			age: "40",
		},
		{
			fname: "Emily",
			lname: "Brown",
			id: "1004",
			age: "22",
		},
		{
			fname: "David",
			lname: "Miller",
			id: "1005",
			age: "35",
		},
		{
			fname: "Sophia",
			lname: "Wilson",
			id: "1006",
			age: "28",
		},
		{
			fname: "Jacob",
			lname: "Taylor",
			id: "1007",
			age: "31",
		},
		{
			fname: "Olivia",
			lname: "Anderson",
			id: "1008",
			age: "27",
		},
		{
			fname: "Ethan",
			lname: "Clark",
			id: "1009",
			age: "33",
		},
		{
			fname: "Ava",
			lname: "White",
			id: "1010",
			age: "29",
		},
	];

	const optionsChanged = option3.map((ele) => {
		return { ...ele, label: ele.fname + " " + ele.lname, value: ele.id };
	});

	const [refresher, setRefresher] = useState(new Date());

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<button
				onClick={() => {
					setRefresher(new Date());
				}}
			>
				Switch
			</button>
			<ReuseSelectDropdown
				ref={selectRef}
				options={optionsChanged}
				valueKey={"id"}
				displayKey={"fname"}
				multiple
				enableSearch
				refresh={refresher}
			/>
		</div>
	);
};

export default ForwardRefInputGroup;
