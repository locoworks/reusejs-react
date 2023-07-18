import React, { useState } from "react";
import { ReuseOTPInput } from "@locoworks/reusejs-react-otp-input";

const ReuseNumberWithPasteExample = () => {
	const [otp, setOtp] = useState("");

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseOTPInput
				value={otp}
				onChange={setOtp}
				numInputs={4}
				renderSeparator={null}
				renderInput={(props: any) => (
					<input
						{...props}
						onWheel={(event) => {
							event.preventDefault();
						}}
						type="number"
					/>
				)}
				inputClassName="text-center"
				containerStyle="gap-2"
			/>
		</div>
	);
};

export default ReuseNumberWithPasteExample;
