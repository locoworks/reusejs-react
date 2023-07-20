import React from "react";
import { HeadlessBadge } from "@locoworks/reusejs-react-badge";

const HeadlessExample = () => {
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<HeadlessBadge
				label="Headless"
				className="border border-yellow-600 text-yellow-600 bg-yellow-200 px-2 py-1 rounded-full"
				as="span"
			/>
		</div>
	);
};

export default HeadlessExample;
