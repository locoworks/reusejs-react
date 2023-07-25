import React from "react";
import { ReuseToast } from "@locoworks/reusejs-react-toast";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import HomeIcon from "../icons/Home";

const ToastPositions = () => {
	const showToast = async () => {
		await ReuseToast({
			label: "This is toast with Home Icon",
			icon: <HomeIcon />,
			timeout: 3000,
			position: "bottom-centre",
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

export default ToastPositions;
