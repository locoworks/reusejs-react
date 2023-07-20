import React from "react";
import { ReuseBadge } from "@locoworks/reusejs-react-badge";
import TimerIcon from "../icons/Timer";
import InfoIcon from "../icons/info";

const IconsBadgeExample = () => {
	return (
		<div className="flex items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseBadge
				prefixIcon={<InfoIcon />}
				className="border h-10 w-10 flex items-center justify-center border-blue-700 text-blue-700 bg-blue-200 rounded-full"
			/>
			<ReuseBadge
				as="label"
				prefixIcon={<TimerIcon />}
				className="border h-10 w-10 flex items-center justify-center border-pink-700 text-pink-700 bg-pink-200 rounded-full"
			/>
		</div>
	);
};

export default IconsBadgeExample;
