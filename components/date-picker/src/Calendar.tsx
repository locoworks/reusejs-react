import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import YearSelector from "./YearSelector";
import MonthSelector from "./MonthSelector";

const calendardefaultClasses = {
	defaultSelectableTextStyle: "bg-white hover:bg-gray-100 ",
	defaultDateButtonStyle: "inline-block border-none rounded-md",
	selectedOrTodayStyles: "font-semibold border border-blue-200",
	selectedTextStyles: "text-white font-semibold bg-blue-200",
	selectableTextStyles: "text-gray-800 ",
	todayButNotSelectedStyles: "bg-blue-100",
	weekendStyles: "text-red-400 ",
	topLeftBorderStyles: "rounded-tl-lg",
	topRightBorderStyles: "rounded-tr-lg",
	bottomLeftBorderStyles: "rounded-bl-lg",
	bottomRightBorderStyles: "rounded-br-lg",
	notCurrentMonthStyles: "text-gray-800  bg-gray-50  opacity-80",
	dateButtonsUnSelectableStyles: "bg-gray-50 ",
};

export interface CalendarBaseClassesProps {
	calendarWrapperClasses?: string;
	calenderHeaderButtonsWrapper?: string;
	calendarWeeksClasses?: string;
	headerButtonClasses?: string;
	singleCalenderSectionWrapper?: string;
	calendarHeaderClasses?: string;
	weekNameWrapper?: string;
	weekNameClasses?: string;
	selectableClasses?: string;
	selectedOrTodayClasses?: string;
	weekendClasses?: string;
	notCurrentMonthClasses?: string;
	selectedTextClasses?: string;
	selectableTextClasses?: string;
	todayButNotSelectedClasses?: string;
	yearSelectorWrapperClasses?: string;
	yearSelectorHeaderWrapperClasses?: string;
	yearSelectorHeaderClasses?: string;
	yearsContainerClasses?: string;
	yearClasses?: string;
	monthSelectorWrapperClasses?: string;
	monthsContainerClasses?: string;
	monthClasses?: string;
}

const monthNamesShort = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const weekdayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export interface CalenderProps {
	calendars?: any;
	year: number;
	handleYearChange: (year: number) => void;
	handleMonthChange: (month: number) => void;
	getBackProps?: any;
	getForwardProps?: any;
	getDateProps?: any;
	prevMonthLabel?: React.ReactNode;
	nextMonthLabel?: React.ReactNode;
	prevYearLabel?: React.ReactNode;
	nextYearLabel?: React.ReactNode;
	calendarBaseClasses?: CalendarBaseClassesProps;
}

