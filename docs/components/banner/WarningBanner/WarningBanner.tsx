import React from "react";
import {
	HeadlessBanner,
	RenderingStrategyEnum,
} from "@locoworks/reusejs-react-banner";
import ExclamationIcon from "../icons/ExclamationIcon";

const Example = () => {
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50 gap-y-4">
			<HeadlessBanner renderingStrategy={RenderingStrategyEnum.HIDDEN}>
				{({ hideBanner, eleRef }) => {
					return (
						<div
							ref={eleRef as any}
							className="relative w-11/12 px-10 py-6 flex justify-center gap-x-6 items-center bg-yellow-200 border-2 border-yellow-500 rounded-lg text-yellow-700"
						>
							<ExclamationIcon />
							<label>This is a simple Warning Banner!!</label>
							<button
								className="absolute top-1 right-2 cursor-pointer text-yellow-900 hover:underline"
								onClick={() => {
									hideBanner();
								}}
							>
								Close
							</button>
						</div>
					);
				}}
			</HeadlessBanner>
			<div className="px-10">
				<h2 className="my-1">{`What is Lorem Ipsum?`}</h2>
				<p>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}</p>
			</div>
		</div>
	);
};

export default Example;
