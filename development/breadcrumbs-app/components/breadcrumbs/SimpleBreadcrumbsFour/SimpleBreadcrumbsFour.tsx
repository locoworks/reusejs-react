import React from "react";
import { HeadlessBreadcrumbs } from "@locoworks/reusejs-react-breadcrumbs";
import HomeIconBnw from "../Icons/HomeIconBnw";

const breadcrumbsOptions = [
	<div
		className="flex items-center mx-2 rounded-full bg-gray-300 text-black px-4 hover:text-blue-600 cursor-pointer"
		key={"home"}
	>
		<HomeIconBnw /> &nbsp; Home
	</div>,
	<div
		className="flex mx-2 rounded-full bg-gray-300 text-black px-4 hover:text-blue-600 cursor-pointer"
		key={"breadcrumbs"}
	>
		Breadcrumbs
	</div>,
	<div
		className="flex mx-2 rounded-full bg-gray-300 text-black px-4 hover:text-blue-600 cursor-pointer"
		key={"application"}
	>
		Application
	</div>,
];

const SimpleBreadcrumbsFour = () => {
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<HeadlessBreadcrumbs
				breadcrumbs={breadcrumbsOptions}
				separator={"/"}
				breadcrumbsClasses={
					"flex items-center bg-cyan-800 text-black p-2 mt-10 flex-wrap"
				}
				breadcrumbsContainerClasses={"flex items-center"}
			/>
		</div>
	);
};

export default SimpleBreadcrumbsFour;
