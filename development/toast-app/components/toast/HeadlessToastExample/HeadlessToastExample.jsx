import React from "react";
import { HeadlessToast } from "@locoworks/reusejs-react-toast";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import HomeIcon from "../icons/Home";

const HeadlessToastExample = () => {
	const Toast = () => {
		return (
			<div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-2 rounded">
				<label>This is a sample Toast!</label>
			</div>
		);
	};

	const Toast2 = () => {
		return (
			<div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-2 rounded flex items-center justify-center ">
				<span>
					<HomeIcon />
				</span>
				<label>This is toast with Icon</label>
			</div>
		);
	};
	const showToast = async () => {
		await HeadlessToast({
			component: <Toast />,
			timeout: 2000,
		});
	};

	const showToast2 = async () => {
		await HeadlessToast({
			component: <Toast2 />,
			timeout: 3000,
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
				Show First Toast
			</ReuseButton>
			<ReuseButton
				className="bg-blue-500 px-2 py-1 mt-3"
				onClick={() => {
					showToast2();
				}}
			>
				Show Second Toast
			</ReuseButton>
		</div>
	);
};

export default HeadlessToastExample;
