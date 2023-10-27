import React, { useEffect, useState } from "react";
import { useDayzed } from "dayzed";
import Calendar, { CalendarBaseClassesProps } from "./Calendar";

export interface SingleDatePickerProps {
	onChange?: any;
	userTimezone?: any;
	selected?: any;
	maxDate?: Date;
	minDate?: Date;
	showOutsideDays?: boolean;
	calendarBaseClasses?: CalendarBaseClassesProps;
}

export default function SingleDatePicker({
	selected,
	onChange,
	minDate,
	maxDate,
	showOutsideDays = true,
}: SingleDatePickerProps) {
	const [selectedDate, setSelectedDate] = useState<Date>(
		selected || new Date(),
	);

	const handleOnDateSelected = (date: any, e: React.SyntheticEvent): void => {
		console.log(date, "__date", e, "__event");

		setSelectedDate(date.date);
		onChange(date.date);
	};

	useEffect(() => {
		setSelectedDate(selected);
	}, [selected]);

	const dayzedData = useDayzed({
		date: selectedDate,
		minDate: minDate,
		maxDate: maxDate,
		selected: selectedDate,
		onDateSelected: handleOnDateSelected,
		showOutsideDays: showOutsideDays,
	});

	return <Calendar {...dayzedData} />;
}
