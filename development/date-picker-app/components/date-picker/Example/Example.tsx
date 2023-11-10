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
	};
	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 border rounded gap-x-3 bg-gray-50">
			<HeadlessDatePicker
				errorText="Error in Date Format!!"
				invalidDateClasses="outline outline-red-500"
				calendarBaseClasses={calendarClasses}
				dateCallback={printer}
			/>
		</div>
	);
};

export default Example;
