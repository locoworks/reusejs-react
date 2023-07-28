import React from "react";
import { HeadlessBreadcrumbs } from "@locoworks/reusejs-react-breadcrumbs";
import AppIcon from "../Icons/AppIcon";
import HomeIcon from "../Icons/HomeIcon";
import ListIcon from "../Icons/ListIcon";

function SeparatorIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			height={20}
			width={20}
		>
			<path
				d="M15.54 11.29L9.88 5.64a1 1 0 00-1.42 0 1 1 0 000 1.41l4.95 5L8.46 17a1 1 0 000 1.41 1 1 0 00.71.3 1 1 0 00.71-.3l5.66-5.65a1 1 0 000-1.47z"
				fill="currentColor"
			></path>
		</svg>
	);
}
const BreadcrumbsWithIcons = () => {
	const breadcrumbsOptions = [
		<div className="flex items-center" key={"home"}>
			<HomeIcon /> &nbsp;Home
		</div>,
		<div className="flex items-center" key={"application"}>
			<AppIcon /> &nbsp;Application
		</div>,
		<div className="flex items-center" key={"bradcrumbs"}>
			<ListIcon />
			&nbsp;Breadcrumbs
		</div>,
	];

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<HeadlessBreadcrumbs
				breadcrumbs={breadcrumbsOptions}
				separator={<SeparatorIcon />}
				breadcrumbsClasses={
					"flex items-center bg-cyan-100 text-black px-4 py-2 mt-10 "
				}
				breadcrumbsContainerClasses={"flex items-center hover:text-blue-500"}
				separatorClasses={"px-2 text-black"}
			/>
		</div>
	);
};

export default BreadcrumbsWithIcons;
