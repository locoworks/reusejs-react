import React, { useState, useEffect } from "react";
import { HeadlessDataTableWithFilter } from "@locoworks/reusejs-react-data-table";

const FilterDataTable = () => {
	const [userList, setUserLists] = useState([]);
	const [searchString, setSearchString] = useState<string>("");

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
			<>
				<div className="flex items-center">
					Showing:{" "}
					{currentPage < totalPages
						? `${currentPage * itemsPerPage}/${totalRecords}`
						: `${totalRecords}/${totalRecords}`}
					Records.
				</div>

				<div className="flex items-center">
					Page : {currentPage}/{totalPages}
				</div>
			</>
		);
	};

	useEffect(() => {
		fetchData(50);
	}, []);

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<div className="flex justify-center items-center mb-10">
				<input
					onChange={(e) => {
						setSearchString(e.target.value);
					}}
					value={searchString}
					placeholder="Search Here..."
					className="flex py-2 px-4 border border-gray-400 rounded-md mx-10 bg-white"
				/>

				<button
					className="border border-gray-400 rounded-md py-2 px-4 bg-white"
					onClick={() => {
						setSearchString("");
					}}
				>
					clear
				</button>
			</div>
			<HeadlessDataTableWithFilter
				tableData={userData}
				itemsPerPage={5}
				customTableHeader={tableHeader}
				buttonClasses={"bg-gray-200 py-2 px-4 rounded-md text-gray-700 mb-10"}
				buttonContainerClasses={"flex justify-between mt-4"}
				showDetails={ShowRecordInfo}
				tableColumnClasses={"px-4 border border-gray-500"}
				tableContainerClasses={"flex flex-col px-10 w-full bg-white"}
				tableClasses={"w-full"}
				headingColumnClasses={"px-4 text-left border border-gray-500"}
				headingRowClasses={"bg-gray-300 "}
				queryObject={[]}
				searchAll={searchString}
			/>
		</div>
	);
};

export default FilterDataTable;
