import React from "react";
import { HeadlessDatePicker } from "@locoworks/reusejs-react-date-picker";

const CustomDatePicker = () => {
	return (
		<div className="flex flex-col items-center justify-center py-10 mt-10 border rounded gap-x-3 bg-gray-50">
			<HeadlessDatePicker
				label="Select Date"
				labelClasses="text-gray-400 text-sm"
				suffix={
					<svg
						className="w-4 h-4 text-gray-800"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
						/>
					</svg>
				}
				inputWrapperClasses="p-2"
				errorText="Error Text"
				invalidDateClasses="outline outline-red-500"
				nextMonthLabel={
					<svg
						className="w-4 h-4 text-gray-600"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 5h12m0 0L9 1m4 4L9 9"
						/>
					</svg>
				}
				prevMonthLabel={
					<svg
						className="w-4 h-4 text-gray-600"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 5H1m0 0 4 4M1 5l4-4"
						/>
					</svg>
				}
			/>
		</div>
	);
};

export default CustomDatePicker;
