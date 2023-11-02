import React from "react";
import {
	HeadlessBanner,
	RenderingStrategyEnum,
} from "@locoworks/reusejs-react-banner";

const Example = () => {
	const [showSecondBanner, setShowSecondBanner] = React.useState(false);

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50 gap-y-4">
			<button
				className="bg-blue-500 px-4 py-2 rounded-xl text-white font-semibold"
				onClick={() => {
					setShowSecondBanner(!showSecondBanner);
				}}
			>
				Toggle Second Banner!!
			</button>
			<HeadlessBanner renderingStrategy={RenderingStrategyEnum.HIDDEN}>
				{({ hideBanner, eleRef }) => {
					return (
						<div
							ref={eleRef}
							className="relative w-11/12 px-10 py-6 flex justify-center items-center bg-yellow-200 border-2 border-yellow-500 rounded-lg"
						>
							<label>This is a simple Warning Banner!!</label>
							<button
								className="absolute top-1 right-2 cursor-pointer text-yellow-900 hover:underline"
								onClick={() => {
									setShowSecondBanner(true);
									hideBanner();
								}}
							>
								Close
							</button>
						</div>
					);
				}}
			</HeadlessBanner>
			<HeadlessBanner
				renderingStrategy={RenderingStrategyEnum.HIDDEN}
				showBanner={showSecondBanner}
			>
				{({ hideBanner, eleRef }) => {
					return (
						<div
							ref={eleRef}
							className="relative w-11/12 px-10 py-6 flex justify-center items-center bg-green-200 border-2 border-green-500 rounded-lg"
						>
							<label>Warning Banner closed!!</label>
							<button
								className="absolute top-1 right-2 cursor-pointer text-green-800 hover:underline"
								onClick={() => {
									setShowSecondBanner(false);
									hideBanner();
								}}
							>
								Close
							</button>
						</div>
					);
				}}
			</HeadlessBanner>
		</div>
	);
};

export default Example;
