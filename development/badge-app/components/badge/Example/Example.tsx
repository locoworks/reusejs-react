import React from "react";
import { ReuseBadge } from "@locoworks/reusejs-react-badge";

const Example = () => {
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseBadge label="Hello There" />
		</div>
	);
};

export default Example;
