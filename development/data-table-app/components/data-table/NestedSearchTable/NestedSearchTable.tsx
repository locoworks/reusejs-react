import React, { useState, useEffect } from "react";
import { HeadlessDataTableWithFilter } from "@locoworks/reusejs-react-data-table";
import { ReuseInput } from "@locoworks/reusejs-react-input";
import { HeadlessButton } from "@locoworks/reusejs-react-button";

const FilterDataTable = () => {
	const [userList, setUserLists] = useState([]);
	const [searchQueries, setSearchQueries] = useState<
		{
			field: string;
			value: string;
		}[]
	>([]);
	const [nameField, setNameField] = useState("");
	const [emailField, setEmailField] = useState("");
	const [addressField, setAddressField] = useState("");

	const fetchData = async (count: number) => {
		try {
			const response = await fetch(
				`https://randomuser.me/api/?results=${count}`,
			); // Replace with the API endpoint URL
			const data = await response.json();
			setUserLists(data.results); // Set the fetched data in the state
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const userData: {
		Name: string;
		Gender: string;
		Age: string;
		Email: string;
		"Contact Details": string;
		Address: string;
	}[] = [];
	userList.forEach((user: any) => {
		const userObject = {
			Name: `${user.name.title} ${user.name.first} ${user.name.last}`,
			Gender: user.gender,
			Age: `${user.dob.age}`,
			Email: user.email,
			"Contact Details": user.cell,
			Address: `${user.location.country} ${user.location.postcode}`,
		};

		userData.push(userObject);
	});

	const tableHeader = [
		"Name",
		"Gender",
		"Age",
		"Email",
		"Contact Details",
		"Address",
	];

	const ShowRecordInfo = (
		totalPages: number,
		totalRecords: number,
		currentPage: number,
		itemsPerPage: number,
	) => {
		return (
			<div className="flex items-center mt-10">
				Showing: {currentPage * itemsPerPage - (itemsPerPage - 1)} to{" "}
				{currentPage * itemsPerPage} of {totalRecords} results
			</div>
		);
	};

	const prepareSearchPayload = (
		name: string,
		email: string,
		address: string,
	) => {
		let namePayload;
		let emailPayload;
		let addressPayload;

		const queryObject: { field: string; value: string }[] = [];

		if (name !== "") {
			namePayload = { field: "Name", value: name };
			setSearchQueries([...searchQueries, namePayload]);
			queryObject.push(namePayload);
		}
		if (email !== "") {
			emailPayload = { field: "Email", value: email };
			queryObject.push(emailPayload);
		}
		if (address !== "") {
			addressPayload = { field: "Address", value: address };
			queryObject.push(addressPayload);
		}

		setSearchQueries(queryObject);
	};

	useEffect(() => {
		fetchData(50);
	}, []);

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<div className="flex justify-center items-center mb-10">
				<ReuseInput
					placeholder="Search Name..."
					className="flex mx-4"
					onChange={(e) => {
						setNameField(e.target.value);
					}}
					value={nameField}
				/>
				<ReuseInput
					placeholder="Search Email..."
					className="flex mx-4"
					onChange={(e) => {
						setEmailField(e.target.value);
					}}
					value={emailField}
				/>
				<ReuseInput
					placeholder="Search Address"
					className="flex mx-4"
					onChange={(e) => {
						setAddressField(e.target.value);
					}}
					value={addressField}
				/>
				<HeadlessButton
					className="bg-blue-200 border border-blue-400 rounded px-3 py-1 mx-2"
					onClick={() => {
						prepareSearchPayload(nameField, emailField, addressField);
					}}
				>
					Search
				</HeadlessButton>
				<HeadlessButton
					className="bg-blue-200 border border-blue-400 rounded px-3 py-1"
					onClick={() => {
						setNameField("");
						setEmailField("");
						setAddressField("");
						setSearchQueries([]);
					}}
				>
					Clear Search
				</HeadlessButton>
			</div>
			<HeadlessDataTableWithFilter
				tableData={userData}
				itemsPerPage={5}
				customTableHeader={tableHeader}
				buttonClasses={
					"bg-gray-200 py-2 px-4 rounded-md text-gray-700 mb-10 mx-4"
				}
				buttonContainerClasses={"flex justify-end relative -top-9"}
				showDetails={ShowRecordInfo}
				tableColumnClasses={"px-4 border border-gray-500"}
				tableContainerClasses={"flex flex-col px-10 w-full bg-white"}
				tableClasses={"w-full"}
				headingColumnClasses={"px-4 text-left border border-gray-500"}
				headingRowClasses={"bg-gray-300 "}
				queryObject={searchQueries}
				searchAll=""
			/>
		</div>
	);
};

export default FilterDataTable;
