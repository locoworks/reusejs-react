import React from "react";
import { ReuseToast } from "@locoworks/reusejs-react-toast";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const CustomPositionExample = () => {
	const showToast = async () => {
		await ReuseToast({
			timeout: 2000,
			label: "Sample Toast in Centre",
			customToastPosition: "absolute inset-0 m-auto h-fit w-fit",
			customAnimation: {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { duration: 0.2 },
			},
		});
	};

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
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

export default CustomPositionExample;
