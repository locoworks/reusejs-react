import React from "react";
import { DateTime } from "ts-luxon";

const convertGMTDateToTimezone: React.FC<any> = (
	date: string | Date,
	format = "MMM dd, yyyy, hh:mm a",
) => {
	if (typeof date === "string") {
		const dateTime = DateTime.fromISO(date, { zone: "local" }).toFormat(format);
		return dateTime;
	} else {
		const dateTime = DateTime.fromJSDate(date, { zone: "local" }).toFormat(
			format,
		);

		console.log(dateTime, "DateTime____");

		return dateTime;
	}
};

function useDateHelpers() {
	const getFormattedDate = (
		date: string,
		timestamp = false,
		format = "MMM dd, yyyy, hh:mm a",
	) => {
		console.log("DATE_VALUE", date);
		if (timestamp) {
			date = new Date(parseInt(date) * 1000).toISOString();
		}

		return convertGMTDateToTimezone(date, format);
	};

	const isValidDate = (date: string, format = "MM/dd/yy") => {
		const normalizedDate = date.replace(/(\d)\/(\d)/, "0$1/0$2");

		const parsedDate = DateTime.fromFormat(normalizedDate, format);

		return parsedDate.isValid;
	};

	return {
		getFormattedDate,
		isValidDate,
	};
}

export { useDateHelpers };
