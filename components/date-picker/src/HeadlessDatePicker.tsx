import React, { useState, useRef } from "react";
import {
	useOutsideClicker,
	useDateHelpers,
} from "@locoworks/reusejs-toolkit-react-hooks";
import SingleDatePicker from "./SingleDatePicker";
import { CalendarBaseClassesProps } from "./Calendar";

interface Props {
	defaultValue?: Date;
	maxDate?: Date;
	minDate?: Date;
	dateFormat?: string;
	wrapperClasses?: string;
	datePickerWrapperClasses?: string;
	label?: React.ReactNode;
	inputClasses?: string;
	invalidDateClasses?: string;
	suffix?: React.ReactNode;
	calendarContainerClasses?: string;
	helperText?: React.ReactNode;
	errorText?: React.ReactNode;
	calendarBaseClasses?: CalendarBaseClassesProps;
}
const HeadlessDatePicker = ({
	defaultValue = new Date(),
	minDate,
	maxDate,
	dateFormat = "MM/dd/yyyy",
	label = "Select Date",
	suffix = <></>,
	helperText = <></>,
	errorText = <></>,
	wrapperClasses,
	inputClasses,
	datePickerWrapperClasses,
	calendarContainerClasses,
	invalidDateClasses,
	calendarBaseClasses,
}: Props) => {
	const { isValidDate } = useDateHelpers();

	const [selectedDate, setSelectedDate] = useState<Date>(defaultValue);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [tempDate, setTempDate] = useState<string>(
		selectedDate.toLocaleDateString(),
	);
	const [invalidDate, setInvalidDate] = useState<boolean>(false);

	const datePickerRef = useRef<HTMLInputElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const calendarRef = useOutsideClicker(() => {
		setIsOpen(false);
	});

	const onChangeCallback = (date: Date) => {
		setTempDate(date.toLocaleDateString());
		setSelectedDate(date);
	};

	const updateDate = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const newState: {
			tempDate: string;
			invalidDate: boolean;
			currentSelected?: Date;
		} = {
			tempDate: value,
			invalidDate: true,
		};

		if (isValidDate(value, dateFormat)) {
			newState.invalidDate = false;
			newState.currentSelected = new Date(value);
			onChangeCallback(newState.currentSelected);
		}

		setInvalidDate(newState.invalidDate);
		setTempDate(newState.tempDate);
	};

	return (
		<div className={wrapperClasses}>
			<div className="relative" ref={datePickerRef}>
				<div
					className={`flex flex-col p-3 font-sm ${
						datePickerWrapperClasses || ""
					}`}
					onClick={() => setIsOpen(true)}
				>
					<label>{label}</label>

					<div className="relative">
						<input
							type="text"
							name="date"
							placeholder={dateFormat}
							className={`relative w-full flex-1 py-2 px-4 text-base font-ubuntu font-normal tracking-wider justify-start outline-none text-theme-gray rounded-lg border border-border-gray
							${inputClasses || ""}
							${invalidDate && `border-red-300 ${invalidDateClasses || ""}`} `}
							value={tempDate}
							onChange={(e: any) => updateDate(e)}
							ref={inputRef}
						/>
						<div className="absolute inset-y-0 flex items-center pr-2 right-3">
							{suffix}
						</div>
					</div>
					{helperText && helperText}
					{invalidDate && errorText && errorText}
				</div>
			</div>
			{isOpen && !invalidDate && (
				<div
					ref={calendarRef}
					className={`absolute z-10 grid items-center justify-center p-4 transform -translate-x-6 bg-white rounded-lg shadow-md w-72 ${
						calendarContainerClasses || ""
					}`}
				>
					<SingleDatePicker
						selected={selectedDate}
						calendarBaseClasses={calendarBaseClasses}
						//   userTimezone={userTimezone}
						onChange={(d: any) => {
							onChangeCallback(d);
							setIsOpen(false);
						}}
						maxDate={maxDate}
						minDate={minDate}
					/>
				</div>
			)}
		</div>
	);
};

export default HeadlessDatePicker;
