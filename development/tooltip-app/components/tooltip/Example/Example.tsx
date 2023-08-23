import React, { useState } from "react";
import { HeadlessTooltip } from "@locoworks/reusejs-react-tooltip";

const Example = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<HeadlessTooltip
				// trigger={1}
				// open={open}
				onOpen={() => {
					console.log("Hello");
				}}
				tooltip={() => {
					return (
						<div className="absolute bottom-0 left-1/2 translate-y-full -translate-x-1/2 bg-black text-white bg-opacity-80 px-2 py-1 rounded border border-white">
							Hello
						</div>
					);
				}}
			>
				<label className="bg-blue-200 px-3 py-2">Sample</label>
			</HeadlessTooltip>
			<button
				className="mt-4 bg-blue-400 px-3 py-1 rounded text-white"
				onClick={() => {
					setOpen(!open);
				}}
			>
				Click
			</button>
		</div>
	);
};

export default Example;
