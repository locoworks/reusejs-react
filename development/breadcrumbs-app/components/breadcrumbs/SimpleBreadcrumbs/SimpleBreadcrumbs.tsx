import React from "react";
import { ReusejsBreadcrumbs } from "@locoworks/reusejs-react-breadcrumbs";

const breadcrumbsOptions = [
	"Home",
	"Application",
	"Breadcrumbs",
	"Home",
	"Application",
	"Breadcrumbs",
	"Home",
	"Application",
	"Breadcrumbs",
	"Home",
	"Application",
	"Breadcrumbs",
];

const SimpleBreadcrumbs = () => {
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 border rounded bg-gray-50">
			<ReusejsBreadcrumbs
				breadcrumbs={breadcrumbsOptions}
				containerClasses={"flex justify-center bg-white pl-2"}
				iconClasses={"flex h-fit w-fit pt-3"}
				maxItems={5}
				left={3}
				right={2}
			/>
		</div>
	);
};

export default SimpleBreadcrumbs;
