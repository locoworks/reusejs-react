import React, { CSSProperties } from "react";
import { useDataTable } from "@locoworks/reusejs-toolkit-react-hooks";

interface DataEntry {
	tableData: any;
	customTableHeader?: any;
	itemsPerPage?: number;
	tableContainerClasses?: string | CSSProperties;
	tableClasses?: string | CSSProperties;
	tableRowClasses?: string | CSSProperties;
	tableColumnClasses?: string | CSSProperties;
	headingRowClasses?: string | CSSProperties;
	headingColumnClasses?: string | CSSProperties;
	buttonClasses?: string | CSSProperties;
	buttonContainerClasses?: string | CSSProperties;
	showDetails?: (
		totalPages: number,
		totalRecords: number,
		currentPage: number,
		itemsPerPage: number,
	) => any;
}

const HeadlessDataTable = ({
	tableData,
	customTableHeader = [],
	itemsPerPage = 0,
	tableContainerClasses,
	tableClasses,
	tableRowClasses,
	tableColumnClasses,
	headingRowClasses,
	headingColumnClasses,
	buttonClasses,
	buttonContainerClasses,
	showDetails,
}: DataEntry) => {
	const {
		currentPage,
		paginatedData,
		totalItems,
		totalPages,
		tableHeaders,
		next,
		previous,
	} = useDataTable({
		tableData: tableData,
		itemsPerPage: itemsPerPage,
		searchQueryObject: [],
		queryAll: "",
	});

	return (
		<div
			className={
				typeof tableContainerClasses === "string" ? tableContainerClasses : ""
			}
			style={
				typeof tableContainerClasses === "object" ? tableContainerClasses : {}
			}
		>
			<table
				className={typeof tableClasses === "string" ? tableClasses : ""}
				style={typeof tableClasses === "object" ? tableClasses : {}}
			>
				<thead>
					<tr
						className={
							typeof headingRowClasses === "string" ? headingRowClasses : ""
						}
						style={
							typeof headingRowClasses === "object" ? headingRowClasses : {}
						}
					>
						{customTableHeader.length > 0
							? customTableHeader.map((header: string) => (
									<th
										key={header}
										className={
											typeof headingColumnClasses === "string"
												? headingColumnClasses
												: ""
										}
										style={
											typeof headingColumnClasses === "object"
												? headingColumnClasses
												: {}
										}
									>
										{header}
									</th>
							  ))
							: tableHeaders.map((header: string) => (
									<th
										key={header}
										className={
											typeof headingColumnClasses === "string"
												? headingColumnClasses
												: ""
										}
										style={
											typeof headingColumnClasses === "object"
												? headingColumnClasses
												: {}
										}
									>
										{header}
									</th>
							  ))}
					</tr>
				</thead>
				<tbody>
					{paginatedData.length > 0 ? (
						paginatedData.map((item: any, index: number) => (
							<tr
								key={index}
								className={
									typeof tableRowClasses === "string" ? tableRowClasses : ""
								}
								style={
									typeof tableRowClasses === "object" ? tableRowClasses : {}
								}
							>
								{tableHeaders.map((header: any) => (
									<td
										key={header}
										className={
											typeof tableColumnClasses === "string"
												? tableColumnClasses
												: ""
										}
										style={
											typeof tableColumnClasses === "object"
												? tableColumnClasses
												: {}
										}
									>
										{item[header as keyof DataEntry]}
									</td>
								))}
							</tr>
						))
					) : (
						<tr>
							<td colSpan={tableHeaders.length}>No results found.</td>
						</tr>
					)}
				</tbody>
			</table>
			{showDetails &&
				showDetails(totalPages, totalItems, currentPage, itemsPerPage)}
			<div
				className={
					typeof buttonContainerClasses === "string"
						? buttonContainerClasses
						: ""
				}
				style={
					typeof buttonContainerClasses === "object"
						? buttonContainerClasses
						: {}
				}
			>
				<button
					onClick={previous}
					disabled={currentPage === 1}
					className={typeof buttonClasses === "string" ? buttonClasses : ""}
					style={typeof buttonClasses === "object" ? buttonClasses : {}}
				>
					Previous
				</button>
				<button
					onClick={next}
					disabled={currentPage === totalPages}
					className={typeof buttonClasses === "string" ? buttonClasses : ""}
					style={typeof buttonClasses === "object" ? buttonClasses : {}}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default HeadlessDataTable;
