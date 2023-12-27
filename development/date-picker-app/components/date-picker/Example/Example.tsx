import React from "react";
import {
	HeadlessDatePicker,
	CalendarBaseClassesProps,
} from "@locoworks/reusejs-react-date-picker";

const Example: React.FC = () => {
	const calendarClasses: CalendarBaseClassesProps = {
		calenderHeaderButtonsWrapper: "bg-gray-50",
	};

	const printer = (date: Date) => {
		console.log("Date", date);
		setSelectedDate(date);
	};
	const [selectedDate, setSelectedDate] = React.useState<any>("");

	return (
		<div className="flex flex-col gap-y-2 items-center justify-center py-10 mt-10 border rounded gap-x-3 bg-gray-50">
			<HeadlessDatePicker
				errorText="Error in Date Format!!"
				invalidDateClasses="outline outline-red-500"
				calendarBaseClasses={calendarClasses}
				dateCallback={printer}
			/>
			<button
				className="bg-blue-600 px-4 py-1 rounded-xl text-white font-bold hover:bg-blue-700"
				onClick={() => {
					console.log("SELECTED DATE IS>>>", selectedDate);
				}}
			>
				Show Selected Date
			</button>
		</div>
	);
};

export default Example;
