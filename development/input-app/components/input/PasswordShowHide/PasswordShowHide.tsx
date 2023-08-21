import React, { useState } from "react";
import { ReuseInput } from "@locoworks/reusejs-react-input";

const PasswordShowHide = () => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseInput
				className="w-[300px]"
				type="password"
				placeholder="Password"
				showPassword={showPassword}
			/>
			<button
				className="w-20 bg-blue-400 mt-2 text-white font-bold py-2 rounded "
				onClick={() => setShowPassword(!showPassword)}
			>
				{showPassword ? "Hide" : "Show"}
			</button>
		</div>
	);
};

export default PasswordShowHide;