export default function Calendar({
	calendars,
	year,
	handleYearChange,
	handleMonthChange,
	getBackProps,
	getForwardProps,
	getDateProps,
	calendarBaseClasses,
	prevMonthLabel = "Back",
	nextMonthLabel = "Next",
	prevYearLabel = "Prev",
	nextYearLabel = "Next",
}: CalenderProps) {
	const [showYearSelector, setShowYearSelector] = useState(false);
	const [showMonthSelector, setShowMonthSelector] = useState(false);

	if (calendars.length) {
		return (
			<div
				className={twMerge("grid", calendarBaseClasses?.calendarWrapperClasses)}
			>
				<div
					className={twMerge(
						"flex justify-between",
						calendarBaseClasses?.calenderHeaderButtonsWrapper,
					)}
				>
					<button
						className={calendarBaseClasses?.headerButtonClasses}
						{...getBackProps({
							calendars,
						})}
					>
						{prevMonthLabel}
					</button>
					<button
						className={calendarBaseClasses?.headerButtonClasses}
						{...getForwardProps({
							calendars,
						})}
					>
						{nextMonthLabel}
					</button>
				</div>
				{calendars.map((calendar: any) => (
					<div
						key={`${calendar.month}${calendar.year}`}
						className={twMerge(
							"box-border grid inline-block",
							calendarBaseClasses?.singleCalenderSectionWrapper,
						)}
					>
						<div
							className={twMerge(
								"flex gap-2 justify-center hover:bg-gray-100",
								calendarBaseClasses?.calendarHeaderClasses,
							)}
						>
							<span
								className="cursor-pointer"
								onClick={() => {
									setShowMonthSelector((prev) => !prev);
									setShowYearSelector(false);
								}}
							>
								{monthNamesShort[calendar.month]}
							</span>
							<span
								className="cursor-pointer"
								onClick={() => {
									setShowYearSelector((prev) => !prev);
									setShowMonthSelector(false);
								}}
							>
								{calendar.year}
							</span>
						</div>

						{showYearSelector && (
							<YearSelector
								year={year}
								prevYearLabel={prevYearLabel}
								nextYearLabel={nextYearLabel}
								onYearChange={handleYearChange}
								setShowYearSelector={setShowYearSelector}
								yearSelectorWrapperClasses={
									calendarBaseClasses?.yearSelectorWrapperClasses
								}
								yearSelectorHeaderClasses={
									calendarBaseClasses?.yearSelectorHeaderClasses
								}
								yearsContainerClasses={
									calendarBaseClasses?.yearsContainerClasses
								}
								yearClasses={calendarBaseClasses?.yearClasses}
							/>
						)}
						{showMonthSelector && (
							<MonthSelector
								onMonthChange={handleMonthChange}
								setShowMonthSelector={setShowMonthSelector}
								monthSelectorWrapperClasses={
									calendarBaseClasses?.monthSelectorWrapperClasses
								}
								monthsContainerClasses={
									calendarBaseClasses?.monthsContainerClasses
								}
								monthClasses={calendarBaseClasses?.monthClasses}
							/>
						)}
						{!showMonthSelector && !showYearSelector && (
							<>
								<div
									className={twMerge(
										"grid grid-cols-7",
										calendarBaseClasses?.weekNameWrapper,
									)}
								>
									{weekdayNamesShort.map((weekday) => (
										<div
											key={`${calendar.month}${calendar.year}${weekday}`}
											className={twMerge(
												"inline-block text-center bg-transparent border-none",
												calendarBaseClasses?.weekNameClasses,
											)}
										>
											{weekday}
										</div>
									))}
								</div>
								<div
									className={twMerge(
										"grid grid-cols-7",
										calendarBaseClasses?.calendarWeeksClasses,
									)}
								>
									{calendar.weeks.map((week: any, weekIndex: any) =>
										week.map((dateObj: any, dayIdx: any) => {
											const key = `${calendar.month}${calendar.year}${weekIndex}${dayIdx}`;
											if (!dateObj) {
												return (
													<div
														key={key}
														className="inline-block px-2 bg-transparent border-none"
													/>
												);
											}
											const {
												date,
												selected,
												selectable,
												today,
												prevMonth,
												nextMonth,
											} = dateObj;

											const isCurrentMonth = !prevMonth && !nextMonth;

											return (
												<button
													key={key}
													{...getDateProps({ dateObj })}
													className={twMerge(
														calendardefaultClasses.defaultDateButtonStyle,

														selectable &&
															twMerge(
																calendarBaseClasses?.selectableClasses,
																calendardefaultClasses.defaultSelectableTextStyle,
															),
														(selected || today) &&
															twMerge(
																calendarBaseClasses?.selectedOrTodayClasses,
																calendardefaultClasses.selectedOrTodayStyles,
															),
														selected &&
															twMerge(
																calendarBaseClasses?.selectedTextClasses,
																calendardefaultClasses.selectedTextStyles,
															),
														today &&
															!selected &&
															twMerge(
																calendarBaseClasses?.todayButNotSelectedClasses,
																calendardefaultClasses.todayButNotSelectedStyles,
															),
														selectable &&
															twMerge(
																calendarBaseClasses?.selectableTextClasses,
																calendardefaultClasses.selectableTextStyles,
															),
														(dayIdx == 0 || dayIdx == 6) &&
															twMerge(
																calendarBaseClasses?.weekendClasses,
																calendardefaultClasses.weekendStyles,
															),
														weekIndex === 0 &&
															dayIdx === 0 &&
															calendardefaultClasses.topLeftBorderStyles,
														weekIndex === 0 &&
															dayIdx === 6 &&
															calendardefaultClasses.topRightBorderStyles,
														weekIndex === calendar.weeks.length - 1 &&
															dayIdx === 0 &&
															calendardefaultClasses.bottomLeftBorderStyles,
														weekIndex === calendar.weeks.length - 1 &&
															dayIdx === 6 &&
															calendardefaultClasses.bottomRightBorderStyles,
														!isCurrentMonth &&
															twMerge(
																calendarBaseClasses?.notCurrentMonthClasses,
																calendardefaultClasses.notCurrentMonthStyles,
															),
													)}
												>
													{selectable ? date.getDate() : "X"}
												</button>
											);
										}),
									)}
								</div>
							</>
						)}
					</div>
				))}
			</div>
		);
	}
	return null;
}
