import React, { useState } from "react";
import { ReuseSwitch } from "@locoworks/reusejs-react-switch";

const Switch = () => {
	const [switchValue, setSwitchValue] = useState<boolean>(false);

	const handleSwitch = (isSwitch: boolean) => {
		setSwitchValue(isSwitch);
	};

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseSwitch
				isSwitch={switchValue}
				onChange={handleSwitch}
				containerClassName={""}
				trackClassName={""}
				thumbClassName={""}
			/>
		</div>
	);
};

export default Switch;
