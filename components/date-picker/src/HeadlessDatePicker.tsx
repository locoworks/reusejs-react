import React, { useState, useRef } from "react";
import {
	useOutsideClicker,
	useDateHelpers,
} from "@locoworks/reusejs-toolkit-react-hooks";
import SingleDatePicker from "./SingleDatePicker";
import { CalendarBaseClassesProps } from "./Calendar";
import { twMerge } from "tailwind-merge";

interface Props {
	defaultValue?: Date;
	maxDate?: Date;
	minDate?: Date;
	dateFormat?: string;
	wrapperClasses?: string;
	datePickerWrapperClasses?: string;
	label?: React.ReactNode;
	inputWrapperClasses?: string;
	inputClasses?: string;
	invalidDateClasses?: string;
	suffixWrapperClasses?: string;
	suffix?: React.ReactNode;
	calendarContainerClasses?: string;
	helperText?: React.ReactNode;
	errorText?: React.ReactNode;
	calendarBaseClasses?: CalendarBaseClassesProps;
	customNextMonthComponent?: ({ props }: any) => React.ReactNode;
	customPrevMonthComponent?: ({ props }: any) => React.ReactNode;
	dateCallback?: (date: Date) => void;
}

const HeadlessDatePicker = ({
	defaultValue = new Date(),
	minDate = new Date("1000,0,1"),
	maxDate,
	dateFormat = "MM/dd/yyyy",
	label = "Select Date",
	suffix = <></>,
	helperText = <></>,
	errorText = <></>,
	wrapperClasses,
	inputWrapperClasses,
	inputClasses,
	suffixWrapperClasses,
	datePickerWrapperClasses,
	calendarContainerClasses,
	invalidDateClasses,
	calendarBaseClasses,
	customNextMonthComponent,
	customPrevMonthComponent,
	dateCallback,
}: Props) => {
	const { isValidDate, getFormattedDate, parseCustomDate } = useDateHelpers();

	const [selectedDate, setSelectedDate] = useState<Date>(defaultValue);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [tempDate, setTempDate] = useState<string>(
		getFormattedDate(selectedDate, dateFormat),
	);
	const [invalidDate, setInvalidDate] = useState<boolean>(false);

	const datePickerRef = useRef<HTMLInputElement | null>(null);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const calendarRef = useOutsideClicker(() => {
		setIsOpen(false);
	});

	const onChangeCallback = (date: Date) => {
		setTempDate(getFormattedDate(date, dateFormat));
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
			newState.currentSelected = parseCustomDate(value, dateFormat);
			if (newState?.currentSelected) {
				onChangeCallback(newState.currentSelected);
			}
		}

		setInvalidDate(newState.invalidDate);
		setTempDate(newState.tempDate);
	};

	return (
		<div className={`relative ${wrapperClasses}`}>
			<div className="relative" ref={datePickerRef}>
				<div
					className={datePickerWrapperClasses || ""}
					onClick={() => setIsOpen(true)}
				>
					<label>{label}</label>

					<div className={`relative ${inputWrapperClasses || ""}`}>
						<input
							type="text"
							name="date"
							placeholder={dateFormat}
							className={twMerge(
								inputClasses,
								invalidDate && invalidDateClasses,
							)}
							value={tempDate}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								updateDate(event)
							}
							ref={inputRef}
						/>
						<div
							className={twMerge(
								"absolute inset-y-0 flex items-center pr-2 right-3",
								suffixWrapperClasses,
							)}
						>
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
					className={twMerge(
						"absolute z-10 items-center justify-center p-4 transform -translate-x-6 bg-white rounded-lg shadow-md w-72",
						calendarContainerClasses,
					)}
				>
					<SingleDatePicker
						selected={selectedDate}
						calendarBaseClasses={calendarBaseClasses}
						onChange={(d: Date) => {
							onChangeCallback(d);
							setIsOpen(false);
							dateCallback && dateCallback(d);
						}}
						maxDate={maxDate}
						minDate={minDate}
						customNextMonthComponent={customNextMonthComponent}
						customPrevMonthComponent={customPrevMonthComponent}
					/>
				</div>
			)}
		</div>
	);
};

export default HeadlessDatePicker;
