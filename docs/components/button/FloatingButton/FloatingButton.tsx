import React from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const FloatingButton = () => {
	return (
		<div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseButton className="z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300">
				&#9993;
			</ReuseButton>
		</div>
	);
};

export default FloatingButton;
