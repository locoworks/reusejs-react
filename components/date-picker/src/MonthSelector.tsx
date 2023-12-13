import React, { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type MonthSelectorProps = {
	onMonthChange: (month: number) => void;
	setShowMonthSelector: Dispatch<SetStateAction<boolean>>;
	monthSelectorWrapperClasses?: string;
	monthsContainerClasses?: string;
	monthClasses?: string;
};

const MonthSelector: React.FC<MonthSelectorProps> = ({
	onMonthChange,
	setShowMonthSelector,
	monthSelectorWrapperClasses,
	monthsContainerClasses,
	monthClasses,
}) => {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sept",
		"Oct",
		"Nov",
		"Dec",
	];
	const handleUpdateMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
		onMonthChange(months.indexOf(e.currentTarget.value));
		setShowMonthSelector(false);
	};

	return (
		<div
			className={twMerge("relative top-0 w-full", monthSelectorWrapperClasses)}
		>
			<div className={twMerge("grid grid-cols-4", monthsContainerClasses)}>
				{months.map((month) => (
					<button
						className={monthClasses}
						key={month}
						value={month}
						onClick={(e) => handleUpdateMonth(e)}
					>
						{month}
					</button>
				))}
			</div>
		</div>
	);
};

export default MonthSelector;
