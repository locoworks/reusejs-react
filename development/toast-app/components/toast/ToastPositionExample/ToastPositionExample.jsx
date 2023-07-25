import React, { useState } from "react";
import { ReuseToast } from "@locoworks/reusejs-react-toast";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const ToastPositionExample = () => {
	const showToast = async () => {
		await ReuseToast({
			label: "Sample Toast",
			timeout: 2000,
			position: currentSelected,
		});
	};
	const options = [
		"top-left",
		"top-centre",
		"top-right",
		"centre-left",
		"centre-right",
		"bottom-left",
		"bottom-centre",
		"bottom-right",
	];

	const [currentSelected, setCurrentSelected] = useState("top-left");

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<div className="grid grid-cols-3 w-full px-4">
				{options.map((opt, index) => {
					return (
						<React.Fragment key={opt}>
							{index === 4 && <div key="Black option for center toast " />}
							<div
								className="flex gap-x-3 h-10 justify-center items-center bg-white rounded border "
								key={opt}
							>
								<label>{opt[0].toUpperCase() + opt.slice(1)}</label>
								<input
									type="radio"
									value={opt}
									name="option"
									checked={currentSelected === opt}
									onChange={(e) => {
										setCurrentSelected(e.target.value);
									}}
								/>
							</div>
						</React.Fragment>
					);
				})}
			</div>

			<ReuseButton
				className="bg-blue-500 px-2 py-1 mt-3"
				onClick={() => {
					showToast();
				}}
			>
				Show Toast
			</ReuseButton>
		</div>
	);
};

export default ToastPositionExample;
