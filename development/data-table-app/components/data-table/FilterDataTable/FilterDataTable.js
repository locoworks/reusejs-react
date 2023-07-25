import React, { useState, useEffect } from "react";
import { HeadlessDataTableWithFilter } from "@locoworks/reusejs-react-data-table";

const FilterDataTable = () => {
	const [userList, setUserLists] = useState([]);
	const [searchString, setSearchString] = useStat("");
	const [searchQueries, setSearchQueries] = useState([])
	const [dropDownValue, setDropDownValue] = useState<string>("default");

	const fetchData = async (count) => {
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

	const userData = [];
	userList.forEach((user) => {
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
		totalPages,
		totalRecords,
		currentPage,
		itemsPerPage,
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
			<div className="flex mx-10 items-center justify-between">
				<select
					className="flex py-2 px-4 rounded-md border border-gray-400 mb-10"
					value={dropDownValue}
					onChange={(e) => {
						setDropDownValue(e.target.value.toString());
					}}
				>
					<option value="default">Select Filter</option>
					{tableHeader.map((colunm, index) => {
						return (
							<option key={index} value={colunm}>
								{colunm}
							</option>
						);
					})}
				</select>
				<div className="flex justify-center items-center mb-10">
					<input
						onChange={(e) => {
							setSearchString(e.target.value);
							if (dropDownValue !== "default") {
								setSearchQueries([
									{ field: dropDownValue, value: e.target.value },
								]);
							}
						}}
						value={searchString}
						placeholder="Search Here..."
						className="flex py-2 px-4 border border-gray-400 rounded-md mx-10"
					/>

					<button
						className="border border-gray-400"
						onClick={() => {
							setSearchString("");
							setSearchQueries([]);
							setDropDownValue("default");
						}}
					>
						clear
					</button>
				</div>
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
				queryObject={searchQueries}
				searchAll=""
			/>
		</div>
	);
};

export default FilterDataTable;
