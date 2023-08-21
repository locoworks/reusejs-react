import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const ButtonWithIcon = () => {
	return (
		<div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseButton
				data-te-ripple-init
				data-te-ripple-color="light"
				className="flex items-center rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-2xl focus:bg-blue-700 focus:shadow-2xl focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-2xl dark:shadow-2xl dark:hover:shadow-lg dark:focus:shadow-lg dark:active:shadow-lg"
			>
				<span className="mr-5 text-4xl" role="img" aria-label="Envelope icon">
					&#9993;
				</span>
				Button
			</ReuseButton>
		</div>
	);
};

export default ButtonWithIcon;
