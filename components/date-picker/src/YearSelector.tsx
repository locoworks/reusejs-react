import React, { useEffect, useState } from "react";

const YearSelector = ({ selectedYear = "2023", onYearChange }: any) => {
	const [startYear, setStartYear] = useState<number>(parseInt(selectedYear));
	useEffect(() => {
		console.log("I got mounted");
	}, []);
	const handlePrevClick = () => {
		setStartYear(startYear - 10);
	};

	const handleNextClick = () => {
		setStartYear(startYear + 10);
	};

	const years = [];
	for (let i = startYear; i < startYear + 10; i++) {
		years.push(i);
	}
	return (
		<div className="relative top-0 w-full">
			<button onClick={handlePrevClick}>Previous</button>
			<select
				value={selectedYear}
				onChange={(e) => onYearChange(parseInt(e.target.value))}
			>
				{years.map((year) => (
					<option key={year} value={year}>
						{year}
					</option>
				))}
			</select>
			<button onClick={handleNextClick}>Next</button>
		</div>
	);
};

export default YearSelector;
