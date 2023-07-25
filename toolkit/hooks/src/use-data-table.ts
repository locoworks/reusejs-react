import { useState, useEffect } from "react";
interface DataTableInterface {
	tableData: any;
	itemsPerPage?: number;
	queryAll: string;
	searchQueryObject: { field: string; value: string }[];
}
export const useDataTable = ({
	tableData,
	itemsPerPage = 0,
	queryAll = "",
	searchQueryObject = [],
}: DataTableInterface) => {
	const [searchQueries, setSearchQueries] = useState(searchQueryObject);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState(queryAll);

	const getDisplayedData = (): any => {
		const query = searchQuery.trim().toLowerCase();
		if (query !== "") {
			return tableData.filter((item: any) =>
				tableHeaders.some(
					(header) => item[header]?.toLowerCase().includes(query),
				),
			);
		}

		if (searchQueries.length > 0) {
			const filteredData = tableData.filter((item: any) =>
				searchQueries.every(
					({ field, value }) =>
						item[field]?.toLowerCase().includes(value.toLowerCase()),
				),
			);
			return filteredData;
		}

		return tableData;
	};

	const previous = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	const next = () => {
		const totalPages = Math.ceil(getDisplayedData().length / itemsPerPage);
		if (currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const clearFilter = () => {
		setSearchQueries([]);
		setSearchQuery("");
		setCurrentPage(1);
	};

	const tableHeaders: string[] =
		tableData?.length > 0 ? Object.keys(tableData[0]) : [];
	const startIndex = itemsPerPage === 0 ? 0 : itemsPerPage * (currentPage - 1);
	const endIndex =
		startIndex + (itemsPerPage > 0 ? itemsPerPage : tableData?.length);

	const paginatedData = getDisplayedData().slice(startIndex, endIndex);
	const totalItems = getDisplayedData().length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchQueries, searchQuery]);

	return {
		searchQueries,
		setSearchQueries,
		searchQuery,
		setSearchQuery,
		currentPage,
		setCurrentPage,
		paginatedData,
		totalItems,
		totalPages,
		tableHeaders,
		next,
		previous,
		clearFilter,
	};
};
