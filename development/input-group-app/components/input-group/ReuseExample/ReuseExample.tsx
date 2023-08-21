import React, { useState } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";

const Prefix = () => {
	return (
		<div className="absolute top-1/2 -translate-y-1/2 left-2 font-bold">
			Pre
		</div>
	);
};

const Suffix = () => {
	return (
		<button
			className="absolute top-1/2 -translate-y-1/2 right-2 font-bold"
			onClick={() => {
				alert("Suffix button Clicked!!!");
			}}
		>
			Suffix
		</button>
	);
};

const ReuseSample = () => {
	const [error, setError] = useState(false);
	const [customError, setCustomError] = useState(false);

	const buttonClassName = (val: boolean) => {
		return (
			"p-2 text-white rounded-lg w-32 font-bold " +
			(val ? "bg-green-400 hover:bg-green-400" : "bg-red-600 hover:bg-red-500 ")
		);
	};

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseInputGroup
				className="pl-10 pr-14"
				headerText="Reuse Input Group"
				helperStyles="mt-2"
				helperText="This text is for Helping!!"
				errorText={error ? "Error!!Error!!" : ""}
				error={
					customError ? (
						<label className="bg-red-400 w-full px-2 py-1 text-white text-sm">
							This is custom error
						</label>
					) : (
						""
					)
				}
				errorInputStyles="bg-red-200 border-red-800"
				prefix={<Prefix />}
				suffix={<Suffix />}
			/>
			<div className="flex mt-6 gap-x-10">
				<button
					className={buttonClassName(error)}
					onClick={() => {
						setError(!error);
					}}
				>
					Error
				</button>
				<button
					className={buttonClassName(customError)}
					onClick={() => setCustomError(!customError)}
				>
					Custom Error
				</button>
			</div>
		</div>
	);
};

export default ReuseSample;
