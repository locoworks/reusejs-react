import React, { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";

type YearSelectorProps = {
	year: number;
	onYearChange: (year: number) => void;
	setShowYearSelector: Dispatch<SetStateAction<boolean>>;
	prevYearLabel?: React.ReactNode;
	nextYearLabel?: React.ReactNode;
	yearSelectorWrapperClasses?: string;
	yearSelectorHeaderWrapperClasses?: string;
	yearSelectorHeaderClasses?: string;
	yearsContainerClasses?: string;
	yearClasses?: string;
};
const YearSelector: React.FC<YearSelectorProps> = ({
	year,
	onYearChange,
	setShowYearSelector,
	prevYearLabel,
	nextYearLabel,
	yearSelectorWrapperClasses,
	yearSelectorHeaderWrapperClasses,
	yearSelectorHeaderClasses,
	yearsContainerClasses,
	yearClasses,
}) => {
	const [startYear, setStartYear] = useState<number>(year - (year % 10));

	const handlePrevClick = () => {
		setStartYear(startYear - 10);
	};

	const handleNextClick = () => {
		setStartYear(startYear + 10);
	};

	const handleUpdateYear = (yearEvent: React.MouseEvent<HTMLButtonElement>) => {
		onYearChange(parseInt(yearEvent.currentTarget.value));
		setShowYearSelector(false);
	};

	const years = [];
	for (let i = startYear - 1; i <= startYear + 10; i++) {
		years.push(i);
	}

	return (
		<div
			className={twMerge("relative top-0 w-full", yearSelectorWrapperClasses)}
		>
			<div
				className={twMerge(
					"flex items-center justify-between w-full",
					yearSelectorHeaderWrapperClasses,
				)}
			>
				<button onClick={handlePrevClick}>{prevYearLabel}</button>
				<div className={yearSelectorHeaderClasses}>
					{startYear} - {startYear + 10}
				</div>
				<button onClick={handleNextClick}>{nextYearLabel}</button>
			</div>
			<div className={twMerge("grid grid-cols-4", yearsContainerClasses)}>
				{years.map((year) => (
					<button
						className={yearClasses}
						key={year}
						value={year}
						onClick={(e) => handleUpdateYear(e)}
					>
						{year}
					</button>
				))}
			</div>
		</div>
	);
};

export default YearSelector;
