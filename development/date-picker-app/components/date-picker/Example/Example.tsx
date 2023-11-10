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
		console.log(">>>>>>date", date);
	};
	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 border rounded gap-x-3 bg-gray-50">
			<HeadlessDatePicker
				suffix="Suffix"
				helperText="Helper text"
				errorText="Error Text"
				invalidDateClasses="outline outline-red-500"
				calendarBaseClasses={calendarClasses}
				dateCallback={printer}
				customNextMonthComponent={(props: any) => {
					console.log(">>>>>>", props[`aria-label`], props.disabled);
					return (
						<div
							className="bg-red-400 w-fit h-fit rounded-xl px-2"
							aria-label={props[`aria-label`]}
							onClick={(e) => {
								console.log(">>>>>>> HELLO", props?.onClick);
								props.onClick(e);
							}}
						>
							{`->`}
						</div>
					);
				}}
			/>
		</div>
	);
};

export default Example;
