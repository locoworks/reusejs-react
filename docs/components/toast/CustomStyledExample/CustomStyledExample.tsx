// import React, { useEffect, useState } from "react";
import React from "react";
import { ReuseToast } from "@locoworks/reusejs-react-toast";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import Check from "../icons/Check";

const CustomStyledExample = () => {
	const showToast = async () => {
		await ReuseToast({
			timeout: 2000,
			label: "Success",
			icon: <Check />,
			position: "bottom-centre",
			toastClasses: "bg-green-600 text-white font-bold",
			progressClasses: "absolute bottom-0 left-0 bg-white h-1 w-full",
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

export default CustomStyledExample;
