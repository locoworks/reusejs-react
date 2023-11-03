import { DateTime } from "ts-luxon";

function useDateHelpers() {
	const addLeadingZeroes = (date: string) => {
		return date.replace(/(\b\d\b)/g, "0$&");
	};

	const MonthFormat = ["MM", "M"];
	const DayFormat = ["dd", "d"];
	const YearFormat = ["yyyy"];

	const parseCustomDate = (date: string, format = "dd/MM/yyyy") => {
		date = addLeadingZeroes(date);
		const formatParts = format.split(/[- /]/);
		const dateParts = date.split(/[- /]/);

		if (formatParts.length !== dateParts.length) {
			throw new Error("Date format and input date do not match.");
		}
		const dateValues: {
			year: number;
			month: number;
			day: number;
		} = {
			year: 0,
			month: 0,
			day: 0,
		};

		for (let i = 0; i < formatParts.length; i++) {
			const formatPart = formatParts[i];
			const datePart = dateParts[i];

			if (YearFormat.includes(formatPart)) {
				dateValues.year = parseInt(datePart);
			} else if (MonthFormat.includes(formatPart)) {
				dateValues.month = parseInt(datePart);
			} else if (DayFormat.includes(formatPart)) {
				dateValues.day = parseInt(datePart);
			}
		}
		if (!dateValues.year || !dateValues.month || !dateValues.day) {
			throw new Error("Invalid date format or input date.");
		}
		return new Date(dateValues.year, dateValues.month - 1, dateValues.day);
	};

	const getFormattedDate = (date: Date, format = "dd/MM/yyyy") => {
		const newDate = DateTime.fromISO(date.toISOString());
		return newDate.toFormat(format);
	};

	const isValidDate = (date: string, format = "dd/MM/yyyy") => {
		const preprocessedInputDate = addLeadingZeroes(date);
		try {
			const parsedDate = DateTime.fromFormat(preprocessedInputDate, format);

			if (parsedDate.isValid) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error, "Validation Error occured");
			return false;
		}
	};

	return {
		parseCustomDate,
		getFormattedDate,
		isValidDate,
	};
}

export { useDateHelpers };
