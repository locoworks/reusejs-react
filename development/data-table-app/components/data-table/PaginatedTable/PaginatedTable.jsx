import React, { useState, useEffect } from "react";
import { HeadlessDataTable } from "@locoworks/reusejs-react-data-table";

const Example = () => {
	const [userList, setUserLists] = useState([]);

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

	let userData = [];
	userList.forEach((user) => {
		const userObject = {
			Name: `${user.name.title} ${user.name.first} ${user.name.last}`,
			Gender: user.gender,
			Age: user.dob.age,
			Email: user.email,
			"Contact Details": user.cell,
			Address: `${user.location.city} ${user.location.state} ${user.location.country} ${user.location.postcode}`,
		};

		userData.push(userObject);
	});

	const ShowRecordInfo = (
		totalPages,
		totalRecords,
		currentPage,
		itemsPerPage,
	) => {
		return (
			<>
				<div className="flex items-center text-white">
					Showing:{" "}
					{currentPage < totalPages
						? `${currentPage * itemsPerPage}/${totalRecords}`
						: `${totalRecords}/${totalRecords}`}{" "}
					Records.
				</div>

				<div className="flex items-center text-white">Page : {currentPage}</div>
			</>
		);
	};

	const tableHeader = [
		"Name",
		"Gender",
		"Age",
		"Email",
		"Contact Details",
		"Address",
	];

	useEffect(() => {
		fetchData(50);
	}, []);

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<HeadlessDataTable
				tableData={userData}
				itemsPerPage={5}
				customTableHeader={tableHeader}
				buttonClasses={"bg-gray-200 py-2 px-4 rounded-md text-gray-700 mb-10"}
				buttonContainerClasses={"flex justify-between mt-4"}
				showDetails={ShowRecordInfo}
				tableColumnClasses={"px-4 border border-white"}
				tableContainerClasses={"flex flex-col px-10 w-full bg-cyan-700"}
				tableClasses={"w-full"}
				headingColumnClasses={"px-4 text-left border border-white"}
				headingRowClasses={"bg-gray-300 "}
			/>
		</div>
	);
};

export default Example;
