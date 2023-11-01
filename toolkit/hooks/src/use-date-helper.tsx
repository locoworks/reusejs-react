import { DateTime } from "ts-luxon";

function useDateHelpers() {
	const addLeadingZeroes = (date: string) => {
		return date.replace(/(\b\d\b)/g, "0$&");
	};

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

			if (formatPart == "yyyy" || formatPart == "YYYY") {
				dateValues.year = parseInt(datePart);
			} else if (
				formatPart == "MM" ||
				formatPart == "M" ||
				formatPart == "mm" ||
				formatPart == "m"
			) {
				dateValues.month = parseInt(datePart);
			} else if (
				formatPart == "DD" ||
				formatPart == "D" ||
				formatPart == "dd" ||
				formatPart == "d"
			) {
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
		const n = newDate.toFormat(format);
		return n;
	};

	const isValidDate = (date: string, format = "dd/MM/yyyy") => {
		const preprocessedInputDate = addLeadingZeroes(date);
		try {
			const parsedDate = DateTime.fromFormat(preprocessedInputDate, format);

			if (parsedDate.isValid) {
				const standardizedDate = parsedDate.toFormat("yyyy-MM-dd");
				console.log("Valid date:", standardizedDate);
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
