import React from "react";
import { ReusejsBreadcrumbs } from "@locoworks/reusejs-react-breadcrumbs";

const breadcrumbsOptions = [
	"Home",
	"Application",
	"Categories",
	"Breadcrumbs",
	"Bread",
];

const SimpleBreadcrumbsTwo = () => {
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReusejsBreadcrumbs
				breadcrumbs={breadcrumbsOptions}
				containerClasses={
					"flex items-center hover:text-green-500 cursor-pointer"
				}
			/>
		</div>
	);
};

export default SimpleBreadcrumbsTwo;
