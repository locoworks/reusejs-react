import React from "react";
import {
	HeadlessDatePicker,
	CalendarBaseClassesProps,
} from "@locoworks/reusejs-react-date-picker";

const Example: React.FC = () => {
	const calendarClasses: CalendarBaseClassesProps = {
		calenderHeaderButtonsWrapper: "bg-gray-50",
	};
	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 border rounded gap-x-3 bg-gray-50">
			<HeadlessDatePicker
				suffix="Suffix"
				helperText="Helper text"
				errorText="Error Text"
				calendarBaseClasses={calendarClasses}
			/>
		</div>
	);
};

export default Example;
