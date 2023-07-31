import React from "react";
import { HeadlessBreadcrumbs } from "@locoworks/reusejs-react-breadcrumbs";
import HomeIcon from "../Icons/HomeIcon";

const breadcrumbsOptions = [
	<div
		className="flex justify-center items-center"
		onClick={() => (window.location.href = "https://locoworks.org/")}
	>
		<HomeIcon /> <span className="flex px-4">Home</span>
	</div>,
	"Application",
	"Breadcrumbs",
];

const SimpleBreadcrumbsThree = () => {
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<HeadlessBreadcrumbs
				breadcrumbs={breadcrumbsOptions}
				separator={"-"}
				breadcrumbsClasses={
					"flex items-center bg-cyan-200 text-black px-4 py-2 mt-10"
				}
				breadcrumbsContainerClasses={"flex items-center hover:text-blue-600"}
				separatorClasses={"px-2 text-black"}
			/>
		</div>
	);
};

export default SimpleBreadcrumbsThree;
