import React from "react";
import { twMerge } from "tailwind-merge";

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
	monthNameClasses?: string;
	weekNameWrapper?: string;
	weekNameClasses?: string;
	selectableClasses?: string;
	selectedOrTodayClasses?: string;
	weekendClasses?: string;
	notCurrentMonthClasses?: string;
	selectedTextClasses?: string;
	selectableTextClasses?: string;
	todayButNotSelectedClasses?: string;
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
	getBackProps?: any;
	getForwardProps?: any;
	getDateProps?: any;
	prevMonthLabel?: React.ReactNode;
	nextMonthLabel?: React.ReactNode;
	calendarBaseClasses?: CalendarBaseClassesProps;
}

export default function Calendar({
	calendars,
	getBackProps,
	getForwardProps,
	getDateProps,
	calendarBaseClasses,
	prevMonthLabel = "Back",
	nextMonthLabel = "Next",
}: CalenderProps) {
	if (calendars.length) {
		return (
			<div className={calendarBaseClasses?.calendarWrapperClasses || "grid"}>
				<div
					className={`flex justify-between ${
						calendarBaseClasses?.calenderHeaderButtonsWrapper || ""
					}`}
				>
					<button
						className={`${calendarBaseClasses?.headerButtonClasses || ""}`}
						{...getBackProps({
							calendars,
						})}
					>
						{prevMonthLabel}
					</button>
					<button
						className={`${calendarBaseClasses?.headerButtonClasses || ""}`}
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
						className={`box-border grid inline-block ${
							calendarBaseClasses?.singleCalenderSectionWrapper || ""
						}`}
					>
						<div
							className={`text-center ${
								calendarBaseClasses?.monthNameClasses || ""
							}`}
						>
							{monthNamesShort[calendar.month]} {calendar.year}
						</div>

						<div
							className={`grid grid-cols-7 ${
								calendarBaseClasses?.weekNameWrapper || ""
							}`}
						>
							{weekdayNamesShort.map((weekday) => (
								<div
									key={`${calendar.month}${calendar.year}${weekday}`}
									className={`inline-block text-center bg-transparent border-none ${
										calendarBaseClasses?.weekNameClasses || ""
									}`}
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
												className="inline-block px-2 bg-transparent border-none "
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
					</div>
				))}
			</div>
		);
	}
	return null;
}
