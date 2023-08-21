import React, { useState } from "react";
import { ReuseOTPInput } from "@locoworks/reusejs-react-otp-input";

const ColorFill = () => {
	const [otp, setOtp] = useState("");

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10  bg-gray-50">
			<ReuseOTPInput
				value={otp}
				onChange={setOtp}
				numInputs={5}
				renderSeparator={null}
				renderInput={(props: any) => <input {...props} />}
				inputClassName="rounded-full text-center flex flex-col items-center justify-center text-center outline-none text-white-600 focus:bg-rose-200 focus:ring-1 focus-text-white-600 ring-red-300"
				containerStyle="gap-2 rounded-full"
			/>
		</div>
	);
};

export default ColorFill;
